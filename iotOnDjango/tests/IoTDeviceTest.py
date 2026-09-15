
import datetime

from django.test import TestCase
from django.utils import timezone
from iotOnDjango.models.IoTDevice import IoTDevice
from iotOnDjango.delegates.IoTDeviceDelegate import IoTDeviceDelegate

 #======================================================================
# 
# Encapsulates data for model IoTDevice
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class IoTDeviceTest Declaration
#======================================================================
class IoTDeviceTest (TestCase) :
	def test_crud(self) :
		ioTDevice = IoTDevice()
		ioTDevice.deviceId = "default deviceId field value"
		ioTDevice.serialNumber = "default serialNumber field value"
		ioTDevice.lastSeen = "default lastSeen field value"
		ioTDevice.firmwareVersion = "default firmwareVersion field value"
		ioTDevice.status = "default status field value"
		ioTDevice.powerSource = "default powerSource field value"
		
		delegate = IoTDeviceDelegate()
		responseObj = delegate.create(ioTDevice)
		
		self.assertEqual(responseObj, delegate.get( responseObj.id ))
	
		allObj = delegate.getAll()
		self.assertEqual(allObj.count(), 1 )		
		delegate.delete(responseObj.id)
		
		allObj = delegate.getAll()
		self.assertEqual(allObj.count(), 0 )		


