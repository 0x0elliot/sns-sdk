from utils import get_domain_key_sync
from enum import Enum
from types.record import Record

def get_record_key_sync(domain: str, record: Record) -> str:
    pubkey = get_domain_key_sync(record + "." + domain, True)["pubkey"]
    return pubkey