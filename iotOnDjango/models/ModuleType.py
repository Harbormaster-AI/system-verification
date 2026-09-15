from django.db import models
 #======================================================================
# 
# Encapsulates data for model ModuleType
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class ModuleType Declaration (enumerated type)
#======================================================================
from enum import Enum 
class ModuleType(Enum):   # A subclass of Enum
	RFModule = 'RFModule'
	MCU = 'MCU'
	SensorChipset = 'SensorChipset'
	PowerManagement = 'PowerManagement'
	Storage = 'Storage'
	Other = 'Other'
