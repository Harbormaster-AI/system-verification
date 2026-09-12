import datetime

from django.test import TestCase
from django.utils import timezone
from demo.models.ExchangeRate import ExchangeRate
from demo.delegates.ExchangeRateDelegate import ExchangeRateDelegate

 #======================================================================
# 
# Encapsulates data for model ExchangeRate
#
# @author your_name_here
#
#======================================================================

#======================================================================
# Class ExchangeRateTest Declaration
#======================================================================
class ExchangeRateTest (TestCase) :
	def test_crud(self) :
		exchangeRate = ExchangeRate()
		exchangeRate.baseCurrency = "default baseCurrency field value"
		exchangeRate.counterCurrency = "default counterCurrency field value"
		exchangeRate.rate = "default rate field value"
		exchangeRate.asOf = datetime.datetime.now()
		exchangeRate.source = "default source field value"
		
		delegate = ExchangeRateDelegate()
		responseObj = delegate.create(exchangeRate)
		
		self.assertEqual(responseObj, delegate.get( responseObj.id ))
	
		allObj = delegate.getAll()
		self.assertEqual(allObj.count(), 1 )		
		delegate.delete(responseObj.id)
		
		allObj = delegate.getAll()
		self.assertEqual(allObj.count(), 0 )		


