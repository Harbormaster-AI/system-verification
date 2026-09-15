from django.db import models
 #======================================================================
# 
# Encapsulates data for model MaintenanceStatus
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class MaintenanceStatus Declaration (enumerated type)
#======================================================================
from enum import Enum 
class MaintenanceStatus(Enum):   # A subclass of Enum
	Open = 'Open'
	InProgress = 'InProgress'
	WaitingOnParts = 'WaitingOnParts'
	Closed = 'Closed'
