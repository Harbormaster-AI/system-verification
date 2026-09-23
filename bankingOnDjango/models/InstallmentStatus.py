from django.db import models
 #======================================================================
# 
# Encapsulates data for model InstallmentStatus
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class InstallmentStatus Declaration (enumerated type)
#======================================================================
from enum import Enum 
class InstallmentStatus(Enum):   # A subclass of Enum
	Due = 'Due'
	Paid = 'Paid'
	Overdue = 'Overdue'
	Deferred = 'Deferred'
