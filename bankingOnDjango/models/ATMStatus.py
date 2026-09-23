from django.db import models
 #======================================================================
# 
# Encapsulates data for model ATMStatus
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class ATMStatus Declaration (enumerated type)
#======================================================================
from enum import Enum 
class ATMStatus(Enum):   # A subclass of Enum
	InService = 'InService'
	OutOfService = 'OutOfService'
	Maintenance = 'Maintenance'
