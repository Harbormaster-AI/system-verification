

from django.test import TestCase

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
		account_statement = AccountStatement()
		account_statement.statementNumber = "default statementNumber field value"
		account_statement.periodStart = datetime.datetime.now()
		account_statement.periodEnd = datetime.datetime.now()
		account_statement.openingBalance = "default openingBalance field value"
		account_statement.closingBalance = "default closingBalance field value"
		account_statement.deliveryMethod = "default deliveryMethod field value"
		
		delegate = AccountStatementDelegate()
		response_obj = delegate.create(account_statement)
		
		self.assertEqual(response_obj, delegate.get( response_obj.id ))
	
		all_obj = delegate.getAll()
		self.assertEqual(all_obj.count(), 1 )		
		delegate.delete(response_obj.id)
		
		all_obj = delegate.getAll()
		self.assertEqual(all_obj.count(), 0 )		


