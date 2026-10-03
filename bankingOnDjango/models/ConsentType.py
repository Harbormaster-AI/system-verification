 #======================================================================
# 
# Encapsulates data for model ConsentType
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class ConsentType Declaration (enumerated type)
#======================================================================
from enum import Enum 
class ConsentType(Enum):   # A subclass of Enum
	open_banking = 'open_banking'
	payment_initiation = 'payment_initiation'
	account_information = 'account_information'
	marketing = 'marketing'
	data_sharing = 'data_sharing'
