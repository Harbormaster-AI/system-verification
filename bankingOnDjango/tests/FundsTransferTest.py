
import datetime

from django.test import TestCase
from django.utils import timezone
from bankingOnDjango.models.FundsTransfer import FundsTransfer
from bankingOnDjango.delegates.FundsTransferDelegate import FundsTransferDelegate

 #======================================================================
# 
# Encapsulates data for model FundsTransfer
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class FundsTransferTest Declaration
#======================================================================
class FundsTransferTest (TestCase) :
	def test_crud(self) :
		fundsTransfer = FundsTransfer()
		fundsTransfer.transferReference = "default transferReference field value"
		fundsTransfer.amount = "default amount field value"
		fundsTransfer.requestedDate = datetime.datetime.now()
		fundsTransfer.executionDate = datetime.datetime.now()
		fundsTransfer.purpose = "default purpose field value"
		fundsTransfer.feeAmount = "default feeAmount field value"
		fundsTransfer.method = "default method field value"
		fundsTransfer.status = "default status field value"
		
		delegate = FundsTransferDelegate()
		responseObj = delegate.create(fundsTransfer)
		
		self.assertEqual(responseObj, delegate.get( responseObj.id ))
	
		allObj = delegate.getAll()
		self.assertEqual(allObj.count(), 1 )		
		delegate.delete(responseObj.id)
		
		allObj = delegate.getAll()
		self.assertEqual(allObj.count(), 0 )		


