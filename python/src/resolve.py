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

from construct import Struct, Bytes

# tweetNACL is a library for encryption and decryption - in the TS implementation, it is "tweet" because it is a compact versio of the NACL library, we will use the full version
def check_sol_record(record: ByteString, signed_record: ByteString, pubkey: bytes) -> bool:
    verify_key = nacl.signing.VerifyKey(pubkey)
    try:
        verify_key.verify(signed_record, record)
        return True
    except nacl.exceptions.BadSignatureError:
        return False

def resolve(connection: Client, domain: str) -> Optional[str]:
    domain_pub_key = get_domain_key_sync(domain)["pubkey"]
    

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
