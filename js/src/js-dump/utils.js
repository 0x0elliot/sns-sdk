"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.check = exports.getReverseKeySync = exports.getAllRegisteredDomains = exports.getAllDomains = exports.getDomainKeySync = exports.findSubdomains = exports.reverseLookupBatch = exports.reverseLookup = exports.getNameAccountKeySync = exports.getHashedNameSync = void 0;
var web3_js_1 = require("@solana/web3.js");
var bn_js_1 = require("bn.js");
var sha2_1 = require("@ethersproject/sha2");
var constants_1 = require("./constants");
var state_1 = require("./state");
var constants_2 = require("./constants");
var buffer_1 = require("buffer");
var error_1 = require("./error");
var getHashedNameSync = function (name) {
    var input = constants_1.HASH_PREFIX + name;
    var str = (0, sha2_1.sha256)(buffer_1.Buffer.from(input, "utf8")).slice(2);
    return buffer_1.Buffer.from(str, "hex");
};
exports.getHashedNameSync = getHashedNameSync;
var getNameAccountKeySync = function (hashed_name, nameClass, nameParent) {
    var seeds = [hashed_name];
    if (nameClass) {
        seeds.push(nameClass.toBuffer());
    }
    else {
        seeds.push(buffer_1.Buffer.alloc(32));
    }
    if (nameParent) {
        seeds.push(nameParent.toBuffer());
    }
    else {
        seeds.push(buffer_1.Buffer.alloc(32));
    }
    var nameAccountKey = web3_js_1.PublicKey.findProgramAddressSync(seeds, constants_1.NAME_PROGRAM_ID)[0];
    return nameAccountKey;
};
exports.getNameAccountKeySync = getNameAccountKeySync;
/**
 * This function can be used to perform a reverse look up
 * @param connection The Solana RPC connection
 * @param nameAccount The public key of the domain to look up
 * @returns The human readable domain name
 */
function reverseLookup(connection, nameAccount) {
    return __awaiter(this, void 0, void 0, function () {
        var hashedReverseLookup, reverseLookupAccount, registry, nameLength;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    hashedReverseLookup = (0, exports.getHashedNameSync)(nameAccount.toBase58());
                    reverseLookupAccount = (0, exports.getNameAccountKeySync)(hashedReverseLookup, constants_2.REVERSE_LOOKUP_CLASS);
                    return [4 /*yield*/, state_1.NameRegistryState.retrieve(connection, reverseLookupAccount)];
                case 1:
                    registry = (_a.sent()).registry;
                    if (!registry.data) {
                        throw new error_1.SNSError(error_1.ErrorType.NoAccountData);
                    }
                    nameLength = new bn_js_1["default"](registry.data.slice(0, 4), "le").toNumber();
                    return [2 /*return*/, registry.data.slice(4, 4 + nameLength).toString()];
            }
        });
    });
}
exports.reverseLookup = reverseLookup;
/**
 * This function can be used to perform a reverse look up
 * @param connection The Solana RPC connection
 * @param nameAccount The public keys of the domains to look up
 * @returns The human readable domain names
 */
function reverseLookupBatch(connection, nameAccounts) {
    return __awaiter(this, void 0, void 0, function () {
        var reverseLookupAccounts, _i, nameAccounts_1, nameAccount, hashedReverseLookup, reverseLookupAccount, names;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    reverseLookupAccounts = [];
                    for (_i = 0, nameAccounts_1 = nameAccounts; _i < nameAccounts_1.length; _i++) {
                        nameAccount = nameAccounts_1[_i];
                        hashedReverseLookup = (0, exports.getHashedNameSync)(nameAccount.toBase58());
                        reverseLookupAccount = (0, exports.getNameAccountKeySync)(hashedReverseLookup, constants_2.REVERSE_LOOKUP_CLASS);
                        reverseLookupAccounts.push(reverseLookupAccount);
                    }
                    return [4 /*yield*/, state_1.NameRegistryState.retrieveBatch(connection, reverseLookupAccounts)];
                case 1:
                    names = _a.sent();
                    return [2 /*return*/, names.map(function (name) {
                            if (name === undefined || name.data === undefined) {
                                return undefined;
                            }
                            var nameLength = new bn_js_1["default"](name.data.slice(0, 4), "le").toNumber();
                            return name.data.slice(4, 4 + nameLength).toString();
                        })];
            }
        });
    });
}
exports.reverseLookupBatch = reverseLookupBatch;
/**
 *
 * @param connection The Solana RPC connection object
 * @param parentKey The parent you want to find sub-domains for
 * @returns
 */
var findSubdomains = function (connection, parentKey) { return __awaiter(void 0, void 0, void 0, function () {
    var filtersReverse, reverse, parent, subs, keys, subsAcc;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                filtersReverse = [
                    {
                        memcmp: {
                            offset: 0,
                            bytes: parentKey.toBase58()
                        }
                    },
                    {
                        memcmp: {
                            offset: 64,
                            bytes: constants_2.REVERSE_LOOKUP_CLASS.toBase58()
                        }
                    },
                ];
                return [4 /*yield*/, connection.getProgramAccounts(constants_1.NAME_PROGRAM_ID, {
                        filters: filtersReverse
                    })];
            case 1:
                reverse = _a.sent();
                return [4 /*yield*/, reverseLookup(connection, parentKey)];
            case 2:
                parent = _a.sent();
                subs = reverse.map(function (e) { var _a; return (_a = e.account.data.slice(97).toString("utf-8")) === null || _a === void 0 ? void 0 : _a.split("\0").join(""); });
                keys = subs.map(function (e) { return (0, exports.getDomainKeySync)(e + "." + parent).pubkey; });
                return [4 /*yield*/, connection.getMultipleAccountsInfo(keys)];
            case 3:
                subsAcc = _a.sent();
                return [2 /*return*/, subs.filter(function (_, idx) { return !!subsAcc[idx]; })];
        }
    });
}); };
exports.findSubdomains = findSubdomains;
var _deriveSync = function (name, parent) {
    if (parent === void 0) { parent = constants_1.ROOT_DOMAIN_ACCOUNT; }
    var hashed = (0, exports.getHashedNameSync)(name);
    var pubkey = (0, exports.getNameAccountKeySync)(hashed, undefined, parent);
    return { pubkey: pubkey, hashed: hashed };
};
/**
 * This function can be used to compute the public key of a domain or subdomain
 * @param domain The domain to compute the public key for (e.g `bonfida.sol`, `dex.bonfida.sol`)
 * @param record Optional parameter: If the domain being resolved is a record
 * @returns
 */
var getDomainKeySync = function (domain, record) {
    if (record === void 0) { record = false; }
    if (domain.endsWith(".sol")) {
        domain = domain.slice(0, -4);
    }
    var splitted = domain.split(".");
    if (splitted.length === 2) {
        var prefix = buffer_1.Buffer.from([record ? 1 : 0]).toString();
        var sub = prefix.concat(splitted[0]);
        var parentKey = _deriveSync(splitted[1]).pubkey;
        var result_1 = _deriveSync(sub, parentKey);
        return __assign(__assign({}, result_1), { isSub: true, parent: parentKey });
    }
    else if (splitted.length === 3 && record) {
        // Parent key
        var parentKey = _deriveSync(splitted[2]).pubkey;
        // Sub domain
        var subKey = _deriveSync("\0".concat(splitted[1]), parentKey).pubkey;
        // Sub record
        var recordPrefix = buffer_1.Buffer.from([1]).toString();
        var result_2 = _deriveSync(recordPrefix.concat(splitted[0]), subKey);
        return __assign(__assign({}, result_2), { isSub: true, parent: parentKey, isSubRecord: true });
    }
    else if (splitted.length >= 3) {
        throw new error_1.SNSError(error_1.ErrorType.InvalidInput);
    }
    var result = _deriveSync(domain, constants_1.ROOT_DOMAIN_ACCOUNT);
    return __assign(__assign({}, result), { isSub: false, parent: undefined });
};
exports.getDomainKeySync = getDomainKeySync;
/**
 * This function can be used to retrieve all domain names owned by `wallet`
 * @param connection The Solana RPC connection object
 * @param wallet The wallet you want to search domain names for
 * @returns
 */
function getAllDomains(connection, wallet) {
    return __awaiter(this, void 0, void 0, function () {
        var filters, accounts;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    filters = [
                        {
                            memcmp: {
                                offset: 32,
                                bytes: wallet.toBase58()
                            }
                        },
                        {
                            memcmp: {
                                offset: 0,
                                bytes: constants_1.ROOT_DOMAIN_ACCOUNT.toBase58()
                            }
                        },
                    ];
                    return [4 /*yield*/, connection.getProgramAccounts(constants_1.NAME_PROGRAM_ID, {
                            filters: filters
                        })];
                case 1:
                    accounts = _a.sent();
                    return [2 /*return*/, accounts.map(function (a) { return a.pubkey; })];
            }
        });
    });
}
exports.getAllDomains = getAllDomains;
/**
 * This function can be used to retrieve all the registered `.sol` domains.
 * The account data is sliced to avoid enormous payload and only the owner is returned
 * @param connection The Solana RPC connection object
 * @returns
 */
var getAllRegisteredDomains = function (connection) { return __awaiter(void 0, void 0, void 0, function () {
    var filters, dataSlice, accounts;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                filters = [
                    {
                        memcmp: {
                            offset: 0,
                            bytes: constants_1.ROOT_DOMAIN_ACCOUNT.toBase58()
                        }
                    },
                ];
                dataSlice = { offset: 32, length: 32 };
                return [4 /*yield*/, connection.getProgramAccounts(constants_1.NAME_PROGRAM_ID, {
                        dataSlice: dataSlice,
                        filters: filters
                    })];
            case 1:
                accounts = _a.sent();
                return [2 /*return*/, accounts];
        }
    });
}); };
exports.getAllRegisteredDomains = getAllRegisteredDomains;
/**
 * This function can be used to get the key of the reverse account
 * @param domain The domain to compute the reverse for
 * @param isSub Whether the domain is a subdomain or not
 * @returns The public key of the reverse account
 */
var getReverseKeySync = function (domain, isSub) {
    var _a = (0, exports.getDomainKeySync)(domain), pubkey = _a.pubkey, parent = _a.parent;
    var hashedReverseLookup = (0, exports.getHashedNameSync)(pubkey.toBase58());
    var reverseLookupAccount = (0, exports.getNameAccountKeySync)(hashedReverseLookup, constants_2.REVERSE_LOOKUP_CLASS, isSub ? parent : undefined);
    return reverseLookupAccount;
};
exports.getReverseKeySync = getReverseKeySync;
var check = function (bool, errorType) {
    if (!bool) {
        throw new error_1.SNSError(errorType);
    }
};
exports.check = check;
