import datetime

from django.test import TestCase
from django.utils import timezone
from demo.models.FeeCharge import FeeCharge
from demo.delegates.FeeChargeDelegate import FeeChargeDelegate

 #======================================================================
# 
# Encapsulates data for model FeeCharge
#
# @author your_name_here
#
#======================================================================

#======================================================================
# Class FeeChargeTest Declaration
#======================================================================
class FeeChargeTest (TestCase) :
	def test_crud(self) :
		feeCharge = FeeCharge()
		feeCharge.feeCode = "default feeCode field value"
		feeCharge.amount = "default amount field value"
		feeCharge.appliedOn = datetime.datetime.now()
		feeCharge.feeType = "default feeType field value"
		
		delegate = FeeChargeDelegate()
		responseObj = delegate.create(feeCharge)
		
		self.assertEqual(responseObj, delegate.get( responseObj.id ))
	
		allObj = delegate.getAll()
		self.assertEqual(allObj.count(), 1 )		
		delegate.delete(responseObj.id)
		
		allObj = delegate.getAll()
		self.assertEqual(allObj.count(), 0 )		


