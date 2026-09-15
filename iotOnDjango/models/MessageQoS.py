from django.db import models
 #======================================================================
# 
# Encapsulates data for model MessageQoS
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class MessageQoS Declaration (enumerated type)
#======================================================================
from enum import Enum 
class MessageQoS(Enum):   # A subclass of Enum
	AtMostOnce = 'AtMostOnce'
	AtLeastOnce = 'AtLeastOnce'
	ExactlyOnce = 'ExactlyOnce'
