from django.db import models
 #======================================================================
# 
# Encapsulates data for model CardStatus
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class CardStatus Declaration (enumerated type)
#======================================================================
from enum import Enum 
class CardStatus(Enum):   # A subclass of Enum
	Active = 'Active'
	Blocked = 'Blocked'
	LostStolen = 'LostStolen'
	Expired = 'Expired'
	Closed = 'Closed'
