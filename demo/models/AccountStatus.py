 #======================================================================
# 
# Encapsulates data for model AccountStatus
#
# @author your_name_here
#
#======================================================================

#======================================================================
# Class AccountStatus Declaration (enumerated type)
#======================================================================
from enum import Enum 
class AccountStatus(Enum):   # A subclass of Enum
	open = 'open'
	frozen = 'frozen'
	dormant = 'dormant'
	closed = 'closed'
