from django.db import models
 #======================================================================
# 
# Encapsulates data for model LoanType
#
# @author your_name_here
#
#======================================================================

#======================================================================
# Class LoanType Declaration (enumerated type)
#======================================================================
from enum import Enum 
class LoanType(Enum):   # A subclass of Enum
	Mortgage = 'Mortgage'
	Personal = 'Personal'
	Auto = 'Auto'
	SmallBusiness = 'SmallBusiness'
	CreditLine = 'CreditLine'
	Student = 'Student'
