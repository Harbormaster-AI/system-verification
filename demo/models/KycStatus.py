from django.db import models
 #======================================================================
# 
# Encapsulates data for model KycStatus
#
# @author your_name_here
#
#======================================================================

#======================================================================
# Class KycStatus Declaration (enumerated type)
#======================================================================
from enum import Enum 
class KycStatus(Enum):   # A subclass of Enum
	Pending = 'Pending'
	Verified = 'Verified'
	Rejected = 'Rejected'
	Expired = 'Expired'
