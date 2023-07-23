import asyncio
import pytest
from sns_sdk.resolve import resolve
from solana.rpc.api import Client

@pytest.mark.asyncio
async def test_resolve_domains():
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
        owner = await resolve(connection, x["domain"])
        assert x["owner"] == owner

if __name__ == "__main__":
    asyncio.run(test_resolve_domains())
