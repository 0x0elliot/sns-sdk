from utils import get_domain_key_sync
from enum import Enum
from types.record import Record, RECORD_V1_SIZE
from solana.rpc.api import Client
from solana.rpc.types import Pubkey
from state import NameRegistryState
from errors import ErrorType, SNSError


def get_record_key_sync(domain: str, record: Record) -> str:
    pubkey = get_domain_key_sync(record + "." + domain, True)["pubkey"]
    return pubkey


def get_sol_record(connection: Client, domain_pub_key: str, registry: str) -> Pubkey:
    return get_record(connection, domain_pub_key, registry, Record.SOL)

# always use in try catch


def get_record(
        connection: Client, domain: str, record: Record, deserialize: bool = True
) -> NameRegistryState:
    public_key = get_record_key_sync(domain=domain, record=record)
    [registry, nft_owner] = NameRegistryState.retrieve(
        connection=connection, name_account_key=public_key)

    if not registry.data:
        SNSError(error_type=ErrorType.NoRecordData)

    
    if deserialize:
        return deserializeRecord(registry, record, public_key)
    
    record_size = RECORD_V1_SIZE.get(record)
    registry.data = registry.data.slice(0, record_size)

    return registry


def deserializeRecord(
        record: Record,
        record_key: Pubkey,
        registry: NameRegistryState = None
) -> str:
    buffer = registry.data
    if not buffer:
        return None
    
    size = RECORD_V1_SIZE.get(record)
    idx = trim_null_padding_idx(buffer)

    if not size:
        return buffer.slice(0, idx).decode("utf-8")
    
    # @TODO: implement OLD RECORD


def trim_null_padding_idx(buffer: bytes) -> int:
    arr = list(buffer)
    last_non_null = len(arr) - 1 - arr[::-1].index(next((byte for byte in reversed(arr) if byte != 0), 0))
    return last_non_null + 1
