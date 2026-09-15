
from django.db import models
from iotOnDjango.models.ConnectivityType import ConnectivityType
from iotOnDjango.models.TelemetryEncoding import TelemetryEncoding

#======================================================================
# Class DeviceModel Declaration
#======================================================================
class DeviceModel (models.Model):

#======================================================================
# attribute declarations
#======================================================================
	name = models.CharField(max_length=200, null=True)
	modelNumber = models.CharField(max_length=200, null=True)
	hardwareRevision = models.CharField(max_length=200, null=True)
	vendor = models.ForeignKey('DeviceVendor', on_delete=models.CASCADE, null=True, blank=True, related_name='+')
	hardwareModules = models.ManyToManyField('HardwareModule',  blank=True, related_name='+')
	twinTemplate = models.ForeignKey('TwinTemplate', on_delete=models.CASCADE, null=True, blank=True, related_name='+')
	firmwareReleases = models.ManyToManyField('FirmwareRelease',  blank=True, related_name='+')
	commandDefinitions = models.ManyToManyField('CommandDefinition',  blank=True, related_name='+')
	supportedConnectivity = models.CharField(max_length=64, null=True, choices=[(tag.name, tag.value) for tag in ConnectivityType])
	defaultTelemetryEncoding = models.CharField(max_length=64, null=True, choices=[(tag.name, tag.value) for tag in TelemetryEncoding])

#======================================================================
# function declarations
#======================================================================
	def toString(self):
		str = ""
		str = str + self.name
		str = str + self.modelNumber
		str = str + self.hardwareRevision
		str = str + self.supportedConnectivity
		str = str + self.defaultTelemetryEncoding
		return str;
    
	def __str__(self):
		return self.toString();

	def identity(self):
		return "DeviceModel";
    
	def objectType(self):
		return "DeviceModel";
