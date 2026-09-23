
import datetime

from django.test import TestCase
from django.utils import timezone
from bankingOnDjango.models.BankingProduct import BankingProduct
from bankingOnDjango.delegates.BankingProductDelegate import BankingProductDelegate

 #======================================================================
# 
# Encapsulates data for model BankingProduct
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class BankingProductTest Declaration
#======================================================================
class BankingProductTest (TestCase) :
	def test_crud(self) :
		banking_product = BankingProduct()
		banking_product.productCode = "default productCode field value"
		banking_product.name = "default name field value"
		banking_product.description = "default description field value"
		banking_product.productCategory = "default productCategory field value"
		
		delegate = BankingProductDelegate()
		response_obj = delegate.create(banking_product)
		
		self.assertEqual(response_obj, delegate.get( response_obj.id ))
	
		all_obj = delegate.getAll()
		self.assertEqual(all_obj.count(), 1 )		
		delegate.delete(response_obj.id)
		
		all_obj = delegate.getAll()
		self.assertEqual(all_obj.count(), 0 )		


