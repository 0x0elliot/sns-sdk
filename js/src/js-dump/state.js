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
exports.Mint = exports.TokenData = exports.NameRegistryState = void 0;
var web3_js_1 = require("@solana/web3.js");
var borsh_1 = require("borsh");
var nft_1 = require("./nft");
var error_1 = require("./error");
var NameRegistryState = /** @class */ (function () {
    function NameRegistryState(obj) {
        this.parentName = new web3_js_1.PublicKey(obj.parentName);
        this.owner = new web3_js_1.PublicKey(obj.owner);
        this["class"] = new web3_js_1.PublicKey(obj["class"]);
    }
    NameRegistryState.retrieve = function (connection, nameAccountKey) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var nameAccount, res, nftOwner;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, connection.getAccountInfo(nameAccountKey)];
                    case 1:
                        nameAccount = _b.sent();
                        if (!nameAccount) {
                            throw new error_1.SNSError(error_1.ErrorType.AccountDoesNotExist);
                        }
                        res = (0, borsh_1.deserializeUnchecked)(this.schema, NameRegistryState, nameAccount.data);
                        res.data = (_a = nameAccount.data) === null || _a === void 0 ? void 0 : _a.slice(this.HEADER_LEN);
                        return [4 /*yield*/, (0, nft_1.retrieveNftOwner)(connection, nameAccountKey)];
                    case 2:
                        nftOwner = _b.sent();
                        return [2 /*return*/, { registry: res, nftOwner: nftOwner }];
                }
            });
        });
    };
    NameRegistryState._retrieveBatch = function (connection, nameAccountKeys) {
        return __awaiter(this, void 0, void 0, function () {
            var nameAccounts, fn;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, connection.getMultipleAccountsInfo(nameAccountKeys)];
                    case 1:
                        nameAccounts = _a.sent();
                        fn = function (data) {
                            if (!data)
                                return undefined;
                            var res = (0, borsh_1.deserializeUnchecked)(_this.schema, NameRegistryState, data);
                            res.data = data === null || data === void 0 ? void 0 : data.slice(_this.HEADER_LEN);
                            return res;
                        };
                        return [2 /*return*/, nameAccounts.map(function (e) { return fn(e === null || e === void 0 ? void 0 : e.data); })];
                }
            });
        });
    };
    NameRegistryState.retrieveBatch = function (connection, nameAccountKeys) {
        return __awaiter(this, void 0, void 0, function () {
            var result, keys, _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        result = [];
                        keys = __spreadArray([], nameAccountKeys, true);
                        _d.label = 1;
                    case 1:
                        if (!(keys.length > 0)) return [3 /*break*/, 3];
                        _b = (_a = result.push).apply;
                        _c = [result];
                        return [4 /*yield*/, this._retrieveBatch(connection, keys.splice(0, 100))];
                    case 2:
                        _b.apply(_a, _c.concat([(_d.sent())]));
                        return [3 /*break*/, 1];
                    case 3: return [2 /*return*/, result];
                }
            });
        });
    };
    NameRegistryState.HEADER_LEN = 96;
    NameRegistryState.schema = new Map([
        [
            NameRegistryState,
            {
                kind: "struct",
                fields: [
                    ["parentName", [32]],
                    ["owner", [32]],
                    ["class", [32]],
                ]
            },
        ],
    ]);
    return NameRegistryState;
}());
exports.NameRegistryState = NameRegistryState;
var TokenData = /** @class */ (function () {
    function TokenData(obj) {
        this.name = obj.name;
        this.ticker = obj.ticker;
        this.mint = obj.mint;
        this.decimals = obj.decimals;
        this.website = obj === null || obj === void 0 ? void 0 : obj.website;
        this.logoUri = obj === null || obj === void 0 ? void 0 : obj.logoUri;
    }
    TokenData.prototype.serialize = function () {
        return (0, borsh_1.serialize)(TokenData.schema, this);
    };
    TokenData.deserialize = function (data) {
        return (0, borsh_1.deserializeUnchecked)(TokenData.schema, TokenData, data);
    };
    TokenData.schema = new Map([
        [
            TokenData,
            {
                kind: "struct",
                fields: [
                    ["name", "string"],
                    ["ticker", "string"],
                    ["mint", [32]],
                    ["decimals", "u8"],
                    ["website", { kind: "option", type: "string" }],
                    ["logoUri", { kind: "option", type: "string" }],
                ]
            },
        ],
    ]);
    return TokenData;
}());
exports.TokenData = TokenData;
var Mint = /** @class */ (function () {
    function Mint(obj) {
        this.mint = obj.mint;
    }
    Mint.prototype.serialize = function () {
        return (0, borsh_1.serialize)(Mint.schema, this);
    };
    Mint.deserialize = function (data) {
        return (0, borsh_1.deserializeUnchecked)(Mint.schema, Mint, data);
    };
    Mint.schema = new Map([
        [
            Mint,
            {
                kind: "struct",
                fields: [["mint", [32]]]
            },
        ],
    ]);
    return Mint;
}());
exports.Mint = Mint;
