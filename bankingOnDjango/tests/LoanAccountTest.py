

from django.test import TestCase

from bankingOnDjango.models.LoanAccount import LoanAccount
from bankingOnDjango.delegates.LoanAccountDelegate import LoanAccountDelegate


 #======================================================================
# 
# Encapsulates data for model LoanAccount
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class LoanAccountTest Declaration
#======================================================================
class LoanAccountTest (TestCase) :
	def test_crud(self) :
		loan_account = LoanAccount()
		loan_account.loanNumber = "default loanNumber field value"
		loan_account.principalAmount = "default principalAmount field value"
		loan_account.outstandingPrincipal = "default outstandingPrincipal field value"
		loan_account.interestRate = "default interestRate field value"
		loan_account.originationDate = datetime.now()
		loan_account.maturityDate = datetime.now()
		loan_account.paymentDayOfMonth = 22
		loan_account.currency = "default currency field value"
		loan_account.loanType = "default loanType field value"
		loan_account.rateType = "default rateType field value"
		loan_account.compounding = "default compounding field value"
		loan_account.status = "default status field value"
		
		delegate = LoanAccountDelegate()
		response_obj = delegate.create(loan_account)
		
		self.assertEqual(response_obj, delegate.get( response_obj.id ))
	
		all_obj = delegate.getAll()
		self.assertEqual(all_obj.count(), 1 )		
		delegate.delete(response_obj.id)
		
		all_obj = delegate.getAll()
		self.assertEqual(all_obj.count(), 0 )		


