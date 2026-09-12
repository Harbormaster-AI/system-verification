import datetime

from django.test import TestCase
from django.utils import timezone
from demo.models.LoanAccount import LoanAccount
from demo.delegates.LoanAccountDelegate import LoanAccountDelegate

 #======================================================================
# 
# Encapsulates data for model LoanAccount
#
# @author your_name_here
#
#======================================================================

#======================================================================
# Class LoanAccountTest Declaration
#======================================================================
class LoanAccountTest (TestCase) :
	def test_crud(self) :
		loanAccount = LoanAccount()
		loanAccount.loanNumber = "default loanNumber field value"
		loanAccount.principalAmount = "default principalAmount field value"
		loanAccount.outstandingPrincipal = "default outstandingPrincipal field value"
		loanAccount.interestRate = "default interestRate field value"
		loanAccount.originationDate = datetime.datetime.now()
		loanAccount.maturityDate = datetime.datetime.now()
		loanAccount.paymentDayOfMonth = 22
		loanAccount.currency = "default currency field value"
		loanAccount.loanType = "default loanType field value"
		loanAccount.rateType = "default rateType field value"
		loanAccount.compounding = "default compounding field value"
		loanAccount.status = "default status field value"
		
		delegate = LoanAccountDelegate()
		responseObj = delegate.create(loanAccount)
		
		self.assertEqual(responseObj, delegate.get( responseObj.id ))
	
		allObj = delegate.getAll()
		self.assertEqual(allObj.count(), 1 )		
		delegate.delete(responseObj.id)
		
		allObj = delegate.getAll()
		self.assertEqual(allObj.count(), 0 )		


