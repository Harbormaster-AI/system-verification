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
	branch = 'branch'
	online = 'online'
	mobile = 'mobile'
	a_t_m = 'a_t_m'
	a_p_i = 'a_p_i'
	call_center = 'call_center'
