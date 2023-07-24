import json
from typing import Optional
from utils import get_domain_key_sync
from solana.rpc.api import Client
from solana.rpc.types import Pubkey
from src.nft import retrieve_nft_owner

from construct import Struct, Bytes

def resolve(connection: Client, domain: str) -> Optional[str]:
    domain_pub_key = get_domain_key_sync(domain)["pubkey"]
    account_info = connection.get_account_info(domain_pub_key).value

    quit()
    account_info = json.loads(account_info_str)

    owner = account_info.get("result", {}).get("value", {}).get("owner")
    nft_owner = retrieve_nft_owner(connection, domain_pub_key)

    if nft_owner:
        return nft_owner
    
    return owner
    

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
        owner = resolve(connection, x["domain"])
        print(owner)
        quit()
        # assert x["owner"] == owner
