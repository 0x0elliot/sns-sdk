"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.SNSError = exports.ErrorType = void 0;
var ErrorType;
(function (ErrorType) {
    ErrorType["SymbolNotFound"] = "SymbolNotFound";
    ErrorType["InvalidSubdomain"] = "InvalidSubdomain";
    ErrorType["FavouriteDomainNotFound"] = "FavouriteDomainNotFound";
    ErrorType["MissingParentOwner"] = "MissingParentOwner";
    ErrorType["U32Overflow"] = "U32Overflow";
    ErrorType["InvalidBufferLength"] = "InvalidBufferLength";
    ErrorType["U64Overflow"] = "U64Overflow";
    ErrorType["NoRecordData"] = "NoRecordData";
    ErrorType["InvalidRecordData"] = "InvalidRecordData";
    ErrorType["UnsupportedRecord"] = "UnsupportedRecord";
    ErrorType["InvalidEvmAddress"] = "InvalidEvmAddress";
    ErrorType["InvalidInjectiveAddress"] = "InvalidInjectiveAddress";
    ErrorType["InvalidARecord"] = "InvalidARecord";
    ErrorType["InvalidAAAARecord"] = "InvalidAAAARecord";
    ErrorType["InvalidRecordInput"] = "InvalidRecordInput";
    ErrorType["InvalidSignature"] = "InvalidSignature";
    ErrorType["AccountDoesNotExist"] = "AccountDoesNotExist";
    ErrorType["MultipleRegistries"] = "MultipleRegistries";
    ErrorType["InvalidReverseTwitter"] = "InvalidReverseTwitter";
    ErrorType["NoAccountData"] = "NoAccountData";
    ErrorType["InvalidInput"] = "InvalidInput";
})(ErrorType = exports.ErrorType || (exports.ErrorType = {}));
var SNSError = /** @class */ (function (_super) {
    __extends(SNSError, _super);
    function SNSError(type, message) {
        var _this = _super.call(this, message) || this;
        _this.name = "SNSError";
        _this.type = type;
        if (Error.captureStackTrace) {
            Error.captureStackTrace(_this, SNSError);
        }
        return _this;
    }
    return SNSError;
}(Error));
exports.SNSError = SNSError;
