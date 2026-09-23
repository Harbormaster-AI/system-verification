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
	active = 'active'
	blocked = 'blocked'
	lost_stolen = 'lost_stolen'
	expired = 'expired'
	closed = 'closed'
