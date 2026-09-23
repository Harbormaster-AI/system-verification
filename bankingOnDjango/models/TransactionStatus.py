from django.db import models
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
	Pending = 'Pending'
	Posted = 'Posted'
	Reversed = 'Reversed'
	Failed = 'Failed'
	Cancelled = 'Cancelled'
