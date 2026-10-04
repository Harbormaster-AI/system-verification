 #======================================================================
# 
# Encapsulates data for model StandingInstructionFrequency
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class StandingInstructionFrequency Declaration (enumerated type)
#======================================================================
from enum import Enum 
class StandingInstructionFrequency(Enum):   # A subclass of Enum
	one_time = 'one_time'
	weekly = 'weekly'
	bi_weekly = 'bi_weekly'
	monthly = 'monthly'
	quarterly = 'quarterly'
	annually = 'annually'
