import datetime

from django.test import TestCase
from django.utils import timezone
from demo.models.PaymentCard import PaymentCard
from demo.delegates.PaymentCardDelegate import PaymentCardDelegate

 #======================================================================
# 
# Encapsulates data for model PaymentCard
#
# @author your_name_here
#
#======================================================================

#======================================================================
# Class PaymentCardTest Declaration
#======================================================================
class PaymentCardTest (TestCase) :
	def test_crud(self) :
		paymentCard = PaymentCard()
		paymentCard.cardNumber = "default cardNumber field value"
		paymentCard.embossedName = "default embossedName field value"
		paymentCard.expiryMonth = 22
		paymentCard.expiryYear = 22
		paymentCard.cardType = "default cardType field value"
		paymentCard.cardStatus = "default cardStatus field value"
		paymentCard.network = "default network field value"
		
		delegate = PaymentCardDelegate()
		responseObj = delegate.create(paymentCard)
		
		self.assertEqual(responseObj, delegate.get( responseObj.id ))
	
		allObj = delegate.getAll()
		self.assertEqual(allObj.count(), 1 )		
		delegate.delete(responseObj.id)
		
		allObj = delegate.getAll()
		self.assertEqual(allObj.count(), 0 )		


