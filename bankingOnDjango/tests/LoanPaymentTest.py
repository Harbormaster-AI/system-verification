

from django.test import TestCase

from bankingOnDjango.models.LoanPayment import LoanPayment
from bankingOnDjango.delegates.LoanPaymentDelegate import LoanPaymentDelegate


 #======================================================================
# 
# Encapsulates data for model LoanPayment
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class LoanPaymentTest Declaration
#======================================================================
class LoanPaymentTest (TestCase) :
	def test_crud(self) :
		loan_payment = LoanPayment()
		loan_payment.paymentReference = "default paymentReference field value"
		loan_payment.amount = "default amount field value"
		loan_payment.paymentDate = datetime.datetime.now()
		loan_payment.method = "default method field value"
		loan_payment.status = "default status field value"
		
		delegate = LoanPaymentDelegate()
		response_obj = delegate.create(loan_payment)
		
		self.assertEqual(response_obj, delegate.get( response_obj.id ))
	
		all_obj = delegate.getAll()
		self.assertEqual(all_obj.count(), 1 )		
		delegate.delete(response_obj.id)
		
		all_obj = delegate.getAll()
		self.assertEqual(all_obj.count(), 0 )		


