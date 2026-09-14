import datetime

from django.test import TestCase
from django.utils import timezone
from demo.models.BankingProduct import BankingProduct
from demo.delegates.BankingProductDelegate import BankingProductDelegate

 #======================================================================
# 
# Encapsulates data for model BankingProduct
#
# @author your_name_here
#
#======================================================================

#======================================================================
# Class BankingProductTest Declaration
#======================================================================
class BankingProductTest (TestCase) :
	def test_crud(self) :
		bankingProduct = BankingProduct()
		bankingProduct.productCode = "default productCode field value"
		bankingProduct.name = "default name field value"
		bankingProduct.description = "default description field value"
		bankingProduct.productCategory = "default productCategory field value"
		
		delegate = BankingProductDelegate()
		responseObj = delegate.create(bankingProduct)
		
		self.assertEqual(responseObj, delegate.get( responseObj.id ))
	
		allObj = delegate.getAll()
		self.assertEqual(allObj.count(), 1 )		
		delegate.delete(responseObj.id)
		
		allObj = delegate.getAll()
		self.assertEqual(allObj.count(), 0 )		


