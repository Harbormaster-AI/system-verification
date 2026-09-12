from django.db import models
 #======================================================================
# 
# Encapsulates data for model CardType
#
# @author your_name_here
#
#======================================================================

#======================================================================
# Class CardType Declaration (enumerated type)
#======================================================================
from enum import Enum 
class CardType(Enum):   # A subclass of Enum
	Debit = 'Debit'
	Credit = 'Credit'
	Prepaid = 'Prepaid'
	Virtual = 'Virtual'
