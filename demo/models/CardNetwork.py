from django.db import models
 #======================================================================
# 
# Encapsulates data for model CardNetwork
#
# @author your_name_here
#
#======================================================================

#======================================================================
# Class CardNetwork Declaration (enumerated type)
#======================================================================
from enum import Enum 
class CardNetwork(Enum):   # A subclass of Enum
	Visa = 'Visa'
	Mastercard = 'Mastercard'
	Amex = 'Amex'
	Discover = 'Discover'
	UnionPay = 'UnionPay'
	Other = 'Other'
