from django.db import models
 #======================================================================
# 
# Encapsulates data for model ATMStatus
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class ATMStatus Declaration (enumerated type)
#======================================================================
from enum import Enum 
class ATMStatus(Enum):   # A subclass of Enum
	in_service = 'in_service'
	out_of_service = 'out_of_service'
	maintenance = 'maintenance'
