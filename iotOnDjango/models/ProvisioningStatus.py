from django.db import models
 #======================================================================
# 
# Encapsulates data for model ProvisioningStatus
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class ProvisioningStatus Declaration (enumerated type)
#======================================================================
from enum import Enum 
class ProvisioningStatus(Enum):   # A subclass of Enum
	Pending = 'Pending'
	Enrolled = 'Enrolled'
	Failed = 'Failed'
	Revoked = 'Revoked'
