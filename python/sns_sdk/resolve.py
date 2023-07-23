from typing import Optional
from utils import get_domain_key_sync
from solana.rpc.api import Client
from solana.rpc.types import Pubkey

def resolve(connection: Client, domain: str) -> Optional[str]:
    domain_pub_key = get_domain_key_sync(domain)["pubkey"]
    print(domain_pub_key, type(domain_pub_key))
    account_info = connection.get_account_info(domain_pub_key)
    print(account_info)
    if account_info is not None and account_info["owner"] == "SNSa4ZjHYyuxPTZ3UGd1VWznH8VT2kT2ZtVeqCnjxz4":
        return account_info["owner"]
    else:
        return None

if __name__ == "__main__":
    connection = Client("https://rpc-public.hellomoon.io")

    LIST = [
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
        # assert x["owner"] == owner
