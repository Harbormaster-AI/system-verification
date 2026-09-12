from django.db import models
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
	Clear = 'Clear'
	Match = 'Match'
	Review = 'Review'
