from django.db import models
 #======================================================================
# 
# Encapsulates data for model UpdateStatus
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class UpdateStatus Declaration (enumerated type)
#======================================================================
from enum import Enum 
class UpdateStatus(Enum):   # A subclass of Enum
	Downloading = 'Downloading'
	Installing = 'Installing'
	Rebooting = 'Rebooting'
	Success = 'Success'
	Failure = 'Failure'
	Deferred = 'Deferred'
