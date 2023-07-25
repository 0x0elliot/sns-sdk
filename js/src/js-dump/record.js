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
exports.serializeSolRecord = exports.serializeRecord = exports.deserializeRecord = exports.getBackpackRecord = exports.getInjectiveRecord = exports.getBscRecord = exports.getPointRecord = exports.getSolRecord = exports.getShdwRecord = exports.getPicRecord = exports.getTelegramRecord = exports.getTwitterRecord = exports.getRedditRecord = exports.getGithubRecord = exports.getDiscordRecord = exports.getUrlRecord = exports.getEmailRecord = exports.getDogeRecord = exports.getLtcRecord = exports.getBtcRecord = exports.getEthRecord = exports.getArweaveRecord = exports.getIpfsRecord = exports.getRecords = exports.getRecord = exports.getRecordKeySync = void 0;
var record_1 = require("./types/record");
var utils_1 = require("./utils");
var state_1 = require("./state");
var buffer_1 = require("buffer");
var bech32_buffer_1 = require("bech32-buffer");
var resolve_1 = require("./resolve");
var bs58_1 = require("bs58");
var ipaddr_js_1 = require("ipaddr.js");
var punycode_1 = require("punycode");
var utils_2 = require("./utils");
var error_1 = require("./error");
var trimNullPaddingIdx = function (buffer) {
    var arr = Array.from(buffer);
    var lastNonNull = arr.length - 1 - arr.reverse().findIndex(function (byte) { return byte !== 0; });
    return lastNonNull + 1;
};
/**
 * This function can be used to derive a record key
 * @param domain The .sol domain name
 * @param record The record to derive the key for
 * @returns
 */
var getRecordKeySync = function (domain, record) {
    var pubkey = (0, utils_1.getDomainKeySync)(record + "." + domain, true).pubkey;
    return pubkey;
};
exports.getRecordKeySync = getRecordKeySync;
/**
 * This function can be used to retrieve a specified record for the given domain name
 * @param connection The Solana RPC connection object
 * @param domain The .sol domain name
 * @param record The record to search for
 * @returns
 */
function getRecord(connection, domain, record, deserialize) {
    return __awaiter(this, void 0, void 0, function () {
        var pubkey, registry, recordSize;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    pubkey = (0, exports.getRecordKeySync)(domain, record);
                    return [4 /*yield*/, state_1.NameRegistryState.retrieve(connection, pubkey)];
                case 1:
                    registry = (_a.sent()).registry;
                    if (!registry.data) {
                        throw new error_1.SNSError(error_1.ErrorType.NoRecordData);
                    }
                    if (deserialize) {
                        return [2 /*return*/, (0, exports.deserializeRecord)(registry, record, pubkey)];
                    }
                    recordSize = record_1.RECORD_V1_SIZE.get(record);
                    registry.data = registry.data.slice(0, recordSize);
                    return [2 /*return*/, registry];
            }
        });
    });
}
exports.getRecord = getRecord;
function getRecords(connection, domain, records, deserialize) {
    return __awaiter(this, void 0, void 0, function () {
        var pubkeys, registries;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    pubkeys = records.map(function (record) { return (0, exports.getRecordKeySync)(domain, record); });
                    return [4 /*yield*/, state_1.NameRegistryState.retrieveBatch(connection, pubkeys)];
                case 1:
                    registries = _a.sent();
                    if (deserialize) {
                        return [2 /*return*/, registries.map(function (e, idx) {
                                if (!e)
                                    return undefined;
                                return (0, exports.deserializeRecord)(e, records[idx], (0, exports.getRecordKeySync)(domain, records[idx]));
                            })];
                    }
                    return [2 /*return*/, registries];
            }
        });
    });
}
exports.getRecords = getRecords;
/**
 * This function can be used to retrieve the IPFS record of a domain name
 * @param connection The Solana RPC connection object
 * @param domain The .sol domain name
 * @returns
 */
var getIpfsRecord = function (connection, domain) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, getRecord(connection, domain, record_1.Record.IPFS, true)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.getIpfsRecord = getIpfsRecord;
/**
 * This function can be used to retrieve the Arweave record of a domain name
 * @param connection The Solana RPC connection object
 * @param domain The .sol domain name
 * @returns
 */
var getArweaveRecord = function (connection, domain) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, getRecord(connection, domain, record_1.Record.ARWV, true)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.getArweaveRecord = getArweaveRecord;
/**
 * This function can be used to retrieve the ETH record of a domain name
 * @param connection The Solana RPC connection object
 * @param domain The .sol domain name
 * @returns
 */
var getEthRecord = function (connection, domain) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, getRecord(connection, domain, record_1.Record.ETH, true)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.getEthRecord = getEthRecord;
/**
 * This function can be used to retrieve the BTC record of a domain name
 * @param connection The Solana RPC connection object
 * @param domain The .sol domain name
 * @returns
 */
var getBtcRecord = function (connection, domain) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, getRecord(connection, domain, record_1.Record.BTC, true)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.getBtcRecord = getBtcRecord;
/**
 * This function can be used to retrieve the LTC record of a domain name
 * @param connection The Solana RPC connection object
 * @param domain The .sol domain name
 * @returns
 */
var getLtcRecord = function (connection, domain) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, getRecord(connection, domain, record_1.Record.LTC, true)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.getLtcRecord = getLtcRecord;
/**
 * This function can be used to retrieve the DOGE record of a domain name
 * @param connection The Solana RPC connection object
 * @param domain The .sol domain name
 * @returns
 */
var getDogeRecord = function (connection, domain) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, getRecord(connection, domain, record_1.Record.DOGE, true)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.getDogeRecord = getDogeRecord;
/**
 * This function can be used to retrieve the email record of a domain name
 * @param connection The Solana RPC connection object
 * @param domain The .sol domain name
 * @returns
 */
var getEmailRecord = function (connection, domain) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, getRecord(connection, domain, record_1.Record.Email, true)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.getEmailRecord = getEmailRecord;
/**
 * This function can be used to retrieve the URL record of a domain name
 * @param connection The Solana RPC connection object
 * @param domain The .sol domain name
 * @returns
 */
var getUrlRecord = function (connection, domain) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, getRecord(connection, domain, record_1.Record.Url, true)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.getUrlRecord = getUrlRecord;
/**
 * This function can be used to retrieve the Discord record of a domain name
 * @param connection The Solana RPC connection object
 * @param domain The .sol domain name
 * @returns
 */
var getDiscordRecord = function (connection, domain) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, getRecord(connection, domain, record_1.Record.Discord, true)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.getDiscordRecord = getDiscordRecord;
/**
 * This function can be used to retrieve the Github record of a domain name
 * @param connection The Solana RPC connection object
 * @param domain The .sol domain name
 * @returns
 */
var getGithubRecord = function (connection, domain) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, getRecord(connection, domain, record_1.Record.Github, true)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.getGithubRecord = getGithubRecord;
/**
 * This function can be used to retrieve the Reddit record of a domain name
 * @param connection The Solana RPC connection object
 * @param domain The .sol domain name
 * @returns
 */
var getRedditRecord = function (connection, domain) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, getRecord(connection, domain, record_1.Record.Reddit, true)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.getRedditRecord = getRedditRecord;
/**
 * This function can be used to retrieve the Twitter record of a domain name
 * @param connection The Solana RPC connection object
 * @param domain The .sol domain name
 * @returns
 */
var getTwitterRecord = function (connection, domain) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, getRecord(connection, domain, record_1.Record.Twitter, true)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.getTwitterRecord = getTwitterRecord;
/**
 * This function can be used to retrieve the Telegram record of a domain name
 * @param connection The Solana RPC connection object
 * @param domain The .sol domain name
 * @returns
 */
var getTelegramRecord = function (connection, domain) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, getRecord(connection, domain, record_1.Record.Telegram, true)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.getTelegramRecord = getTelegramRecord;
/**
 * This function can be used to retrieve the pic record of a domain name
 * @param connection The Solana RPC connection object
 * @param domain The .sol domain name
 * @returns
 */
var getPicRecord = function (connection, domain) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, getRecord(connection, domain, record_1.Record.Pic, true)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.getPicRecord = getPicRecord;
/**
 * This function can be used to retrieve the SHDW record of a domain name
 * @param connection The Solana RPC connection object
 * @param domain The .sol domain name
 * @returns
 */
var getShdwRecord = function (connection, domain) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, getRecord(connection, domain, record_1.Record.SHDW, true)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.getShdwRecord = getShdwRecord;
/**
 * This function can be used to retrieve the SOL record of a domain name
 * @param connection The Solana RPC connection object
 * @param domain The .sol domain name
 * @returns
 */
var getSolRecord = function (connection, domain) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, getRecord(connection, domain, record_1.Record.SOL)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.getSolRecord = getSolRecord;
/**
 * This function can be used to retrieve the POINT record of a domain name
 * @param connection The Solana RPC connection object
 * @param domain The .sol domain name
 * @returns
 */
var getPointRecord = function (connection, domain) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, getRecord(connection, domain, record_1.Record.POINT, true)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.getPointRecord = getPointRecord;
/**
 * This function can be used to retrieve the BSC record of a domain name
 * @param connection The Solana RPC connection object
 * @param domain The .sol domain name
 * @returns
 */
var getBscRecord = function (connection, domain) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, getRecord(connection, domain, record_1.Record.BSC, true)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.getBscRecord = getBscRecord;
/**
 * This function can be used to retrieve the Injective record of a domain name
 * @param connection The Solana RPC connection object
 * @param domain The .sol domain name
 * @returns
 */
var getInjectiveRecord = function (connection, domain) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, getRecord(connection, domain, record_1.Record.Injective, true)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.getInjectiveRecord = getInjectiveRecord;
/**
 * This function can be used to retrieve the Backpack record of a domain name
 * @param connection The Solana RPC connection object
 * @param domain The .sol domain name
 * @returns
 */
var getBackpackRecord = function (connection, domain) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, getRecord(connection, domain, record_1.Record.Backpack, true)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.getBackpackRecord = getBackpackRecord;
/**
 * This function can be used to deserialize the content of a record. If the content is invalid it will throw an error
 * @param registry The name registry state object of the record being deserialized
 * @param record The record enum being deserialized
 * @param recordKey The public key of the record being deserialized
 * @returns
 */
var deserializeRecord = function (registry, record, recordKey) {
    var buffer = registry === null || registry === void 0 ? void 0 : registry.data;
    if (!buffer)
        return undefined;
    var size = record_1.RECORD_V1_SIZE.get(record);
    var idx = trimNullPaddingIdx(buffer);
    if (!size) {
        return buffer.slice(0, idx).toString("utf-8");
    }
    // Old record UTF-8 encoded
    if (size && idx !== size) {
        var address = buffer.slice(0, idx).toString("utf-8");
        if (record === record_1.Record.Injective) {
            var decoded = (0, bech32_buffer_1.decode)(address);
            if (decoded.prefix === "inj" && decoded.data.length === 20) {
                return address;
            }
        }
        else if (record === record_1.Record.BSC || record === record_1.Record.ETH) {
            var prefix = address.slice(0, 2);
            var hex = address.slice(2);
            if (prefix === "0x" && buffer_1.Buffer.from(hex, "hex").length === 20) {
                return address;
            }
        }
        else if (record === record_1.Record.A || record === record_1.Record.AAAA) {
            if (ipaddr_js_1["default"].isValid(address)) {
                return address;
            }
        }
        throw new error_1.SNSError(error_1.ErrorType.InvalidRecordData);
    }
    if (record === record_1.Record.SOL) {
        var encoder = new TextEncoder();
        var expectedBuffer = buffer_1.Buffer.concat([
            buffer.slice(0, 32),
            recordKey.toBuffer(),
        ]);
        var expected = encoder.encode(expectedBuffer.toString("hex"));
        var valid = (0, resolve_1.checkSolRecord)(expected, buffer.slice(32), registry.owner);
        if (valid) {
            return bs58_1["default"].encode(buffer.slice(0, 32));
        }
    }
    else if (record === record_1.Record.ETH || record === record_1.Record.BSC) {
        return "0x" + buffer.slice(0, size).toString("hex");
    }
    else if (record === record_1.Record.Injective) {
        return (0, bech32_buffer_1.encode)("inj", buffer.slice(0, size), "bech32");
    }
    else if (record === record_1.Record.A || record === record_1.Record.AAAA) {
        return ipaddr_js_1["default"].fromByteArray(__spreadArray([], buffer.slice(0, size), true)).toString();
    }
    throw new error_1.SNSError(error_1.ErrorType.InvalidRecordData);
};
exports.deserializeRecord = deserializeRecord;
/**
 * This function can be used to serialize a user input string into a buffer that will be stored into a record account data
 * For serializing SOL records use `serializeSolRecord`
 * @param str The string being serialized into the record account data
 * @param record The record enum being serialized
 * @returns
 */
var serializeRecord = function (str, record) {
    var size = record_1.RECORD_V1_SIZE.get(record);
    if (!size) {
        if (record === record_1.Record.CNAME || record === record_1.Record.TXT) {
            str = (0, punycode_1.encode)(str);
        }
        return buffer_1.Buffer.from(str, "utf-8");
    }
    if (record === record_1.Record.SOL) {
        throw new error_1.SNSError(error_1.ErrorType.UnsupportedRecord, "Use `serializeSolRecord` for SOL record");
    }
    else if (record === record_1.Record.ETH || record === record_1.Record.BSC) {
        (0, utils_2.check)(str.slice(0, 2) === "0x", error_1.ErrorType.InvalidEvmAddress);
        return buffer_1.Buffer.from(str.slice(2), "hex");
    }
    else if (record === record_1.Record.Injective) {
        var decoded = (0, bech32_buffer_1.decode)(str);
        (0, utils_2.check)(decoded.prefix === "inj", error_1.ErrorType.InvalidInjectiveAddress);
        (0, utils_2.check)(decoded.data.length === 20, error_1.ErrorType.InvalidInjectiveAddress);
        return buffer_1.Buffer.from(decoded.data);
    }
    else if (record === record_1.Record.A) {
        var array = ipaddr_js_1["default"].parse(str).toByteArray();
        (0, utils_2.check)(array.length === 4, error_1.ErrorType.InvalidARecord);
        return buffer_1.Buffer.from(array);
    }
    else if (record === record_1.Record.AAAA) {
        var array = ipaddr_js_1["default"].parse(str).toByteArray();
        (0, utils_2.check)(array.length === 16, error_1.ErrorType.InvalidAAAARecord);
        return buffer_1.Buffer.from(array);
    }
    throw new error_1.SNSError(error_1.ErrorType.InvalidRecordInput);
};
exports.serializeRecord = serializeRecord;
/**
 * This function can be used to build the content of a SOL record
 * @param content The public key being stored in the SOL record
 * @param recordKey The record public key
 * @param signer The signer of the record i.e the domain owner
 * @param signature The signature of the record's content
 * @returns
 */
var serializeSolRecord = function (content, recordKey, signer, signature) {
    var expected = buffer_1.Buffer.concat([content.toBuffer(), recordKey.toBuffer()]);
    var encodedMessage = new TextEncoder().encode(expected.toString("hex"));
    var valid = (0, resolve_1.checkSolRecord)(encodedMessage, signature, signer);
    (0, utils_2.check)(valid, error_1.ErrorType.InvalidSignature);
    return buffer_1.Buffer.concat([content.toBuffer(), signature]);
};
exports.serializeSolRecord = serializeSolRecord;
