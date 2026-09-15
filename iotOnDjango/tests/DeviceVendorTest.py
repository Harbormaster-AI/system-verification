
import datetime

from django.test import TestCase
from django.utils import timezone
from iotOnDjango.models.DeviceVendor import DeviceVendor
from iotOnDjango.delegates.DeviceVendorDelegate import DeviceVendorDelegate

 #======================================================================
# 
# Encapsulates data for model DeviceVendor
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class DeviceVendorTest Declaration
#======================================================================
class DeviceVendorTest (TestCase) :
	def test_crud(self) :
		deviceVendor = DeviceVendor()
		deviceVendor.name = "default name field value"
		deviceVendor.legalName = "default legalName field value"
		deviceVendor.headquartersCountry = "default headquartersCountry field value"
		deviceVendor.website = "default website field value"
		
		delegate = DeviceVendorDelegate()
		responseObj = delegate.create(deviceVendor)
		
		self.assertEqual(responseObj, delegate.get( responseObj.id ))
	
		allObj = delegate.getAll()
		self.assertEqual(allObj.count(), 1 )		
		delegate.delete(responseObj.id)
		
		allObj = delegate.getAll()
		self.assertEqual(allObj.count(), 0 )		


