
from django.db import models

#======================================================================
# Class DeviceVendor Declaration
#======================================================================
class DeviceVendor (models.Model):

#======================================================================
# attribute declarations
#======================================================================
	name = models.CharField(max_length=200, null=True)
	legalName = models.CharField(max_length=200, null=True)
	headquartersCountry = models.CharField(max_length=200, null=True)
	website = models.CharField(max_length=200, null=True)
	deviceModels = models.ManyToManyField('DeviceModel',  blank=True, related_name='+')
	firmwareReleases = models.ManyToManyField('FirmwareRelease',  blank=True, related_name='+')
	hardwareModules = models.ManyToManyField('HardwareModule',  blank=True, related_name='+')

#======================================================================
# function declarations
#======================================================================
	def toString(self):
		str = ""
		str = str + self.name
		str = str + self.legalName
		str = str + self.headquartersCountry
		str = str + self.website
		return str;
    
	def __str__(self):
		return self.toString();

	def identity(self):
		return "DeviceVendor";
    
	def objectType(self):
		return "DeviceVendor";
