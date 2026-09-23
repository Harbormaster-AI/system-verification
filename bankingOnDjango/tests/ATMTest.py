
import datetime

from django.test import TestCase
from django.utils import timezone
from bankingOnDjango.models.ATM import ATM
from bankingOnDjango.delegates.ATMDelegate import ATMDelegate

 #======================================================================
# 
# Encapsulates data for model ATM
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class ATMTest Declaration
#======================================================================
class ATMTest (TestCase) :
	def test_crud(self) :
		aTM = ATM()
		aTM.terminalId = "default terminalId field value"
		aTM.location = "default location field value"
		aTM.status = "default status field value"
		
		delegate = ATMDelegate()
		responseObj = delegate.create(aTM)
		
		self.assertEqual(responseObj, delegate.get( responseObj.id ))
	
		allObj = delegate.getAll()
		self.assertEqual(allObj.count(), 1 )		
		delegate.delete(responseObj.id)
		
		allObj = delegate.getAll()
		self.assertEqual(allObj.count(), 0 )		


