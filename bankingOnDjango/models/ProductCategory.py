 #======================================================================
# 
# Encapsulates data for model ProductCategory
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class ProductCategory Declaration (enumerated type)
#======================================================================
from enum import Enum 
class ProductCategory(Enum):   # A subclass of Enum
	deposit = 'deposit'
	loan = 'loan'
	card = 'card'
	payment_service = 'payment_service'
	investment = 'investment'
