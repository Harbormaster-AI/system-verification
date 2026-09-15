
from django.db import models

#======================================================================
# Class DigitalTwin Declaration
#======================================================================
class DigitalTwin (models.Model):

#======================================================================
# attribute declarations
#======================================================================
	twinId = models.CharField(max_length=200, null=True)
	desiredStateVersion = models.IntegerField(null=True)
	reportedStateVersion = models.IntegerField(null=True)
	lastSyncAt = models.CharField(max_length=64, null=True)
	device = models.OneToOneField('IoTDevice', on_delete=models.CASCADE, null=True, blank=True, related_name='+')
	gateway = models.OneToOneField('Gateway', on_delete=models.CASCADE, null=True, blank=True, related_name='+')
	template = models.ForeignKey('TwinTemplate', on_delete=models.CASCADE, null=True, blank=True, related_name='+')
	changeEvents = models.ManyToManyField('TwinChangeEvent',  blank=True, related_name='+')

#======================================================================
# function declarations
#======================================================================
	def toString(self):
		str = ""
		str = str + self.twinId
		str = str + self.desiredStateVersion
		str = str + self.reportedStateVersion
		str = str + self.lastSyncAt
		return str;
    
	def __str__(self):
		return self.toString();

	def identity(self):
		return "DigitalTwin";
    
	def objectType(self):
		return "DigitalTwin";
