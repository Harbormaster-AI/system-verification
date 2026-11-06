 #======================================================================
# 
# Encapsulates data for model DisputeStatus
#
# @author your_name_here
#
#======================================================================

#======================================================================
# Class DisputeStatus Declaration (enumerated type)
#======================================================================
from enum import Enum 
class DisputeStatus(Enum):   # A subclass of Enum
	open = 'open'
	under_review = 'under_review'
	resolved = 'resolved'
	rejected = 'rejected'
	withdrawn = 'withdrawn'
