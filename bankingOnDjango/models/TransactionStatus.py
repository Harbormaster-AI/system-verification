 #======================================================================
# 
# Encapsulates data for model TransactionStatus
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class TransactionStatus Declaration (enumerated type)
#======================================================================
from enum import Enum 
class TransactionStatus(Enum):   # A subclass of Enum
	pending = 'pending'
	posted = 'posted'
	reversed = 'reversed'
	failed = 'failed'
	cancelled = 'cancelled'
