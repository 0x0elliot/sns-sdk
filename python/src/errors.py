class ErrorType:
    SymbolNotFound = "SymbolNotFound"
    InvalidSubdomain = "InvalidSubdomain"
    FavouriteDomainNotFound = "FavouriteDomainNotFound"
    MissingParentOwner = "MissingParentOwner"
    U32Overflow = "U32Overflow"
    InvalidBufferLength = "InvalidBufferLength"
    U64Overflow = "U64Overflow"
    NoRecordData = "NoRecordData"
    InvalidRecordData = "InvalidRecordData"
    UnsupportedRecord = "UnsupportedRecord"
    InvalidEvmAddress = "InvalidEvmAddress"
    InvalidInjectiveAddress = "InvalidInjectiveAddress"
    InvalidARecord = "InvalidARecord"
    InvalidAAAARecord = "InvalidAAAARecord"
    InvalidRecordInput = "InvalidRecordInput"
    InvalidSignature = "InvalidSignature"
    AccountDoesNotExist = "AccountDoesNotExist"
    MultipleRegistries = "MultipleRegistries"
    InvalidReverseTwitter = "InvalidReverseTwitter"
    NoAccountData = "NoAccountData"
    InvalidInput = "InvalidInput"


class SNSError(Exception):
    def __init__(self, error_type: ErrorType, message=None):
        super().__init__(message)
        self.error_type = error_type
        self.__class__.__name__ = "SNSError"

        if hasattr(Exception, "__traceback__"):
            self.__traceback__ = Exception.__traceback__
