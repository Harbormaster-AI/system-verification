

from django.test import TestCase

from bankingOnDjango.models.FeeCharge import FeeCharge
from bankingOnDjango.delegates.FeeChargeDelegate import FeeChargeDelegate

import datetime

 #======================================================================
# 
# Encapsulates data for model FeeCharge
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class FeeChargeTest Declaration
#======================================================================
class FeeChargeTest (TestCase) :
	def test_crud(self) :
		fee_charge = FeeCharge()
		fee_charge.feeCode = "default feeCode field value"
		fee_charge.amount = "default amount field value"
		fee_charge.appliedOn = datetime.datetime.now()
		fee_charge.feeType = "default feeType field value"
		
		delegate = FeeChargeDelegate()
		response_obj = delegate.create(fee_charge)
		
		self.assertEqual(response_obj, delegate.get( response_obj.id ))
	
		all_obj = delegate.getAll()
		self.assertEqual(all_obj.count(), 1 )		
		delegate.delete(response_obj.id)
		
		all_obj = delegate.getAll()
		self.assertEqual(all_obj.count(), 0 )		


