 #======================================================================
# 
# Encapsulates data for model CardNetwork
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class CardNetwork Declaration (enumerated type)
#======================================================================
from enum import Enum 
class CardNetwork(Enum):   # A subclass of Enum
	visa = 'visa'
	mastercard = 'mastercard'
	amex = 'amex'
	discover = 'discover'
	union_pay = 'union_pay'
	other = 'other'
