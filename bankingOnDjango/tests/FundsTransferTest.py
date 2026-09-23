
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
		funds_transfer = FundsTransfer()
		funds_transfer.transferReference = "default transferReference field value"
		funds_transfer.amount = "default amount field value"
		funds_transfer.requestedDate = datetime.datetime.now()
		funds_transfer.executionDate = datetime.datetime.now()
		funds_transfer.purpose = "default purpose field value"
		funds_transfer.feeAmount = "default feeAmount field value"
		funds_transfer.method = "default method field value"
		funds_transfer.status = "default status field value"
		
		delegate = FundsTransferDelegate()
		response_obj = delegate.create(funds_transfer)
		
		self.assertEqual(response_obj, delegate.get( response_obj.id ))
	
		all_obj = delegate.getAll()
		self.assertEqual(all_obj.count(), 1 )		
		delegate.delete(response_obj.id)
		
		all_obj = delegate.getAll()
		self.assertEqual(all_obj.count(), 0 )		


