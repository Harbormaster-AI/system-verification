from django.db import models
 #======================================================================
# 
# Encapsulates data for model RateType
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class RateType Declaration (enumerated type)
#======================================================================
from enum import Enum 
class RateType(Enum):   # A subclass of Enum
	Fixed = 'Fixed'
	Variable = 'Variable'
