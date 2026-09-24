

from django.test import TestCase

from bankingOnDjango.models.FXTrade import FXTrade
from bankingOnDjango.delegates.FXTradeDelegate import FXTradeDelegate


 #======================================================================
# 
# Encapsulates data for model FXTrade
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class FXTradeTest Declaration
#======================================================================
class FXTradeTest (TestCase) :
	def test_crud(self) :
		f_x_trade = FXTrade()
		f_x_trade.tradeReference = "default tradeReference field value"
		f_x_trade.tradeDate = datetime.now()
		f_x_trade.settlementDate = datetime.now()
		f_x_trade.amountSold = "default amountSold field value"
		f_x_trade.amountBought = "default amountBought field value"
		f_x_trade.rate = "default rate field value"
		f_x_trade.status = "default status field value"
		
		delegate = FXTradeDelegate()
		response_obj = delegate.create(f_x_trade)
		
		self.assertEqual(response_obj, delegate.get( response_obj.id ))
	
		all_obj = delegate.getAll()
		self.assertEqual(all_obj.count(), 1 )		
		delegate.delete(response_obj.id)
		
		all_obj = delegate.getAll()
		self.assertEqual(all_obj.count(), 0 )		


