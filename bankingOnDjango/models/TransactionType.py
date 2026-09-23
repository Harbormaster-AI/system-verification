from django.db import models
 #======================================================================
# 
# Encapsulates data for model TransactionType
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class TransactionType Declaration (enumerated type)
#======================================================================
from enum import Enum 
class TransactionType(Enum):   # A subclass of Enum
	Deposit = 'Deposit'
	Withdrawal = 'Withdrawal'
	Transfer = 'Transfer'
	Payment = 'Payment'
	Fee = 'Fee'
	Interest = 'Interest'
	Adjustment = 'Adjustment'
	Chargeback = 'Chargeback'
	Refund = 'Refund'
	FXConversion = 'FXConversion'
