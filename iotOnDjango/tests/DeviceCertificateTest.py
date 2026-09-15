
import datetime

from django.test import TestCase
from django.utils import timezone
from iotOnDjango.models.DeviceCertificate import DeviceCertificate
from iotOnDjango.delegates.DeviceCertificateDelegate import DeviceCertificateDelegate

 #======================================================================
# 
# Encapsulates data for model DeviceCertificate
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class DeviceCertificateTest Declaration
#======================================================================
class DeviceCertificateTest (TestCase) :
	def test_crud(self) :
		deviceCertificate = DeviceCertificate()
		deviceCertificate.serialNumber = "default serialNumber field value"
		deviceCertificate.notBefore = "default notBefore field value"
		deviceCertificate.notAfter = "default notAfter field value"
		deviceCertificate.fingerprint = "default fingerprint field value"
		deviceCertificate.certificateType = "default certificateType field value"
		
		delegate = DeviceCertificateDelegate()
		responseObj = delegate.create(deviceCertificate)
		
		self.assertEqual(responseObj, delegate.get( responseObj.id ))
	
		allObj = delegate.getAll()
		self.assertEqual(allObj.count(), 1 )		
		delegate.delete(responseObj.id)
		
		allObj = delegate.getAll()
		self.assertEqual(allObj.count(), 0 )		


