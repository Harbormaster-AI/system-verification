import datetime

from django.test import TestCase
from django.utils import timezone
from demo.models.Transaction import Transaction
from demo.delegates.TransactionDelegate import TransactionDelegate

 #======================================================================
# 
# Encapsulates data for model Transaction
#
# @author your_name_here
#
#======================================================================

#======================================================================
# Class TransactionTest Declaration
#======================================================================
class TransactionTest (TestCase) :
	def test_crud(self) :
		transaction = Transaction()
		transaction.bookingDate = datetime.datetime.now()
		transaction.valueDate = datetime.datetime.now()
		transaction.amount = "default amount field value"
		transaction.description = "default description field value"
		transaction.direction = "default direction field value"
		transaction.transactionType = "default transactionType field value"
		transaction.status = "default status field value"
		transaction.channel = "default channel field value"
		
		delegate = TransactionDelegate()
		responseObj = delegate.create(transaction)
		
		self.assertEqual(responseObj, delegate.get( responseObj.id ))
	
		allObj = delegate.getAll()
		self.assertEqual(allObj.count(), 1 )		
		delegate.delete(responseObj.id)
		
		allObj = delegate.getAll()
		self.assertEqual(allObj.count(), 0 )		


