from django.db import models
 #======================================================================
# 
# Encapsulates data for model InterestCompounding
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class InterestCompounding Declaration (enumerated type)
#======================================================================
from enum import Enum 
class InterestCompounding(Enum):   # A subclass of Enum
	Daily = 'Daily'
	Monthly = 'Monthly'
	Quarterly = 'Quarterly'
	Annually = 'Annually'
