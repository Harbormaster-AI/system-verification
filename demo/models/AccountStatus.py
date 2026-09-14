from django.db import models
 #======================================================================
# 
# Encapsulates data for model AccountStatus
#
# @author your_name_here
#
#======================================================================

#======================================================================
# Class AccountStatus Declaration (enumerated type)
#======================================================================
from enum import Enum 
class AccountStatus(Enum):   # A subclass of Enum
	Open = 'Open'
	Frozen = 'Frozen'
	Dormant = 'Dormant'
	Closed = 'Closed'
