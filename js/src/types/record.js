"use strict";
exports.__esModule = true;
exports.RECORD_V1_SIZE = exports.Record = void 0;
/**
 * List of SNS Records
 */
var Record;
(function (Record) {
    Record["IPFS"] = "IPFS";
    Record["ARWV"] = "ARWV";
    Record["SOL"] = "SOL";
    Record["ETH"] = "ETH";
    Record["BTC"] = "BTC";
    Record["LTC"] = "LTC";
    Record["DOGE"] = "DOGE";
    Record["Email"] = "email";
    Record["Url"] = "url";
    Record["Discord"] = "discord";
    Record["Github"] = "github";
    Record["Reddit"] = "reddit";
    Record["Twitter"] = "twitter";
    Record["Telegram"] = "telegram";
    Record["Pic"] = "pic";
    Record["SHDW"] = "SHDW";
    Record["POINT"] = "POINT";
    Record["BSC"] = "BSC";
    Record["Injective"] = "INJ";
    Record["Backpack"] = "backpack";
    Record["A"] = "A";
    Record["AAAA"] = "AAAA";
    Record["CNAME"] = "CNAME";
    Record["TXT"] = "TXT";
})(Record = exports.Record || (exports.Record = {}));
exports.RECORD_V1_SIZE = new Map([
    [Record.SOL, 96],
    [Record.ETH, 20],
    [Record.BSC, 20],
    [Record.Injective, 20],
    [Record.A, 4],
    [Record.AAAA, 16],
]);
