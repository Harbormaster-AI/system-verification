from django.db import models
 #======================================================================
# 
# Encapsulates data for model LoanStatus
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class LoanStatus Declaration (enumerated type)
#======================================================================
from enum import Enum 
class LoanStatus(Enum):   # A subclass of Enum
	Applied = 'Applied'
	Approved = 'Approved'
	Active = 'Active'
	Delinquent = 'Delinquent'
	Defaulted = 'Defaulted'
	Closed = 'Closed'
