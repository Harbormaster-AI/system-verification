from django.db import models
 #======================================================================
# 
# Encapsulates data for model CollateralType
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class CollateralType Declaration (enumerated type)
#======================================================================
from enum import Enum 
class CollateralType(Enum):   # A subclass of Enum
	RealEstate = 'RealEstate'
	Vehicle = 'Vehicle'
	Cash = 'Cash'
	Securities = 'Securities'
	Guarantee = 'Guarantee'
	Equipment = 'Equipment'
