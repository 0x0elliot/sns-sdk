import ipaddress
from types.record import RECORD_V1_SIZE, Record
from typing import Optional

from errors import ErrorType, SNSError
from solana.rpc.api import Client
from solana.rpc.types import Pubkey
from state import NameRegistryState
from utils import get_domain_key_sync
from resolve import check_sol_record

def serialize_record(record: Record, data: str) -> bytes:
    size = RECORD_V1_SIZE.get(record)

    if not size:
        if record in (Record.CNAME, Record.TXT): 
            data_bytes = data.encode("utf-8")  
            return bytes(data_bytes)

    if record == Record.SOL:
        raise SNSError(
            error_type=ErrorType.UnsupportedRecordType, 
            message="Use serialize_sol_record instead")
    elif record == Record.ETH or record == Record.BSC:
        if not data.startswith("0x"):
            raise SNSError(error_type=ErrorType.InvalidEvmAddress)
        hex_data = data[2:]
        return bytes.fromhex(hex_data)
    elif record == Record.Injective:
        decoded = decode(data)
        if decoded.prefix != "inj" or len(decoded.data) != 20:
            raise SNSError(error_type=ErrorType.InvalidInjectiveAddress)
        return bytes(decoded.data)
    elif record == Record.A:
        ip = ipaddress.IPv4Address(data)
        array = ip.packed
        if len(array) != 4:
            raise SNSError(error_type=ErrorType.InvalidARecord)
        return bytes(array)
    elif record == Record.AAAA:
        ip = ipaddress.IPv6Address(data)
        array = ip.packed
        if len(array) != 16:
            raise SNSError(error_type=ErrorType.InvalidAAAARecord)
        return bytes(array)

def is_valid_network(ip_network):
    try:
        ipaddress.ip_network(ip_network)
        return True
    except ValueError:
        return False

def get_record_key_sync(domain: str, record: Record) -> str:
    pubkey = get_domain_key_sync(record + "." + domain, True)["pubkey"]
    return pubkey

def get_sol_record(connection: Client, domain_pub_key: str) -> Pubkey:
    return get_record(
        connection=connection, domain=domain_pub_key, 
        record=Record.SOL, deserialize=False)

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
        arr) - 1 - arr[::-1].index(
        next((byte for byte in reversed(arr) if byte != 0), 0))
    return last_non_null + 1


def get_ipfs_record(connection: Client, domain: str) -> Optional[str]:
    return get_record(connection, domain, Record.IPFS, True)

def get_arweave_record(connection: Client, domain: str) -> Optional[str]:
    return get_record(connection, domain, Record.ARWV, True)

def get_eth_record(connection: Client, domain: str) -> Optional[str]:
    return get_record(connection, domain, Record.ETH, True)

def get_btc_record(connection: Client, domain: str) -> Optional[str]:
    return get_record(connection, domain, Record.BTC, True)

def get_ltc_record(connection: Client, domain: str) -> Optional[str]:
    return get_record(connection, domain, Record.LTC, True)

def get_doge_record(connection: Client, domain: str) -> Optional[str]:
    return get_record(connection, domain, Record.DOGE, True)

def get_email_record(connection: Client, domain: str) -> Optional[str]:
    return get_record(connection, domain, Record.Email, True)

def get_url_record(connection: Client, domain: str) -> Optional[str]:
    return get_record(connection, domain, Record.Url, True)

def get_discord_record(connection: Client, domain: str) -> Optional[str]:
    return get_record(connection, domain, Record.Discord, True)

def get_github_record(connection: Client, domain: str) -> Optional[str]:
    return get_record(connection, domain, Record.Github, True)

def get_reddit_record(connection: Client, domain: str) -> Optional[str]:
    return get_record(connection, domain, Record.Reddit, True)

def get_twitter_record(connection: Client, domain: str) -> Optional[str]:
    return get_record(connection, domain, Record.Twitter, True)

def get_telegram_record(connection: Client, domain: str) -> Optional[str]:
    return get_record(connection, domain, Record.Telegram, True)

def get_pic_record(connection: Client, domain: str) -> Optional[str]:
    return get_record(connection, domain, Record.Pic, True)

def get_shdw_record(connection: Client, domain: str) -> Optional[str]:
    return get_record(connection, domain, Record.SHDW, True)

def get_point_record(connection: Client, domain: str) -> Optional[str]:
    return get_record(connection, domain, Record.POINT, True)

def get_bsc_record(connection: Client, domain: str) -> Optional[str]:
    return get_record(connection, domain, Record.BSC, True)

def get_injective_record(connection: Client, domain: str) -> Optional[str]:
    return get_record(connection, domain, Record.Injective, True)

def get_backpack_record(connection: Client, domain: str) -> Optional[str]:
    return get_record(connection, domain, Record.Backpack, True)

def serialize_sol_record(
        content: Pubkey, record_key: Pubkey, signer: Pubkey, signature: bytes) -> bytes:
    expected = bytes(content) + bytes(record_key)
    encoded_message = expected.hex().encode()
    valid = check_sol_record(encoded_message, signature, signer)
    check_sol_record(valid, ErrorType.InvalidSignature)

    return bytes(content) + signature