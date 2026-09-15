from django.db import models
 #======================================================================
# 
# Encapsulates data for model PowerSource
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class PowerSource Declaration (enumerated type)
#======================================================================
from enum import Enum 
class PowerSource(Enum):   # A subclass of Enum
	Battery = 'Battery'
	Mains = 'Mains'
	PoE = 'PoE'
	EnergyHarvesting = 'EnergyHarvesting'
	Solar = 'Solar'
