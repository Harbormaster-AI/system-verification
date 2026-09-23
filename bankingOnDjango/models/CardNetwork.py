from django.db import models
 #======================================================================
# 
# Encapsulates data for model CardNetwork
#
# @author Harbormaster Dev Team
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
