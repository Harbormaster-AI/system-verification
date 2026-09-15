
from django.db import models
from iotOnDjango.models.CertificateType import CertificateType

#======================================================================
# Class DeviceCertificate Declaration
#======================================================================
class DeviceCertificate (models.Model):

#======================================================================
# attribute declarations
#======================================================================
	serialNumber = models.CharField(max_length=200, null=True)
	notBefore = models.CharField(max_length=64, null=True)
	notAfter = models.CharField(max_length=64, null=True)
	fingerprint = models.CharField(max_length=200, null=True)
	device = models.ForeignKey('IoTDevice', on_delete=models.CASCADE, null=True, blank=True, related_name='+')
	gateway = models.ForeignKey('Gateway', on_delete=models.CASCADE, null=True, blank=True, related_name='+')
	certificateType = models.CharField(max_length=64, null=True, choices=[(tag.name, tag.value) for tag in CertificateType])

#======================================================================
# function declarations
#======================================================================
	def toString(self):
		str = ""
		str = str + self.serialNumber
		str = str + self.notBefore
		str = str + self.notAfter
		str = str + self.fingerprint
		str = str + self.certificateType
		return str;
    
	def __str__(self):
		return self.toString();

	def identity(self):
		return "DeviceCertificate";
    
	def objectType(self):
		return "DeviceCertificate";
