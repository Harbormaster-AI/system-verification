from django.db import models
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
	Sole = 'Sole'
	Joint = 'Joint'
	Corporate = 'Corporate'
	Trust = 'Trust'
