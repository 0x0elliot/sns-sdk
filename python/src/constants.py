from solana.rpc.types import Pubkey

# The Solana Name Service program ID
NAME_PROGRAM_ID = Pubkey.from_string("namesLPneVptA9Z5rqUDD9tMTWEJwofgaYwp8cawRkX")

# Hash prefix used to derive domain name addresses
HASH_PREFIX = "SPL Name Service"

# The `.sol` TLD
ROOT_DOMAIN_ACCOUNT = Pubkey.from_string("58PwtjSDuFHuUkYjH9BYnnQKHfwo9reZhC2zMJv9JPkx")

# The Registry program ID
REGISTER_PROGRAM_ID = Pubkey.from_string("jCebN34bUfdeUYJT13J1yG16XWQpt5PDx6Mse9GUqhR")

# The FIDA Pyth price feed
PYTH_FIDA_PRICE_ACC = Pubkey.from_string("ETp9eKXVv1dWwHSpsXRUuXHmw24PwRkttCGVgpZEY9zF")

# The FIDA buy and burn address
BONFIDA_FIDA_BNB = Pubkey.from_string("AUoZ3YAhV3b2rZeEH93UMZHXUZcTramBvb4d9YEVySkc")

# The reverse look up class
REVERSE_LOOKUP_CLASS = Pubkey.from_string("33m47vH6Eav6jr5Ry86XjhRft2jRBLDnDgPSHoquXi2Z")

# The `.twitter` TLD authority
TWITTER_VERIFICATION_AUTHORITY = Pubkey.from_string("FvPH7PrVrLGKPfqaf3xJodFTjZriqrAXXLTVWEorTFBi")

# The `.twitter` TLD
TWITTER_ROOT_PARENT_REGISTRY_KEY = Pubkey.from_string("4YcexoW3r78zz16J2aqmukBLRwGq6rAvWzJpkYAXqebv")

# The length of the SOL record signature
SOL_RECORD_SIG_LEN = 96

BONFIDA_USDC_BNB = Pubkey.from_string("DmSyHDSM9eSLyvoLsPvDr5fRRFZ7Bfr3h3ULvWpgQaq7")

USDC_MINT = Pubkey.from_string("EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v")

REFERRERS = [
    Pubkey.from_string("3ogYncmMM5CmytsGCqKHydmXmKUZ6sGWvizkzqwT7zb1"),  # Test wallet
    Pubkey.from_string("DM1jJCkZZEwY5tmWbgvKRxsDFzXCdbfrYCCH1CtwguEs"),  # 4Everland
    Pubkey.from_string("ADCp4QXFajHrhy4f43pD6GJFtQLkdBY2mjS9DfCk7tNW"),  # Bandit network
    Pubkey.from_string("2XTgjw8yi1E3Etgj4CUyRD7Zk49gynH2U9gA5N2MY4NP"),  # Altoscan
    Pubkey.from_string("5oDWj8vr3vbcq9JZTtwXqrkCMZggMsDzNietvbr1BNfe"),  # Solscan
]

TOKENS_SYM_MINT = {
    "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v": "USDC",
    "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB": "USDT",
    "So11111111111111111111111111111111111111112": "SOL",
    "EchesyfXePKdLtoiZSL8pBe8Myagyy8ZRqsACNCFGnvp": "FIDA",
    "FeGn77dhg1KXRRFeSwwMiykZnZPw5JXW6naf2aQgZDQf": "ETH",
    "7i5KKsX2weiTkry7jA4ZwSuXGhs5eJBEjY8vVxR4pfRx": "GMT",
    "AFbX8oGjGpmVFywbVouvhQSRmiW2aR1mohfahi4Y2AdB": "GST",
    "mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So": "MSOL",
    "DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263": "BONK",
    "EPeUFDgHRxs9xxEPVaL6kfGQvCon7jmAWKVUHuux1Tpz": "BAT",
}

PYTH_MAPPING_ACC = Pubkey.from_string("AHtgzX45WTKfkPG53L6WYhGEXwQkN1BVknET3sVsLL8J")

VAULT_OWNER = Pubkey.from_string("GcWEQ9K78FV7LEHteFVciYApERk5YvQuFDQPk1yYJVXi")


NAME_TOKENIZER_ID = Pubkey.from_string("nftD3vbNkNqfj2Sd3HZwbpw4BxxKWr4AjGb9X38JeZk")
TOKEN_PROGRAM_ID = Pubkey.from_string('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA')
MINT_PREFIX = bytes("tokenized_name", "utf-8")