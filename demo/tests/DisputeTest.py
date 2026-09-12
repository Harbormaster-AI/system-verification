import datetime

from django.test import TestCase
from django.utils import timezone
from demo.models.Dispute import Dispute
from demo.delegates.DisputeDelegate import DisputeDelegate

 #======================================================================
# 
# Encapsulates data for model Dispute
#
# @author your_name_here
#
#======================================================================

#======================================================================
# Class DisputeTest Declaration
#======================================================================
class DisputeTest (TestCase) :
	def test_crud(self) :
		dispute = Dispute()
		dispute.disputeReference = "default disputeReference field value"
		dispute.raisedOn = datetime.datetime.now()
		dispute.reason = "default reason field value"
		dispute.status = "default status field value"
		
		delegate = DisputeDelegate()
		responseObj = delegate.create(dispute)
		
		self.assertEqual(responseObj, delegate.get( responseObj.id ))
	
		allObj = delegate.getAll()
		self.assertEqual(allObj.count(), 1 )		
		delegate.delete(responseObj.id)
		
		allObj = delegate.getAll()
		self.assertEqual(allObj.count(), 0 )		


