
import datetime

from django.test import TestCase
from django.utils import timezone
from iotOnDjango.models.DeviceGroup import DeviceGroup
from iotOnDjango.delegates.DeviceGroupDelegate import DeviceGroupDelegate

 #======================================================================
# 
# Encapsulates data for model DeviceGroup
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class DeviceGroupTest Declaration
#======================================================================
class DeviceGroupTest (TestCase) :
	def test_crud(self) :
		deviceGroup = DeviceGroup()
		deviceGroup.name = "default name field value"
		deviceGroup.criteria = "default criteria field value"
		
		delegate = DeviceGroupDelegate()
		responseObj = delegate.create(deviceGroup)
		
		self.assertEqual(responseObj, delegate.get( responseObj.id ))
	
		allObj = delegate.getAll()
		self.assertEqual(allObj.count(), 1 )		
		delegate.delete(responseObj.id)
		
		allObj = delegate.getAll()
		self.assertEqual(allObj.count(), 0 )		


