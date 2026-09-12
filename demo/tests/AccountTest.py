import datetime

from django.test import TestCase
from django.utils import timezone
from demo.models.Account import Account
from demo.delegates.AccountDelegate import AccountDelegate

 #======================================================================
# 
# Encapsulates data for model Account
#
# @author your_name_here
#
#======================================================================

#======================================================================
# Class AccountTest Declaration
#======================================================================
class AccountTest (TestCase) :
	def test_crud(self) :
		account = Account()
		account.accountNumber = "default accountNumber field value"
		account.iban = "default iban field value"
		account.accountName = "default accountName field value"
		account.currency = "default currency field value"
		account.openedOn = datetime.datetime.now()
		account.closedOn = datetime.datetime.now()
		account.accountType = "default accountType field value"
		account.ownershipType = "default ownershipType field value"
		account.status = "default status field value"
		
		delegate = AccountDelegate()
		responseObj = delegate.create(account)
		
		self.assertEqual(responseObj, delegate.get( responseObj.id ))
	
		allObj = delegate.getAll()
		self.assertEqual(allObj.count(), 1 )		
		delegate.delete(responseObj.id)
		
		allObj = delegate.getAll()
		self.assertEqual(allObj.count(), 0 )		


