from django.db import models
 #======================================================================
# 
# Encapsulates data for model CardType
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class CardType Declaration (enumerated type)
#======================================================================
from enum import Enum 
class CardType(Enum):   # A subclass of Enum
	debit = 'debit'
	credit = 'credit'
	prepaid = 'prepaid'
	virtual = 'virtual'
