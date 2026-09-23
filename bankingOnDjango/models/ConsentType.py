from django.db import models
 #======================================================================
# 
# Encapsulates data for model ConsentType
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class ConsentType Declaration (enumerated type)
#======================================================================
from enum import Enum 
class ConsentType(Enum):   # A subclass of Enum
	OpenBanking = 'OpenBanking'
	PaymentInitiation = 'PaymentInitiation'
	AccountInformation = 'AccountInformation'
	Marketing = 'Marketing'
	DataSharing = 'DataSharing'
