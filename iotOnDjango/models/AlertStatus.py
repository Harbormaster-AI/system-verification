from django.db import models
 #======================================================================
# 
# Encapsulates data for model AlertStatus
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class AlertStatus Declaration (enumerated type)
#======================================================================
from enum import Enum 
class AlertStatus(Enum):   # A subclass of Enum
	Open = 'Open'
	Acknowledged = 'Acknowledged'
	Resolved = 'Resolved'
	Suppressed = 'Suppressed'
