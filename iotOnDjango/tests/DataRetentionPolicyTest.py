
import datetime

from django.test import TestCase
from django.utils import timezone
from iotOnDjango.models.DataRetentionPolicy import DataRetentionPolicy
from iotOnDjango.delegates.DataRetentionPolicyDelegate import DataRetentionPolicyDelegate

 #======================================================================
# 
# Encapsulates data for model DataRetentionPolicy
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class DataRetentionPolicyTest Declaration
#======================================================================
class DataRetentionPolicyTest (TestCase) :
	def test_crud(self) :
		dataRetentionPolicy = DataRetentionPolicy()
		dataRetentionPolicy.name = "default name field value"
		dataRetentionPolicy.retentionDays = 22
		
		delegate = DataRetentionPolicyDelegate()
		responseObj = delegate.create(dataRetentionPolicy)
		
		self.assertEqual(responseObj, delegate.get( responseObj.id ))
	
		allObj = delegate.getAll()
		self.assertEqual(allObj.count(), 1 )		
		delegate.delete(responseObj.id)
		
		allObj = delegate.getAll()
		self.assertEqual(allObj.count(), 0 )		


