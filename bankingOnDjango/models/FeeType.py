from django.db import models
 #======================================================================
# 
# Encapsulates data for model FeeType
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class FeeType Declaration (enumerated type)
#======================================================================
from enum import Enum 
class FeeType(Enum):   # A subclass of Enum
	Maintenance = 'Maintenance'
	Overdraft = 'Overdraft'
	Wire = 'Wire'
	ATM = 'ATM'
	CardAnnual = 'CardAnnual'
	LatePayment = 'LatePayment'
	EarlyWithdrawal = 'EarlyWithdrawal'
	ReplacementCard = 'ReplacementCard'
