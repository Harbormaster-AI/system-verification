from django.db import models
 #======================================================================
# 
# Encapsulates data for model CommandStatus
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class CommandStatus Declaration (enumerated type)
#======================================================================
from enum import Enum 
class CommandStatus(Enum):   # A subclass of Enum
	Queued = 'Queued'
	Sent = 'Sent'
	Succeeded = 'Succeeded'
	Failed = 'Failed'
	TimedOut = 'TimedOut'
	Cancelled = 'Cancelled'
