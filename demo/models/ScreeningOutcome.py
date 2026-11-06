 #======================================================================
# 
# Encapsulates data for model ScreeningOutcome
#
# @author your_name_here
#
#======================================================================

#======================================================================
# Class ScreeningOutcome Declaration (enumerated type)
#======================================================================
from enum import Enum 
class ScreeningOutcome(Enum):   # A subclass of Enum
	clear = 'clear'
	match = 'match'
	review = 'review'
