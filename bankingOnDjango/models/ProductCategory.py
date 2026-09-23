from django.db import models
 #======================================================================
# 
# Encapsulates data for model ProductCategory
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class ProductCategory Declaration (enumerated type)
#======================================================================
from enum import Enum 
class ProductCategory(Enum):   # A subclass of Enum
	Deposit = 'Deposit'
	Loan = 'Loan'
	Card = 'Card'
	PaymentService = 'PaymentService'
	Investment = 'Investment'
