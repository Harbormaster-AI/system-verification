
import datetime

from django.test import TestCase
from django.utils import timezone
from iotOnDjango.models.SensorInstance import SensorInstance
from iotOnDjango.delegates.SensorInstanceDelegate import SensorInstanceDelegate

 #======================================================================
# 
# Encapsulates data for model SensorInstance
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class SensorInstanceTest Declaration
#======================================================================
class SensorInstanceTest (TestCase) :
	def test_crud(self) :
		sensorInstance = SensorInstance()
		sensorInstance.name = "default name field value"
		sensorInstance.unit = "default unit field value"
		sensorInstance.samplingIntervalMs = 22
		sensorInstance.sensorType = "default sensorType field value"
		
		delegate = SensorInstanceDelegate()
		responseObj = delegate.create(sensorInstance)
		
		self.assertEqual(responseObj, delegate.get( responseObj.id ))
	
		allObj = delegate.getAll()
		self.assertEqual(allObj.count(), 1 )		
		delegate.delete(responseObj.id)
		
		allObj = delegate.getAll()
		self.assertEqual(allObj.count(), 0 )		


