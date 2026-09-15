
import datetime

from django.test import TestCase
from django.utils import timezone
from iotOnDjango.models.ProvisioningRecord import ProvisioningRecord
from iotOnDjango.delegates.ProvisioningRecordDelegate import ProvisioningRecordDelegate

 #======================================================================
# 
# Encapsulates data for model ProvisioningRecord
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class ProvisioningRecordTest Declaration
#======================================================================
class ProvisioningRecordTest (TestCase) :
	def test_crud(self) :
		provisioningRecord = ProvisioningRecord()
		provisioningRecord.enrolledAt = "default enrolledAt field value"
		provisioningRecord.provisioningService = "default provisioningService field value"
		provisioningRecord.method = "default method field value"
		provisioningRecord.status = "default status field value"
		
		delegate = ProvisioningRecordDelegate()
		responseObj = delegate.create(provisioningRecord)
		
		self.assertEqual(responseObj, delegate.get( responseObj.id ))
	
		allObj = delegate.getAll()
		self.assertEqual(allObj.count(), 1 )		
		delegate.delete(responseObj.id)
		
		allObj = delegate.getAll()
		self.assertEqual(allObj.count(), 0 )		


