
import datetime

from django.test import TestCase
from django.utils import timezone
from iotOnDjango.models.DeviceModel import DeviceModel
from iotOnDjango.delegates.DeviceModelDelegate import DeviceModelDelegate

 #======================================================================
# 
# Encapsulates data for model DeviceModel
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class DeviceModelTest Declaration
#======================================================================
class DeviceModelTest (TestCase) :
	def test_crud(self) :
		deviceModel = DeviceModel()
		deviceModel.name = "default name field value"
		deviceModel.modelNumber = "default modelNumber field value"
		deviceModel.hardwareRevision = "default hardwareRevision field value"
		deviceModel.supportedConnectivity = "default supportedConnectivity field value"
		deviceModel.defaultTelemetryEncoding = "default defaultTelemetryEncoding field value"
		
		delegate = DeviceModelDelegate()
		responseObj = delegate.create(deviceModel)
		
		self.assertEqual(responseObj, delegate.get( responseObj.id ))
	
		allObj = delegate.getAll()
		self.assertEqual(allObj.count(), 1 )		
		delegate.delete(responseObj.id)
		
		allObj = delegate.getAll()
		self.assertEqual(allObj.count(), 0 )		


