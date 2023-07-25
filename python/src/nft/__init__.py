from solana.rpc.api import Client
from constants import MINT_PREFIX, NAME_TOKENIZER_ID, TOKEN_PROGRAM_ID
from solana.rpc.types import Pubkey as PublicKey

def retrieve_nft_owner(connection: Client, name_account: PublicKey):
    try:
        # Find the mint address
        mint, _ = PublicKey.find_program_address(
            [MINT_PREFIX, name_account.to_bytes()],
            NAME_TOKENIZER_ID
        )

        # Get mint information
        mint_info = connection.get_account_info(mint)
        if int.from_bytes(mint_info.value.lamports, byteorder="little") == 0:
            return None

        # Prepare the filters
        mint_base58 = mint.to_base58()
        filters = [
            {
                "memcmp": {
                    "offset": 0,
                    "bytes": mint_base58,
                }
            },
            {
                "memcmp": {
                    "offset": 64,
                    "bytes": b"2",
                }
            },
            {"dataSize": 165},
        ]

        # Get program accounts
        result = connection.get_program_accounts(
            TOKEN_PROGRAM_ID,
            data_size=165,
            filters=filters,
        )

        if len(result) != 1:
            return None

        return PublicKey(result[0]["account"]["data"][32:64])
    except Exception:
        return None
