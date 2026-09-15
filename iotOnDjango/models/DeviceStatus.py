from django.db import models
 #======================================================================
# 
# Encapsulates data for model DeviceStatus
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class DeviceStatus Declaration (enumerated type)
#======================================================================
from enum import Enum 
class DeviceStatus(Enum):   # A subclass of Enum
	Provisioning = 'Provisioning'
	Active = 'Active'
	Suspended = 'Suspended'
	Offline = 'Offline'
	Decommissioned = 'Decommissioned'
