"use strict";
exports.__esModule = true;
exports.VAULT_OWNER = exports.PYTH_MAPPING_ACC = exports.TOKENS_SYM_MINT = exports.REFERRERS = exports.USDC_MINT = exports.BONFIDA_USDC_BNB = exports.SOL_RECORD_SIG_LEN = exports.TWITTER_ROOT_PARENT_REGISTRY_KEY = exports.TWITTER_VERIFICATION_AUTHORITY = exports.REVERSE_LOOKUP_CLASS = exports.BONFIDA_FIDA_BNB = exports.PYTH_FIDA_PRICE_ACC = exports.REGISTER_PROGRAM_ID = exports.ROOT_DOMAIN_ACCOUNT = exports.HASH_PREFIX = exports.NAME_PROGRAM_ID = void 0;
var web3_js_1 = require("@solana/web3.js");
/**
 * The Solana Name Service program ID
 */
exports.NAME_PROGRAM_ID = new web3_js_1.PublicKey("namesLPneVptA9Z5rqUDD9tMTWEJwofgaYwp8cawRkX");
/**
 * Hash prefix used to derive domain name addresses
 */
exports.HASH_PREFIX = "SPL Name Service";
/**
 * The `.sol` TLD
 */
exports.ROOT_DOMAIN_ACCOUNT = new web3_js_1.PublicKey("58PwtjSDuFHuUkYjH9BYnnQKHfwo9reZhC2zMJv9JPkx");
/**
 * The Registry program ID
 */
exports.REGISTER_PROGRAM_ID = new web3_js_1.PublicKey("jCebN34bUfdeUYJT13J1yG16XWQpt5PDx6Mse9GUqhR");
/**
 * The FIDA Pyth price feed
 */
exports.PYTH_FIDA_PRICE_ACC = new web3_js_1.PublicKey("ETp9eKXVv1dWwHSpsXRUuXHmw24PwRkttCGVgpZEY9zF");
/**
 * The FIDA buy and burn address
 */
exports.BONFIDA_FIDA_BNB = new web3_js_1.PublicKey("AUoZ3YAhV3b2rZeEH93UMZHXUZcTramBvb4d9YEVySkc");
/**
 * The reverse look up class
 */
exports.REVERSE_LOOKUP_CLASS = new web3_js_1.PublicKey("33m47vH6Eav6jr5Ry86XjhRft2jRBLDnDgPSHoquXi2Z");
/**
 * The `.twitter` TLD authority
 */
exports.TWITTER_VERIFICATION_AUTHORITY = new web3_js_1.PublicKey("FvPH7PrVrLGKPfqaf3xJodFTjZriqrAXXLTVWEorTFBi");
/**
 * The `.twitter` TLD
 */
exports.TWITTER_ROOT_PARENT_REGISTRY_KEY = new web3_js_1.PublicKey("4YcexoW3r78zz16J2aqmukBLRwGq6rAvWzJpkYAXqebv");
/**
 * The length of the SOL record signature
 */
exports.SOL_RECORD_SIG_LEN = 96;
exports.BONFIDA_USDC_BNB = new web3_js_1.PublicKey("DmSyHDSM9eSLyvoLsPvDr5fRRFZ7Bfr3h3ULvWpgQaq7");
exports.USDC_MINT = new web3_js_1.PublicKey("EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v");
exports.REFERRERS = [
    new web3_js_1.PublicKey("3ogYncmMM5CmytsGCqKHydmXmKUZ6sGWvizkzqwT7zb1"),
    new web3_js_1.PublicKey("DM1jJCkZZEwY5tmWbgvKRxsDFzXCdbfrYCCH1CtwguEs"),
    new web3_js_1.PublicKey("ADCp4QXFajHrhy4f43pD6GJFtQLkdBY2mjS9DfCk7tNW"),
    new web3_js_1.PublicKey("2XTgjw8yi1E3Etgj4CUyRD7Zk49gynH2U9gA5N2MY4NP"),
    new web3_js_1.PublicKey("5oDWj8vr3vbcq9JZTtwXqrkCMZggMsDzNietvbr1BNfe"), // Solscan
];
exports.TOKENS_SYM_MINT = new Map([
    ["EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v", "USDC"],
    ["Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB", "USDT"],
    ["So11111111111111111111111111111111111111112", "SOL"],
    ["EchesyfXePKdLtoiZSL8pBe8Myagyy8ZRqsACNCFGnvp", "FIDA"],
    ["FeGn77dhg1KXRRFeSwwMiykZnZPw5JXW6naf2aQgZDQf", "ETH"],
    ["7i5KKsX2weiTkry7jA4ZwSuXGhs5eJBEjY8vVxR4pfRx", "GMT"],
    ["AFbX8oGjGpmVFywbVouvhQSRmiW2aR1mohfahi4Y2AdB", "GST"],
    ["mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So", "MSOL"],
    ["DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263", "BONK"],
    ["EPeUFDgHRxs9xxEPVaL6kfGQvCon7jmAWKVUHuux1Tpz", "BAT"],
]);
exports.PYTH_MAPPING_ACC = new web3_js_1.PublicKey("AHtgzX45WTKfkPG53L6WYhGEXwQkN1BVknET3sVsLL8J");
exports.VAULT_OWNER = new web3_js_1.PublicKey("GcWEQ9K78FV7LEHteFVciYApERk5YvQuFDQPk1yYJVXi");
