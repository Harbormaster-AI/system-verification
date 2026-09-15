from django.db import models
 #======================================================================
# 
# Encapsulates data for model SimStatus
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class SimStatus Declaration (enumerated type)
#======================================================================
from enum import Enum 
class SimStatus(Enum):   # A subclass of Enum
	Active = 'Active'
	Suspended = 'Suspended'
	Retired = 'Retired'
