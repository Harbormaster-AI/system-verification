
import datetime

from django.test import TestCase
from django.utils import timezone
from iotOnDjango.models.FirmwareRelease import FirmwareRelease
from iotOnDjango.delegates.FirmwareReleaseDelegate import FirmwareReleaseDelegate

 #======================================================================
# 
# Encapsulates data for model FirmwareRelease
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class FirmwareReleaseTest Declaration
#======================================================================
class FirmwareReleaseTest (TestCase) :
	def test_crud(self) :
		firmwareRelease = FirmwareRelease()
		firmwareRelease.version = "default version field value"
		firmwareRelease.releaseDate = datetime.datetime.now()
		firmwareRelease.releaseNotes = "default releaseNotes field value"
		firmwareRelease.checksum = "default checksum field value"
		
		delegate = FirmwareReleaseDelegate()
		responseObj = delegate.create(firmwareRelease)
		
		self.assertEqual(responseObj, delegate.get( responseObj.id ))
	
		allObj = delegate.getAll()
		self.assertEqual(allObj.count(), 1 )		
		delegate.delete(responseObj.id)
		
		allObj = delegate.getAll()
		self.assertEqual(allObj.count(), 0 )		


