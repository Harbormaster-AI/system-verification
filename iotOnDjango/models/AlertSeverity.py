from django.db import models
 #======================================================================
# 
# Encapsulates data for model AlertSeverity
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class AlertSeverity Declaration (enumerated type)
#======================================================================
from enum import Enum 
class AlertSeverity(Enum):   # A subclass of Enum
	Info = 'Info'
	Warning = 'Warning'
	Critical = 'Critical'
