from django.db import models
 #======================================================================
# 
# Encapsulates data for model TradeStatus
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class TradeStatus Declaration (enumerated type)
#======================================================================
from enum import Enum 
class TradeStatus(Enum):   # A subclass of Enum
	Booked = 'Booked'
	Settled = 'Settled'
	Cancelled = 'Cancelled'
