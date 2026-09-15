
from django.db import models
from iotOnDjango.models.UpdateStatus import UpdateStatus

#======================================================================
# Class SoftwareUpdateExecution Declaration
#======================================================================
class SoftwareUpdateExecution (models.Model):

#======================================================================
# attribute declarations
#======================================================================
	startedAt = models.CharField(max_length=64, null=True)
	completedAt = models.CharField(max_length=64, null=True)
	campaign = models.ForeignKey('SoftwareUpdateCampaign', on_delete=models.CASCADE, null=True, blank=True, related_name='+')
	device = models.ForeignKey('IoTDevice', on_delete=models.CASCADE, null=True, blank=True, related_name='+')
	status = models.CharField(max_length=64, null=True, choices=[(tag.name, tag.value) for tag in UpdateStatus])

#======================================================================
# function declarations
#======================================================================
	def toString(self):
		str = ""
		str = str + self.startedAt
		str = str + self.completedAt
		str = str + self.status
		return str;
    
	def __str__(self):
		return self.toString();

	def identity(self):
		return "SoftwareUpdateExecution";
    
	def objectType(self):
		return "SoftwareUpdateExecution";
