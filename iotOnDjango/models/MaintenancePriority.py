from django.db import models
 #======================================================================
# 
# Encapsulates data for model MaintenancePriority
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class MaintenancePriority Declaration (enumerated type)
#======================================================================
from enum import Enum 
class MaintenancePriority(Enum):   # A subclass of Enum
	Low = 'Low'
	Medium = 'Medium'
	High = 'High'
	Urgent = 'Urgent'
