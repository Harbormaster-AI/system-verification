 #======================================================================
# 
# Encapsulates data for model ConsentStatus
#
# @author your_name_here
#
#======================================================================

#======================================================================
# Class ConsentStatus Declaration (enumerated type)
#======================================================================
from enum import Enum 
class ConsentStatus(Enum):   # A subclass of Enum
	active = 'active'
	revoked = 'revoked'
	expired = 'expired'
