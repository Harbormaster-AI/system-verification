
import datetime

from django.test import TestCase
from django.utils import timezone
from bankingOnDjango.models.AccountStatement import AccountStatement
from bankingOnDjango.delegates.AccountStatementDelegate import AccountStatementDelegate

 #======================================================================
# 
# Encapsulates data for model AccountStatement
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class AccountStatementTest Declaration
#======================================================================
class AccountStatementTest (TestCase) :
	def test_crud(self) :
		accountStatement = AccountStatement()
		accountStatement.statementNumber = "default statementNumber field value"
		accountStatement.periodStart = datetime.datetime.now()
		accountStatement.periodEnd = datetime.datetime.now()
		accountStatement.openingBalance = "default openingBalance field value"
		accountStatement.closingBalance = "default closingBalance field value"
		accountStatement.deliveryMethod = "default deliveryMethod field value"
		
		delegate = AccountStatementDelegate()
		responseObj = delegate.create(accountStatement)
		
		self.assertEqual(responseObj, delegate.get( responseObj.id ))
	
		allObj = delegate.getAll()
		self.assertEqual(allObj.count(), 1 )		
		delegate.delete(responseObj.id)
		
		allObj = delegate.getAll()
		self.assertEqual(allObj.count(), 0 )		


