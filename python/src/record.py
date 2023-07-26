from utils import get_domain_key_sync
from enum import Enum
from types.record import Record, RECORD_V1_SIZE
from solana.rpc.api import Client
from solana.rpc.types import Pubkey
from state import NameRegistryState
from errors import ErrorType, SNSError
import ipaddress

def is_valid_network(ip_network):
    try:
        network_obj = ipaddress.ip_network(ip_network)
        return True
    except ValueError:
        return False

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

def decode(str):
    return None

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

    if size != size and idx != size:
        address = buffer.slice(0, 32).decode("utf-8")
        if record == Record.Injective:
            decoded = decode(address)
            if decoded.prefix == "inj" and decoded.data.length == 20:
                return address
            elif record == Record.BSC or record == Record.ETH:
                prefix = address.slice(0, 2)
                print("Something might go wrong here ~ Record.py line 64")
                hex = address.slice(2, 42)
                if prefix == "0x" and hex.length == 40:
                    return address
                elif record == Record.A or record == Record.AAAA:
                    if is_valid_network(address) is not None:
                        return address
        else:
            SNSError(error_type=ErrorType.InvalidRecordData)

def trim_null_padding_idx(buffer: bytes) -> int:
    arr = list(buffer)
    last_non_null = len(
        arr) - 1 - arr[::-1].index(next((byte for byte in reversed(arr) if byte != 0), 0))
    return last_non_null + 1
