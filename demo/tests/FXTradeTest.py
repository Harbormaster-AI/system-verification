import datetime

from django.test import TestCase
from django.utils import timezone
from demo.models.FXTrade import FXTrade
from demo.delegates.FXTradeDelegate import FXTradeDelegate

 #======================================================================
# 
# Encapsulates data for model FXTrade
#
# @author your_name_here
#
#======================================================================

#======================================================================
# Class FXTradeTest Declaration
#======================================================================
class FXTradeTest (TestCase) :
	def test_crud(self) :
		fXTrade = FXTrade()
		fXTrade.tradeReference = "default tradeReference field value"
		fXTrade.tradeDate = datetime.datetime.now()
		fXTrade.settlementDate = datetime.datetime.now()
		fXTrade.amountSold = "default amountSold field value"
		fXTrade.amountBought = "default amountBought field value"
		fXTrade.rate = "default rate field value"
		fXTrade.status = "default status field value"
		
		delegate = FXTradeDelegate()
		responseObj = delegate.create(fXTrade)
		
		self.assertEqual(responseObj, delegate.get( responseObj.id ))
	
		allObj = delegate.getAll()
		self.assertEqual(allObj.count(), 1 )		
		delegate.delete(responseObj.id)
		
		allObj = delegate.getAll()
		self.assertEqual(allObj.count(), 0 )		


