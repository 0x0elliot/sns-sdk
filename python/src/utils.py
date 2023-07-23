import hashlib
from constants import NAME_PROGRAM_ID, ROOT_DOMAIN_ACCOUNT, HASH_PREFIX
from solana.rpc.types import Pubkey as PublicKey

def get_hashed_name_sync(name: str) -> bytes:
    input_data = (HASH_PREFIX + name).encode("utf-8")
    sha256_hash = hashlib.sha256(input_data).digest()
    return sha256_hash

def get_name_account_key_sync(
    hashed_name: bytes, name_class: PublicKey = None, name_parent: PublicKey = None
) -> PublicKey:
    seeds = [hashed_name]
    if name_class:
        seeds.append(name_class.__bytes__())
    else:
        seeds.append(bytes(32))
    if name_parent:
        seeds.append(name_parent.__bytes__())
    else:
        seeds.append(bytes(32))

    name_account_key_bytes = PublicKey.find_program_address(seeds, NAME_PROGRAM_ID)[0]
    return name_account_key_bytes

def _derive_sync(domain: str, parent_key: PublicKey = ROOT_DOMAIN_ACCOUNT):
    hashed_name = get_hashed_name_sync(domain)
    name_account_key = get_name_account_key_sync(hashed_name, name_parent=parent_key)
    return {
        "domain": domain,
        "nameAccount": name_account_key,
        "pubkey": name_account_key,
        "hash": hashed_name,
    }

def get_domain_key_sync(domain: str, record: bool = False):
    if domain.endswith(".sol"):
        domain = domain[:-4]

    splitted = domain.split(".")
    if len(splitted) == 2:
        prefix = b"\x01" if record else b"\x00"
        sub = prefix + splitted[0].encode("utf-8")
        parent_key = _derive_sync(splitted[1])["pubkey"]
        result = _derive_sync(sub, parent_key)
        return {
            **result,
            "isSub": True,
            "parent": PublicKey(parent_key) if parent_key else None,
        }
    elif len(splitted) == 3 and record:
        # Parent key
        parent_key = _derive_sync(splitted[2])["pubkey"]

        # Sub domain
        sub_key = _derive_sync("\0" + splitted[1], parent_key)["pubkey"]

        # Sub record
        record_prefix = b"\x01"
        result = _derive_sync(record_prefix + splitted[0].encode("utf-8"), sub_key)
        return {
            **result,
            "isSub": True,
            "parent": PublicKey(parent_key) if parent_key else None,
            "isSubRecord": True,
        }
    elif len(splitted) >= 3:
        raise Exception("InvalidInput")

    result = _derive_sync(domain, ROOT_DOMAIN_ACCOUNT)
    return {
        **result,
        "isSub": False,
        "parent": None,
    }


if __name__ == "__main__":
    print(get_domain_key_sync("abhinavmir.sol"))
