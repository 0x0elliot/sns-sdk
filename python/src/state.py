from construct import Bytes
from solana.rpc.api import Client
from solana.rpc.types import Pubkey
from typing import Optional
from errors import ErrorType, SNSError
from borsh import types
import unittest
import borsh
from unittest.mock import MagicMock

class NameRegistryState:
    HEADER_LEN = 96

    # _schema = CStruct(
    #     "parent_name" / Bytes(32),
    #     "owner" / Bytes(32),
    #     "class_pubKey" / Bytes(32),
    # )

    _schema = borsh.schema(
        {
            "parent_name": types.bytes(32),
            "owner": types.bytes(32),
            "class_pubKey": types.bytes(32),
        }
    )


    def serialize(self) -> Bytes:
        return self._schema.build(self)
    
    def deserialize(self, buffer: Bytes):
        return self._deserialize(self._schema, buffer)
    
    @staticmethod
    def deserializeUnchecked(buffer: Bytes):
        return NameRegistryState._deserialize(NameRegistryState._schema, buffer)

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

        res: NameRegistryState = cls.deserializeUnchecked(name_account.data)
        return res.data

class TokenData():
    # _schema_fields = CStruct(
    #     "name" / String,
    #     "ticker" / String,
    #     "mint" / Bytes(32),
    #     "decimals" / U32,
    #     "website" / String,
    #     "logoUri" / String
    # )

    _schema_fields = borsh.schema(
        {
            "name": types.string,
            "ticker": types.string,
            "mint": types.bytes(32),
            "decimals": types.u32,
            "website": types.string,
            "logoUri": types.string
        }
    )

    def __init__(self, name: str, ticker: str, mint: U32, decimals: int,
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

class Mint:
 # There is an error here
    _schema = borsh.schema(
        {
            "mint": types.bytes(32)
        }   
    )

    def __init__(self, mint: types.bytes(32)):
        self.mint = mint


    

    
    