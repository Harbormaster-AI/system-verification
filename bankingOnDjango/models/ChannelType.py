from django.db import models
 #======================================================================
# 
# Encapsulates data for model ChannelType
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class ChannelType Declaration (enumerated type)
#======================================================================
from enum import Enum 
class ChannelType(Enum):   # A subclass of Enum
	Branch = 'Branch'
	Online = 'Online'
	Mobile = 'Mobile'
	ATM = 'ATM'
	API = 'API'
	CallCenter = 'CallCenter'
