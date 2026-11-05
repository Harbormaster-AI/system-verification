 #======================================================================
# 
# Encapsulates data for model KycStatus
#
# @author your_name_here
#
#======================================================================

#======================================================================
# Class KycStatus Declaration (enumerated type)
#======================================================================
from enum import Enum 
class KycStatus(Enum):   # A subclass of Enum
	pending = 'pending'
	verified = 'verified'
	rejected = 'rejected'
	expired = 'expired'
