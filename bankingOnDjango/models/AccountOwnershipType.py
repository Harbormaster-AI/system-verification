 #======================================================================
# 
# Encapsulates data for model AccountOwnershipType
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class AccountOwnershipType Declaration (enumerated type)
#======================================================================
from enum import Enum 
class AccountOwnershipType(Enum):   # A subclass of Enum
	sole = 'sole'
	joint = 'joint'
	corporate = 'corporate'
	trust = 'trust'
