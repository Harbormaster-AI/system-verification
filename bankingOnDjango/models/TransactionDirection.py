from django.db import models
 #======================================================================
# 
# Encapsulates data for model TransactionDirection
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class TransactionDirection Declaration (enumerated type)
#======================================================================
from enum import Enum 
class TransactionDirection(Enum):   # A subclass of Enum
	Credit = 'Credit'
	Debit = 'Debit'
