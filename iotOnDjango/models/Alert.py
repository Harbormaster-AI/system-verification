
from django.db import models
from iotOnDjango.models.AlertStatus import AlertStatus

#======================================================================
# Class Alert Declaration
#======================================================================
class Alert (models.Model):

#======================================================================
# attribute declarations
#======================================================================
	raisedAt = models.CharField(max_length=64, null=True)
	clearedAt = models.CharField(max_length=64, null=True)
	message = models.CharField(max_length=200, null=True)
	device = models.ForeignKey('IoTDevice', on_delete=models.CASCADE, null=True, blank=True, related_name='+')
	alertRule = models.ForeignKey('AlertRule', on_delete=models.CASCADE, null=True, blank=True, related_name='+')
	status = models.CharField(max_length=64, null=True, choices=[(tag.name, tag.value) for tag in AlertStatus])

#======================================================================
# function declarations
#======================================================================
	def toString(self):
		str = ""
		str = str + self.raisedAt
		str = str + self.clearedAt
		str = str + self.message
		str = str + self.status
		return str;
    
	def __str__(self):
		return self.toString();

	def identity(self):
		return "Alert";
    
	def objectType(self):
		return "Alert";
