from django.db import models
 #======================================================================
# 
# Encapsulates data for model UpdateCampaignStatus
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class UpdateCampaignStatus Declaration (enumerated type)
#======================================================================
from enum import Enum 
class UpdateCampaignStatus(Enum):   # A subclass of Enum
	Planned = 'Planned'
	InProgress = 'InProgress'
	Paused = 'Paused'
	Completed = 'Completed'
	Cancelled = 'Cancelled'
