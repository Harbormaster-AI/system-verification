
import datetime

from django.test import TestCase
from django.utils import timezone
from iotOnDjango.models.DigitalTwin import DigitalTwin
from iotOnDjango.delegates.DigitalTwinDelegate import DigitalTwinDelegate

 #======================================================================
# 
# Encapsulates data for model DigitalTwin
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class DigitalTwinTest Declaration
#======================================================================
class DigitalTwinTest (TestCase) :
	def test_crud(self) :
		digitalTwin = DigitalTwin()
		digitalTwin.twinId = "default twinId field value"
		digitalTwin.desiredStateVersion = 22
		digitalTwin.reportedStateVersion = 22
		digitalTwin.lastSyncAt = "default lastSyncAt field value"
		
		delegate = DigitalTwinDelegate()
		responseObj = delegate.create(digitalTwin)
		
		self.assertEqual(responseObj, delegate.get( responseObj.id ))
	
		allObj = delegate.getAll()
		self.assertEqual(allObj.count(), 1 )		
		delegate.delete(responseObj.id)
		
		allObj = delegate.getAll()
		self.assertEqual(allObj.count(), 0 )		


