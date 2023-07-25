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
exports.__esModule = true;
exports.getDomainKeySync = exports.getNameAccountKeySync = exports.getHashedNameSync = void 0;
var buffer_1 = require("buffer");
var sha2_1 = require("@ethersproject/sha2");
var web3_js_1 = require("@solana/web3.js");
var HASH_PREFIX = "SPL Name Service";
var NAME_PROGRAM_ID = new web3_js_1.PublicKey("namesLPneVptA9Z5rqUDD9tMTWEJwofgaYwp8cawRkX");
var ROOT_DOMAIN_ACCOUNT = new web3_js_1.PublicKey("58PwtjSDuFHuUkYjH9BYnnQKHfwo9reZhC2zMJv9JPkx");
var getHashedNameSync = function (name) {
    var input = HASH_PREFIX + name;
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
    var nameAccountKey = web3_js_1.PublicKey.findProgramAddressSync(seeds, NAME_PROGRAM_ID)[0];
    return nameAccountKey;
};
exports.getNameAccountKeySync = getNameAccountKeySync;
var _deriveSync = function (name, parent) {
    if (parent === void 0) { parent = ROOT_DOMAIN_ACCOUNT; }
    var hashed = (0, exports.getHashedNameSync)(name);
    var pubkey = (0, exports.getNameAccountKeySync)(hashed, undefined, parent);
    console.log("pubkey ==> ", pubkey);
    return { pubkey: pubkey, hashed: hashed };
};
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
        console.log("Error happened!");
    }
    var result = _deriveSync(domain, ROOT_DOMAIN_ACCOUNT);
    return __assign(__assign({}, result), { isSub: false, parent: undefined });
};
exports.getDomainKeySync = getDomainKeySync;
console.log(_deriveSync("abhinavmir.sol"));
