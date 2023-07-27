import json
from typing import Optional
from utils import get_domain_key_sync
from solana.rpc.api import Client
from solana.rpc.types import Pubkey
from state import NameRegistryState
from nft import retrieve_nft_owner
import nacl.signing
import nacl.encoding
from typing import Union, ByteString
from record import get_record_key_sync
from types.record import Record
from construct import Struct, Bytes

def verify_detached_signature(
        data: bytes, signature: bytes, pubkey_bytes: bytes) -> bool:
    try:
        public_key = nacl.signing.VerifyKey(
            pubkey_bytes, encoder=nacl.encoding.RawEncoder)
        public_key.verify(data, signature)
        return True  # Signature is valid
    except nacl.exceptions.BadSignatureError:
        return False  # Signature is invalid

def check_sol_record(record: bytes, signed_record: bytes, pubkey: Pubkey) -> bool:
    return verify_detached_signature(record, signed_record, pubkey)


def fetch_solana_record(connection: Client, domain_pub_key: str, registry: str) -> Pubkey:
    record_key = get_record_key_sync(registry, Record.SOL)
    sol_record = connection.get_account_info(record_key)

def resolve(connection: Client, domain: str) -> Optional[str]:
    domain_pub_key = get_domain_key_sync(domain)["pubkey"]
    
    [registry, nft_owner] = NameRegistryState.retrieve(connection, domain_pub_key)

    if nft_owner:
        return nft_owner
    
    else:
        fetch_solana_record(connection, domain_pub_key, registry)


if __name__ == "__main__":
    connection = Client("https://rpc-public.hellomoon.io")

    LIST = [
        {
            "domain": "abhinavmir.sol",
            "owner": "CEsUekjcbeReMuCuTtM2N7CjmsMzYfXkbZRX7rtSGCKS",
        },
        {
            "domain": "wallet-guide-5.sol",
            "owner": "Fxuoy3gFjfJALhwkRcuKjRdechcgffUApeYAfMWck6w8",
        },
        {
            "domain": "wallet-guide-4.sol",
            "owner": "Hf4daCT4tC2Vy9RCe9q8avT68yAsNJ1dQe6xiQqyGuqZ",
        },
        # Add more items to the list as needed
    ]

    for x in LIST:
        # owner = resolve(connection, x["domain"])
        # owner = res
        # print(owner)
        # quit()
        # assert x["owner"] == owner
        pass
