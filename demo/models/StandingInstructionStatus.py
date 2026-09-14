from django.db import models
 #======================================================================
# 
# Encapsulates data for model StandingInstructionStatus
#
# @author your_name_here
#
#======================================================================

#======================================================================
# Class StandingInstructionStatus Declaration (enumerated type)
#======================================================================
from enum import Enum 
class StandingInstructionStatus(Enum):   # A subclass of Enum
	Active = 'Active'
	Paused = 'Paused'
	Cancelled = 'Cancelled'
	Completed = 'Completed'
