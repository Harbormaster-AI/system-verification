 #======================================================================
# 
# Encapsulates data for model CollateralType
#
# @author your_name_here
#
#======================================================================

#======================================================================
# Class CollateralType Declaration (enumerated type)
#======================================================================
from enum import Enum 
class CollateralType(Enum):   # A subclass of Enum
	real_estate = 'real_estate'
	vehicle = 'vehicle'
	cash = 'cash'
	securities = 'securities'
	guarantee = 'guarantee'
	equipment = 'equipment'
