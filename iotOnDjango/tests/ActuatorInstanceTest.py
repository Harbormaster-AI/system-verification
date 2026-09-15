
import datetime

from django.test import TestCase
from django.utils import timezone
from iotOnDjango.models.ActuatorInstance import ActuatorInstance
from iotOnDjango.delegates.ActuatorInstanceDelegate import ActuatorInstanceDelegate

 #======================================================================
# 
# Encapsulates data for model ActuatorInstance
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class ActuatorInstanceTest Declaration
#======================================================================
class ActuatorInstanceTest (TestCase) :
	def test_crud(self) :
		actuatorInstance = ActuatorInstance()
		actuatorInstance.name = "default name field value"
		actuatorInstance.commandTopic = "default commandTopic field value"
		actuatorInstance.actuatorType = "default actuatorType field value"
		
		delegate = ActuatorInstanceDelegate()
		responseObj = delegate.create(actuatorInstance)
		
		self.assertEqual(responseObj, delegate.get( responseObj.id ))
	
		allObj = delegate.getAll()
		self.assertEqual(allObj.count(), 1 )		
		delegate.delete(responseObj.id)
		
		allObj = delegate.getAll()
		self.assertEqual(allObj.count(), 0 )		


