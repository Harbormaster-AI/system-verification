

from django.test import TestCase

from bankingOnDjango.models.PaymentCard import PaymentCard
from bankingOnDjango.delegates.PaymentCardDelegate import PaymentCardDelegate


 #======================================================================
# 
# Encapsulates data for model PaymentCard
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class PaymentCardTest Declaration
#======================================================================
class PaymentCardTest (TestCase) :
	def test_crud(self) :
		payment_card = PaymentCard()
		payment_card.cardNumber = "default cardNumber field value"
		payment_card.embossedName = "default embossedName field value"
		payment_card.expiryMonth = 22
		payment_card.expiryYear = 22
		payment_card.cardType = "default cardType field value"
		payment_card.cardStatus = "default cardStatus field value"
		payment_card.network = "default network field value"
		
		delegate = PaymentCardDelegate()
		response_obj = delegate.create(payment_card)
		
		self.assertEqual(response_obj, delegate.get( response_obj.id ))
	
		all_obj = delegate.getAll()
		self.assertEqual(all_obj.count(), 1 )		
		delegate.delete(response_obj.id)
		
		all_obj = delegate.getAll()
		self.assertEqual(all_obj.count(), 0 )		


