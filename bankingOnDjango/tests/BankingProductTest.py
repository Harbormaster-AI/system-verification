
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


