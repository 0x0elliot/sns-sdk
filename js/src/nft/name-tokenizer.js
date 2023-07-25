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
exports.__esModule = true;
exports.getRecordFromMint = exports.NftRecord = exports.Tag = exports.MINT_PREFIX = exports.NAME_TOKENIZER_ID = void 0;
var borsh_1 = require("borsh");
var web3_js_1 = require("@solana/web3.js");
var buffer_1 = require("buffer");
exports.NAME_TOKENIZER_ID = new web3_js_1.PublicKey("nftD3vbNkNqfj2Sd3HZwbpw4BxxKWr4AjGb9X38JeZk");
exports.MINT_PREFIX = buffer_1.Buffer.from("tokenized_name");
var Tag;
(function (Tag) {
    Tag[Tag["Uninitialized"] = 0] = "Uninitialized";
    Tag[Tag["CentralState"] = 1] = "CentralState";
    Tag[Tag["ActiveRecord"] = 2] = "ActiveRecord";
    Tag[Tag["InactiveRecord"] = 3] = "InactiveRecord";
})(Tag = exports.Tag || (exports.Tag = {}));
var NftRecord = /** @class */ (function () {
    function NftRecord(obj) {
        this.tag = obj.tag;
        this.nonce = obj.nonce;
        this.nameAccount = new web3_js_1.PublicKey(obj.nameAccount);
        this.owner = new web3_js_1.PublicKey(obj.owner);
        this.nftMint = new web3_js_1.PublicKey(obj.nftMint);
    }
    NftRecord.deserialize = function (data) {
        return (0, borsh_1.deserialize)(this.schema, NftRecord, data);
    };
    NftRecord.retrieve = function (connection, key) {
        return __awaiter(this, void 0, void 0, function () {
            var accountInfo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, connection.getAccountInfo(key)];
                    case 1:
                        accountInfo = _a.sent();
                        if (!accountInfo || !accountInfo.data) {
                            throw new Error("NFT record not found");
                        }
                        return [2 /*return*/, this.deserialize(accountInfo.data)];
                }
            });
        });
    };
    NftRecord.findKey = function (nameAccount, programId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, web3_js_1.PublicKey.findProgramAddress([buffer_1.Buffer.from("nft_record"), nameAccount.toBuffer()], programId)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    NftRecord.schema = new Map([
        [
            NftRecord,
            {
                kind: "struct",
                fields: [
                    ["tag", "u8"],
                    ["nonce", "u8"],
                    ["nameAccount", [32]],
                    ["owner", [32]],
                    ["nftMint", [32]],
                ]
            },
        ],
    ]);
    return NftRecord;
}());
exports.NftRecord = NftRecord;
/**
 * This function can be used to retrieve a NFT Record given a mint
 *
 * @param connection A solana RPC connection
 * @param mint The mint of the NFT Record
 * @returns
 */
var getRecordFromMint = function (connection, mint) { return __awaiter(void 0, void 0, void 0, function () {
    var filters, result;
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
                    {
                        memcmp: {
                            offset: 1 + 1 + 32 + 32,
                            bytes: mint.toBase58()
                        }
                    },
                ];
                return [4 /*yield*/, connection.getProgramAccounts(exports.NAME_TOKENIZER_ID, {
                        filters: filters
                    })];
            case 1:
                result = _a.sent();
                return [2 /*return*/, result];
        }
    });
}); };
exports.getRecordFromMint = getRecordFromMint;
