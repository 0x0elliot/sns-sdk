import borsh
from borsh import types

# Example serialized data
serialized = b'\x05\xff\x02\x00\x03\x00\x00\x00abc'

# Schema matching the serialized data 
schema = {
  'num1': types.i8,
  'num2': types.u16,
  'num3': types.u32,
  'str': types.string
}

# Deserialize 
deserialized = borsh.deserialize(schema, serialized)

print(deserialized)