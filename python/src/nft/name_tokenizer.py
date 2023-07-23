from borsh import deserialize, Schema
from solana.connection import Connection
from solana.types.account import PublicKey
import base64

NAME_TOKENIZER_ID = PublicKey("nftD3vbNkNqfj2Sd3HZwbpw4BxxKWr4AjGb9X38JeZk")
MINT_PREFIX = bytes("tokenized_name", "utf-8")

class Tag:
    Uninitialized = 0
    CentralState = 1
    ActiveRecord = 2
    InactiveRecord = 3

class NftRecord:
    schema = Schema(
        [
            ("tag", "u8"),
            ("nonce", "u8"),
            ("nameAccount", [32]),
            ("owner", [32]),
            ("nftMint", [32]),
        ]
    )

    def __init__(self, tag, nonce, nameAccount, owner, nftMint):
        self.tag = tag
        self.nonce = nonce
        self.nameAccount = PublicKey(base64.b64decode(nameAccount))
        self.owner = PublicKey(base64.b64decode(owner))
        self.nftMint = PublicKey(base64.b64decode(nftMint))

    @classmethod
    def deserialize(cls, data):
        return deserialize(cls.schema, cls, data)

    @classmethod
    async def retrieve(cls, connection, key):
        account_info = await connection.get_account_info(key)
        if not account_info or not account_info.data:
            raise Exception("NFT record not found")
        return cls.deserialize(account_info.data)

    @classmethod
    async def find_key(cls, nameAccount, programId):
        return await PublicKey.find_program_address(
            [MINT_PREFIX, nameAccount],
            programId
        )

async def get_record_from_mint(connection, mint):
    filters = [
        {
            "memcmp": {
                "offset": 0,
                "bytes": "3",
            },
        },
        {
            "memcmp": {
                "offset": 1 + 1 + 32 + 32,
                "bytes": mint.to_base58(),
            },
        },
    ]

    result = await connection.get_program_accounts(NAME_TOKENIZER_ID, filters=filters)
    return result