from django.db import models
 #======================================================================
# 
# Encapsulates data for model TenantType
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class TenantType Declaration (enumerated type)
#======================================================================
from enum import Enum 
class TenantType(Enum):   # A subclass of Enum
	Enterprise = 'Enterprise'
	SMB = 'SMB'
	ISV = 'ISV'
	SystemIntegrator = 'SystemIntegrator'
	Government = 'Government'
