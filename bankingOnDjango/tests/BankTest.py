
import datetime

from django.test import TestCase
from django.utils import timezone
from bankingOnDjango.models.Bank import Bank
from bankingOnDjango.delegates.BankDelegate import BankDelegate

 #======================================================================
# 
# Encapsulates data for model Bank
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class BankTest Declaration
#======================================================================
class BankTest (TestCase) :
	def test_crud(self) :
		bank = Bank()
		bank.name = "default name field value"
		bank.legalName = "default legalName field value"
		bank.swiftBic = "default swiftBic field value"
		bank.headquartersCountry = "default headquartersCountry field value"
		bank.website = "default website field value"
		
		delegate = BankDelegate()
		responseObj = delegate.create(bank)
		
		self.assertEqual(responseObj, delegate.get( responseObj.id ))
	
		allObj = delegate.getAll()
		self.assertEqual(allObj.count(), 1 )		
		delegate.delete(responseObj.id)
		
		allObj = delegate.getAll()
		self.assertEqual(allObj.count(), 0 )		


