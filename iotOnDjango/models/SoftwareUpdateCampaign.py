
from django.db import models
from iotOnDjango.models.UpdateCampaignStatus import UpdateCampaignStatus

#======================================================================
# Class SoftwareUpdateCampaign Declaration
#======================================================================
class SoftwareUpdateCampaign (models.Model):

#======================================================================
# attribute declarations
#======================================================================
	campaignCode = models.CharField(max_length=200, null=True)
	scheduledStart = models.CharField(max_length=64, null=True)
	scheduledEnd = models.CharField(max_length=64, null=True)
	firmwareRelease = models.ForeignKey('FirmwareRelease', on_delete=models.CASCADE, null=True, blank=True, related_name='+')
	deviceGroup = models.ForeignKey('DeviceGroup', on_delete=models.CASCADE, null=True, blank=True, related_name='+')
	executions = models.ManyToManyField('SoftwareUpdateExecution',  blank=True, related_name='+')
	status = models.CharField(max_length=64, null=True, choices=[(tag.name, tag.value) for tag in UpdateCampaignStatus])

#======================================================================
# function declarations
#======================================================================
	def toString(self):
		str = ""
		str = str + self.campaignCode
		str = str + self.scheduledStart
		str = str + self.scheduledEnd
		str = str + self.status
		return str;
    
	def __str__(self):
		return self.toString();

	def identity(self):
		return "SoftwareUpdateCampaign";
    
	def objectType(self):
		return "SoftwareUpdateCampaign";
