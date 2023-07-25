import json
import base64

from construct import Struct, Bytes
from solana.rpc.api import Client
from solana.rpc.types import Pubkey
from nft import retrieve_nft_owner

class NameRegistryState:
    HEADER_LEN = 96

    def __init__(self, parent_name, owner, class_name):
        self.parent_name = parent_name
        self.owner = owner
        self.class_name = class_name
        self.data = None

    # cls = method 
    @classmethod
    def retrieve(cls, connection, name_account_key):
        name_account_info = connection.get_account_info(name_account_key).value

        if not name_account_info:
            raise ValueError("Account does not exist")

        schema = Struct(
            "parent_name" / Bytes(32),
            "owner" / Bytes(32),
            "class_name" / Bytes(32)
        )

        data = name_account_info.data

        res = schema.parse(data) 

        # name_registry_state = cls(res.parent_name, res.owner, res.class_name)

        # name_registry_state.data = name_account_info.data[cls.HEADER_LEN:]
        # name_registry_state.data = name_account_info.data

        nft_owner = retrieve_nft_owner(connection, name_account_key)

        name_registry_state = None
        return {"registry": name_registry_state, "nft_owner": nft_owner}
        # imp

if __name__ == "__main__":
    connection = Client("https://rpc-public.hellomoon.io")
    sol_mint_addr = Pubkey.from_string("CEsUekjcbeReMuCuTtM2N7CjmsMzYfXkbZRX7rtSGCKS")
    nameRe = NameRegistryState.retrieve(connection, sol_mint_addr)
    registry = nameRe

    print(registry)

    # convert bytes to string
    # print(registry.owner.decode(32))


# focus on registry object