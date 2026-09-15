from django.db import models
 #======================================================================
# 
# Encapsulates data for model TwinChangeType
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class TwinChangeType Declaration (enumerated type)
#======================================================================
from enum import Enum 
class TwinChangeType(Enum):   # A subclass of Enum
	DesiredUpdated = 'DesiredUpdated'
	ReportedUpdated = 'ReportedUpdated'
	TagUpdated = 'TagUpdated'
