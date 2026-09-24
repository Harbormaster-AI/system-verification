from django.db import models
 #======================================================================
# 
# Encapsulates data for model StandingInstructionStatus
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class StandingInstructionStatus Declaration (enumerated type)
#======================================================================
from enum import Enum 
class StandingInstructionStatus(Enum):   # A subclass of Enum
	active = 'active'
	paused = 'paused'
	cancelled = 'cancelled'
	completed = 'completed'
