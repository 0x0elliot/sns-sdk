from typing import Optional
from utils import get_domain_key_sync
from solana.rpc.api import Client
from solana.rpc.types import Pubkey
from state import NameRegistryState
import nacl.signing
import nacl.encoding
from record import get_sol_record, Record
from errors import SNSError, ErrorType

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

def resolve(connection: Client, domain: str) -> Optional[str]:
    domain_pub_key = get_domain_key_sync(domain)["pubkey"]
    
    [registry, nft_owner] = NameRegistryState.retrieve(connection, domain_pub_key)

    if nft_owner:
        return nft_owner
    
    try:
        record_key = get_domain_key_sync(domain, Record.SOL)
        sol_record = get_sol_record(connection=connection, domain_pub_key=record_key)

        if sol_record is None:
            SNSError(error_type=ErrorType.RecordNotFound)

        expected = bytes.fromhex(''.join(sol_record.data[:32].hex(), record_key.hex()))

        valid = check_sol_record(record=expected, signed_record=sol_record.data[32:], 
                                 pubkey=sol_record.owner)
        
        if not valid:
            SNSError(error_type=ErrorType.InvalidSignature)

        return Pubkey(sol_record.data[32:]).to_base58()
    
    except:
        print("Some error here on resolve.py#50, have to improve the logging!")
    '''
    catch (err) {
        if (err instanceof Error) {
        if (err.name === "FetchError") {
            throw err;
        }
    '''

    return registry.owner



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
