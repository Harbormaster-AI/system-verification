from django.db import models
 #======================================================================
# 
# Encapsulates data for model TelemetryEncoding
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class TelemetryEncoding Declaration (enumerated type)
#======================================================================
from enum import Enum 
class TelemetryEncoding(Enum):   # A subclass of Enum
	JSON = 'JSON'
	CBOR = 'CBOR'
	Protobuf = 'Protobuf'
	Avro = 'Avro'
	Binary = 'Binary'
