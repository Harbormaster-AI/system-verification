
import datetime

from django.test import TestCase
from django.utils import timezone
from iotOnDjango.models.TelemetryStream import TelemetryStream
from iotOnDjango.delegates.TelemetryStreamDelegate import TelemetryStreamDelegate

 #======================================================================
# 
# Encapsulates data for model TelemetryStream
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class TelemetryStreamTest Declaration
#======================================================================
class TelemetryStreamTest (TestCase) :
	def test_crud(self) :
		telemetryStream = TelemetryStream()
		telemetryStream.streamName = "default streamName field value"
		telemetryStream.retentionDays = 22
		telemetryStream.qos = "default qos field value"
		
		delegate = TelemetryStreamDelegate()
		responseObj = delegate.create(telemetryStream)
		
		self.assertEqual(responseObj, delegate.get( responseObj.id ))
	
		allObj = delegate.getAll()
		self.assertEqual(allObj.count(), 1 )		
		delegate.delete(responseObj.id)
		
		allObj = delegate.getAll()
		self.assertEqual(allObj.count(), 0 )		


