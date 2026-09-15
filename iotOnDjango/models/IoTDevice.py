
from django.db import models
from iotOnDjango.models.DeviceStatus import DeviceStatus
from iotOnDjango.models.PowerSource import PowerSource

#======================================================================
# Class IoTDevice Declaration
#======================================================================
class IoTDevice (models.Model):

#======================================================================
# attribute declarations
#======================================================================
	deviceId = DeviceId
	serialNumber = models.CharField(max_length=200, null=True)
	lastSeen = models.CharField(max_length=64, null=True)
	firmwareVersion = FirmwareVersion
	deviceModel = models.ForeignKey('DeviceModel', on_delete=models.CASCADE, null=True, blank=True, related_name='+')
	tenant = models.ForeignKey('Tenant', on_delete=models.CASCADE, null=True, blank=True, related_name='+')
	site = models.ForeignKey('Site', on_delete=models.CASCADE, null=True, blank=True, related_name='+')
	room = models.ForeignKey('Room', on_delete=models.CASCADE, null=True, blank=True, related_name='+')
	gateway = models.ForeignKey('Gateway', on_delete=models.CASCADE, null=True, blank=True, related_name='+')
	sensors = models.ManyToManyField('SensorInstance',  blank=True, related_name='+')
	actuators = models.ManyToManyField('ActuatorInstance',  blank=True, related_name='+')
	certificates = models.ManyToManyField('DeviceCertificate',  blank=True, related_name='+')
	digitalTwin = models.OneToOneField('DigitalTwin', on_delete=models.CASCADE, null=True, blank=True, related_name='+')
	telemetryStreams = models.ManyToManyField('TelemetryStream',  blank=True, related_name='+')
	commandInvocations = models.ManyToManyField('CommandInvocation',  blank=True, related_name='+')
	alerts = models.ManyToManyField('Alert',  blank=True, related_name='+')
	provisioningRecord = models.OneToOneField('ProvisioningRecord', on_delete=models.CASCADE, null=True, blank=True, related_name='+')
	deviceGroups = models.ManyToManyField('DeviceGroup',  blank=True, related_name='+')
	networkProfiles = models.ManyToManyField('NetworkProfile',  blank=True, related_name='+')
	status = models.CharField(max_length=64, null=True, choices=[(tag.name, tag.value) for tag in DeviceStatus])
	powerSource = models.CharField(max_length=64, null=True, choices=[(tag.name, tag.value) for tag in PowerSource])

#======================================================================
# function declarations
#======================================================================
	def toString(self):
		str = ""
		str = str + self.deviceId
		str = str + self.serialNumber
		str = str + self.lastSeen
		str = str + self.firmwareVersion
		str = str + self.status
		str = str + self.powerSource
		return str;
    
	def __str__(self):
		return self.toString();

	def identity(self):
		return "IoTDevice";
    
	def objectType(self):
		return "IoTDevice";
