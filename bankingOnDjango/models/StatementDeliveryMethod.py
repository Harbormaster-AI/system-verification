from django.db import models
 #======================================================================
# 
# Encapsulates data for model StatementDeliveryMethod
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class StatementDeliveryMethod Declaration (enumerated type)
#======================================================================
from enum import Enum 
class StatementDeliveryMethod(Enum):   # A subclass of Enum
	Electronic = 'Electronic'
	Paper = 'Paper'
