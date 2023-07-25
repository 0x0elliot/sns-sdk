"use strict";
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
exports.getTokenizedDomains = exports.retrieveNfts = exports.retrieveNftOwner = void 0;
var web3_js_1 = require("@solana/web3.js");
var spl_token_1 = require("@solana/spl-token");
var name_tokenizer_1 = require("./name-tokenizer");
var utils_1 = require("../utils");
/**
 * This function can be used to retrieve the owner of a tokenized domain name
 *
 * @param connection The solana connection object to the RPC node
 * @param nameAccount The key of the domain name
 * @returns
 */
var retrieveNftOwner = function (connection, nameAccount) { return __awaiter(void 0, void 0, void 0, function () {
    var mint, mintInfo, filters, result, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 4, , 5]);
                return [4 /*yield*/, web3_js_1.PublicKey.findProgramAddress([name_tokenizer_1.MINT_PREFIX, nameAccount.toBuffer()], name_tokenizer_1.NAME_TOKENIZER_ID)];
            case 1:
                mint = (_b.sent())[0];
                return [4 /*yield*/, (0, spl_token_1.getMint)(connection, mint)];
            case 2:
                mintInfo = _b.sent();
                if (mintInfo.supply.toString() === "0") {
                    return [2 /*return*/, undefined];
                }
                filters = [
                    {
                        memcmp: {
                            offset: 0,
                            bytes: mint.toBase58()
                        }
                    },
                    {
                        memcmp: {
                            offset: 64,
                            bytes: "2"
                        }
                    },
                    { dataSize: 165 },
                ];
                return [4 /*yield*/, connection.getProgramAccounts(spl_token_1.TOKEN_PROGRAM_ID, {
                        filters: filters
                    })];
            case 3:
                result = _b.sent();
                if (result.length != 1) {
                    return [2 /*return*/, undefined];
                }
                return [2 /*return*/, new web3_js_1.PublicKey(result[0].account.data.slice(32, 64))];
            case 4:
                _a = _b.sent();
                return [2 /*return*/, undefined];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.retrieveNftOwner = retrieveNftOwner;
/**
 * This function can be used to retrieve all the tokenized domains name
 *
 * @param connection The solana connection object to the RPC node
 * @returns
 */
var retrieveNfts = function (connection) { return __awaiter(void 0, void 0, void 0, function () {
    var filters, result, offset;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                filters = [
                    {
                        memcmp: {
                            offset: 0,
                            bytes: "3"
                        }
                    },
                ];
                return [4 /*yield*/, connection.getProgramAccounts(name_tokenizer_1.NAME_TOKENIZER_ID, {
                        filters: filters
                    })];
            case 1:
                result = _a.sent();
                offset = 1 + 1 + 32 + 32;
                return [2 /*return*/, result.map(function (e) { return new web3_js_1.PublicKey(e.account.data.slice(offset, offset + 32)); })];
        }
    });
}); };
exports.retrieveNfts = retrieveNfts;
var getFilter = function (owner) {
    var filters = [
        {
            memcmp: { offset: 32, bytes: owner }
        },
        { memcmp: { offset: 64, bytes: "2" } },
    ];
    return filters;
};
var closure = function (connection, acc) { return __awaiter(void 0, void 0, void 0, function () {
    var record;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, name_tokenizer_1.getRecordFromMint)(connection, acc.mint)];
            case 1:
                record = _a.sent();
                if (record.length === 1) {
                    return [2 /*return*/, name_tokenizer_1.NftRecord.deserialize(record[0].account.data)];
                }
                return [2 /*return*/];
        }
    });
}); };
var retrieveRecords = function (connection, owner) { return __awaiter(void 0, void 0, void 0, function () {
    var filters, result, tokenAccs, promises, records;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                filters = __spreadArray(__spreadArray([], getFilter(owner.toBase58()), true), [
                    { dataSize: 165 },
                ], false);
                return [4 /*yield*/, connection.getProgramAccounts(spl_token_1.TOKEN_PROGRAM_ID, {
                        filters: filters
                    })];
            case 1:
                result = _a.sent();
                tokenAccs = result.map(function (e) { return spl_token_1.AccountLayout.decode(e.account.data); });
                promises = tokenAccs.map(function (acc) { return closure(connection, acc); });
                return [4 /*yield*/, Promise.all(promises)];
            case 2:
                records = _a.sent();
                return [2 /*return*/, records.filter(function (e) { return e !== undefined; })];
        }
    });
}); };
/**
 * This function can be used to retrieve all the tokenized domains of an owner
 * @param connection The Solana RPC connection object
 * @param owner The owner of the tokenized domains
 * @returns
 */
var getTokenizedDomains = function (connection, owner) { return __awaiter(void 0, void 0, void 0, function () {
    var nftRecords, names;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, retrieveRecords(connection, owner)];
            case 1:
                nftRecords = _a.sent();
                return [4 /*yield*/, (0, utils_1.reverseLookupBatch)(connection, nftRecords.map(function (e) { return e.nameAccount; }))];
            case 2:
                names = _a.sent();
                return [2 /*return*/, names
                        .map(function (e, idx) {
                        return {
                            key: nftRecords[idx].nameAccount,
                            mint: nftRecords[idx].nftMint,
                            reverse: e
                        };
                    })
                        .filter(function (e) { return !!e.reverse; })];
        }
    });
}); };
exports.getTokenizedDomains = getTokenizedDomains;
