from django.db import models
 #======================================================================
# 
# Encapsulates data for model ScreeningOutcome
#
# @author Harbormaster Dev Team
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
