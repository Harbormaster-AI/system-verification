
import datetime

from django.test import TestCase
from django.utils import timezone
from iotOnDjango.models.UsageRecord import UsageRecord
from iotOnDjango.delegates.UsageRecordDelegate import UsageRecordDelegate

 #======================================================================
# 
# Encapsulates data for model UsageRecord
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class UsageRecordTest Declaration
#======================================================================
class UsageRecordTest (TestCase) :
	def test_crud(self) :
		usageRecord = UsageRecord()
		usageRecord.periodStart = datetime.datetime.now()
		usageRecord.periodEnd = datetime.datetime.now()
		usageRecord.messagesSent = 22
		usageRecord.dataVolumeMB = 22
		
		delegate = UsageRecordDelegate()
		responseObj = delegate.create(usageRecord)
		
		self.assertEqual(responseObj, delegate.get( responseObj.id ))
	
		allObj = delegate.getAll()
		self.assertEqual(allObj.count(), 1 )		
		delegate.delete(responseObj.id)
		
		allObj = delegate.getAll()
		self.assertEqual(allObj.count(), 0 )		


