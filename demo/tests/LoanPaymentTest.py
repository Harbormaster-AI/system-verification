import datetime

from django.test import TestCase
from django.utils import timezone
from demo.models.LoanPayment import LoanPayment
from demo.delegates.LoanPaymentDelegate import LoanPaymentDelegate

 #======================================================================
# 
# Encapsulates data for model LoanPayment
#
# @author your_name_here
#
#======================================================================

#======================================================================
# Class LoanPaymentTest Declaration
#======================================================================
class LoanPaymentTest (TestCase) :
	def test_crud(self) :
		loanPayment = LoanPayment()
		loanPayment.paymentReference = "default paymentReference field value"
		loanPayment.amount = "default amount field value"
		loanPayment.paymentDate = datetime.datetime.now()
		loanPayment.method = "default method field value"
		loanPayment.status = "default status field value"
		
		delegate = LoanPaymentDelegate()
		responseObj = delegate.create(loanPayment)
		
		self.assertEqual(responseObj, delegate.get( responseObj.id ))
	
		allObj = delegate.getAll()
		self.assertEqual(allObj.count(), 1 )		
		delegate.delete(responseObj.id)
		
		allObj = delegate.getAll()
		self.assertEqual(allObj.count(), 0 )		


