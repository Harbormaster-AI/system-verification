
from django.db import models
from iotOnDjango.models.ProvisioningMethod import ProvisioningMethod
from iotOnDjango.models.ProvisioningStatus import ProvisioningStatus

#======================================================================
# Class ProvisioningRecord Declaration
#======================================================================
class ProvisioningRecord (models.Model):

#======================================================================
# attribute declarations
#======================================================================
	enrolledAt = models.CharField(max_length=64, null=True)
	provisioningService = models.CharField(max_length=200, null=True)
	device = models.OneToOneField('IoTDevice', on_delete=models.CASCADE, null=True, blank=True, related_name='+')
	certificate = models.OneToOneField('DeviceCertificate', on_delete=models.CASCADE, null=True, blank=True, related_name='+')
	tenant = models.ForeignKey('Tenant', on_delete=models.CASCADE, null=True, blank=True, related_name='+')
	method = models.CharField(max_length=64, null=True, choices=[(tag.name, tag.value) for tag in ProvisioningMethod])
	status = models.CharField(max_length=64, null=True, choices=[(tag.name, tag.value) for tag in ProvisioningStatus])

#======================================================================
# function declarations
#======================================================================
	def toString(self):
		str = ""
		str = str + self.enrolledAt
		str = str + self.provisioningService
		str = str + self.method
		str = str + self.status
		return str;
    
	def __str__(self):
		return self.toString();

	def identity(self):
		return "ProvisioningRecord";
    
	def objectType(self):
		return "ProvisioningRecord";
