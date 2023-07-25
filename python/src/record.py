from utils import get_domain_key_sync
from enum import Enum
from types.record import Record
from solana.rpc.api import Client
from solana.rpc.types import Pubkey
from state import NameRegistryState

def get_record_key_sync(domain: str, record: Record) -> str:
    pubkey = get_domain_key_sync(record + "." + domain, True)["pubkey"]
    return pubkey

def get_sol_record(connection: Client, domain_pub_key: str, registry: str) -> Pubkey:
    return get_record(connection, domain_pub_key, registry, Record.SOL)

# always use in try catch
def get_record(connection: Client, domain: str, record: Record, deserialize: bool = True) -> NameRegistryState:
    if bool:
