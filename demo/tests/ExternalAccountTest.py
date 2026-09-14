import datetime

from django.test import TestCase
from django.utils import timezone
from demo.models.ExternalAccount import ExternalAccount
from demo.delegates.ExternalAccountDelegate import ExternalAccountDelegate

 #======================================================================
# 
# Encapsulates data for model ExternalAccount
#
# @author your_name_here
#
#======================================================================

#======================================================================
# Class ExternalAccountTest Declaration
#======================================================================
class ExternalAccountTest (TestCase) :
	def test_crud(self) :
		externalAccount = ExternalAccount()
		externalAccount.name = "default name field value"
		externalAccount.iban = "default iban field value"
		externalAccount.accountNumber = "default accountNumber field value"
		externalAccount.bic = "default bic field value"
		externalAccount.bankName = "default bankName field value"
		externalAccount.country = "default country field value"
		
		delegate = ExternalAccountDelegate()
		responseObj = delegate.create(externalAccount)
		
		self.assertEqual(responseObj, delegate.get( responseObj.id ))
	
		allObj = delegate.getAll()
		self.assertEqual(allObj.count(), 1 )		
		delegate.delete(responseObj.id)
		
		allObj = delegate.getAll()
		self.assertEqual(allObj.count(), 0 )		


