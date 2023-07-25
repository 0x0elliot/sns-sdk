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
exports.resolve = exports.checkSolRecord = void 0;
var web3_js_1 = require("@solana/web3.js");
var record_1 = require("./record");
var utils_1 = require("./utils");
var state_1 = require("./state");
var tweetnacl = require("tweetnacl");
var record_2 = require("./types/record");
var buffer_1 = require("buffer");
var error_1 = require("./error");
/**
 * This function can be used to verify the validity of a SOL record
 * @param record The record data to verify
 * @param signedRecord The signed data
 * @param pubkey The public key of the signer
 * @returns
 */
var checkSolRecord = function (record, signedRecord, pubkey) {
    return tweetnacl.sign.detached.verify(record, signedRecord, pubkey.toBytes());
};
exports.checkSolRecord = checkSolRecord;
/**
 * This function can be used to resolve a domain name to transfer funds
 * @param connection The Solana RPC connection object
 * @param domain The domain to resolve
 * @returns
 */
var resolve = function (connection, domain) { return __awaiter(void 0, void 0, void 0, function () {
    var pubkey, _a, registry, nftOwner, recordKey, solRecord, encoder, expectedBuffer, expected, valid, err_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                pubkey = (0, utils_1.getDomainKeySync)(domain).pubkey;
                return [4 /*yield*/, state_1.NameRegistryState.retrieve(connection, pubkey)];
            case 1:
                _a = _b.sent(), registry = _a.registry, nftOwner = _a.nftOwner;
                if (nftOwner) {
                    return [2 /*return*/, nftOwner];
                }
                _b.label = 2;
            case 2:
                _b.trys.push([2, 4, , 5]);
                recordKey = (0, record_1.getRecordKeySync)(domain, record_2.Record.SOL);
                return [4 /*yield*/, (0, record_1.getSolRecord)(connection, domain)];
            case 3:
                solRecord = _b.sent();
                if (!(solRecord === null || solRecord === void 0 ? void 0 : solRecord.data)) {
                    throw new error_1.SNSError(error_1.ErrorType.NoRecordData);
                }
                encoder = new TextEncoder();
                expectedBuffer = buffer_1.Buffer.concat([
                    solRecord.data.slice(0, 32),
                    recordKey.toBuffer(),
                ]);
                expected = encoder.encode(expectedBuffer.toString("hex"));
                valid = (0, exports.checkSolRecord)(expected, solRecord.data.slice(32), registry.owner);
                if (!valid) {
                    throw new error_1.SNSError(error_1.ErrorType.InvalidSignature);
                }
                return [2 /*return*/, new web3_js_1.PublicKey(solRecord.data.slice(0, 32))];
            case 4:
                err_1 = _b.sent();
                if (err_1 instanceof Error) {
                    if (err_1.name === "FetchError") {
                        throw err_1;
                    }
                }
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/, registry.owner];
        }
    });
}); };
exports.resolve = resolve;
console.log((0, exports.resolve)(new web3_js_1.Connection("https://api.devnet.solana.com"), "bonfida.sol"));
