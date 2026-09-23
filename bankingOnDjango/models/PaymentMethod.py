from django.db import models
 #======================================================================
# 
# Encapsulates data for model PaymentMethod
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class PaymentMethod Declaration (enumerated type)
#======================================================================
from enum import Enum 
class PaymentMethod(Enum):   # A subclass of Enum
	InternalTransfer = 'InternalTransfer'
	ACH = 'ACH'
	Wire = 'Wire'
	SEPA = 'SEPA'
	SWIFT = 'SWIFT'
	Card = 'Card'
	Cash = 'Cash'
	Check = 'Check'
	MobileWallet = 'MobileWallet'
