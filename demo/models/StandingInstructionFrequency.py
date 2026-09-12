from django.db import models
 #======================================================================
# 
# Encapsulates data for model StandingInstructionFrequency
#
# @author your_name_here
#
#======================================================================

#======================================================================
# Class StandingInstructionFrequency Declaration (enumerated type)
#======================================================================
from enum import Enum 
class StandingInstructionFrequency(Enum):   # A subclass of Enum
	OneTime = 'OneTime'
	Weekly = 'Weekly'
	BiWeekly = 'BiWeekly'
	Monthly = 'Monthly'
	Quarterly = 'Quarterly'
	Annually = 'Annually'
