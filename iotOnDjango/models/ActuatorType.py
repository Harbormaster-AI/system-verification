from django.db import models
 #======================================================================
# 
# Encapsulates data for model ActuatorType
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class ActuatorType Declaration (enumerated type)
#======================================================================
from enum import Enum 
class ActuatorType(Enum):   # A subclass of Enum
	Relay = 'Relay'
	Motor = 'Motor'
	Valve = 'Valve'
	LED = 'LED'
	Buzzer = 'Buzzer'
	Display = 'Display'
