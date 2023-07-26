import json
import base64
from base58 import b58decode
from construct import Struct, Bytes
from solana.rpc.api import Client
from solana.rpc.types import Pubkey
from nft import retrieve_nft_owner
from typing import Optional
from errors import ErrorType, SNSError
from borsh_construct import CStruct, String, U8, Optional


class NameRegistryState:
    HEADER_LEN = 96

    def __init__(self, parent_name, owner, class_pubKey, data=None):
        self.parent_name: Pubkey = parent_name
        self.owner: Pubkey = owner
        self.class_pubKey: Pubkey = class_pubKey
        self.data = data

    @staticmethod
    async def retrieve(
        cls, connection: Client, nameAccountKey: Pubkey
    ) -> Optional[str]:
        name_account = await connection.get_account_info(nameAccountKey)
        if not name_account:
            SNSError(error_type=ErrorType.NoNameAccount)


class TokenData(CStruct):
    _schema_fields = CStruct(
        "name" / String,
        "ticker" / String,
        "mint" / Bytes(32),
        "decimals" / U8,
        "website" / Optional(String),
        "logoUri" / Optional(String)
    )

    def __init__(self, name: str, ticker: str, mint: bytes, decimals: int,
                 website: Optional[str] = None, logoUri: Optional[str] = None):
        self.name = name
        self.ticker = ticker
        self.mint = mint
        self.decimals = decimals
        self.website = website
        self.logoUri = logoUri
        self.packed_token_dictionary = {"name": name, "ticker": ticker,
                                        "mint": mint, "decimals": decimals,
                                        "website": website, "logoUri": logoUri}

    def serialize(self) -> Bytes:
        return self._schema_fields.build(self.packed_token_dictionary)

    '''
    @NOTE - We do not need a deserializeUnchecked() here since 
    Python is dynamically typed - in TS the the 
    deserializeUnchecked function simply takes in a generic.
    '''

    def deserialize(self, buffer: Bytes):
        return self._deserialize(self._schema, buffer)

# class Mint:
#     _schema =
