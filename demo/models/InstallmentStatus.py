 #======================================================================
# 
# Encapsulates data for model InstallmentStatus
#
# @author your_name_here
#
#======================================================================

#======================================================================
# Class InstallmentStatus Declaration (enumerated type)
#======================================================================
from enum import Enum 
class InstallmentStatus(Enum):   # A subclass of Enum
	due = 'due'
	paid = 'paid'
	overdue = 'overdue'
	deferred = 'deferred'
