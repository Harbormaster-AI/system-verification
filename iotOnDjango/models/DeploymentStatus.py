from django.db import models
 #======================================================================
# 
# Encapsulates data for model DeploymentStatus
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class DeploymentStatus Declaration (enumerated type)
#======================================================================
from enum import Enum 
class DeploymentStatus(Enum):   # A subclass of Enum
	Pending = 'Pending'
	Deploying = 'Deploying'
	Running = 'Running'
	Failed = 'Failed'
	Stopped = 'Stopped'
