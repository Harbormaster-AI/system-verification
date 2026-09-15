
from django.db import models
from iotOnDjango.models.DeviceStatus import DeviceStatus

#======================================================================
# Class Gateway Declaration
#======================================================================
class Gateway (models.Model):

#======================================================================
# attribute declarations
#======================================================================
	softwareVersion = models.CharField(max_length=200, null=True)
	site = models.ForeignKey('Site', on_delete=models.CASCADE, null=True, blank=True, related_name='+')
	room = models.ForeignKey('Room', on_delete=models.CASCADE, null=True, blank=True, related_name='+')
	devices = models.ManyToManyField('IoTDevice',  blank=True, related_name='+')
	edgeApplications = models.ManyToManyField('EdgeApplication',  blank=True, related_name='+')
	certificates = models.ManyToManyField('DeviceCertificate',  blank=True, related_name='+')
	digitalTwin = models.OneToOneField('DigitalTwin', on_delete=models.CASCADE, null=True, blank=True, related_name='+')
	networkProfiles = models.ManyToManyField('NetworkProfile',  blank=True, related_name='+')
	status = models.CharField(max_length=64, null=True, choices=[(tag.name, tag.value) for tag in DeviceStatus])

#======================================================================
# function declarations
#======================================================================
	def toString(self):
		str = ""
		str = str + self.softwareVersion
		str = str + self.status
		return str;
    
	def __str__(self):
		return self.toString();

	def identity(self):
		return "Gateway";
    
	def objectType(self):
		return "Gateway";
