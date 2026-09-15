from django.db import models
 #======================================================================
# 
# Encapsulates data for model ProvisioningMethod
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class ProvisioningMethod Declaration (enumerated type)
#======================================================================
from enum import Enum 
class ProvisioningMethod(Enum):   # A subclass of Enum
	Manual = 'Manual'
	JITP = 'JITP'
	JITR = 'JITR'
	Bulk = 'Bulk'
	ZeroTouch = 'ZeroTouch'
