
from django.db import models
from iotOnDjango.models.CommandStatus import CommandStatus

#======================================================================
# Class CommandInvocation Declaration
#======================================================================
class CommandInvocation (models.Model):

#======================================================================
# attribute declarations
#======================================================================
	invocationId = models.CharField(max_length=200, null=True)
	requestedAt = models.CharField(max_length=64, null=True)
	completedAt = models.CharField(max_length=64, null=True)
	device = models.ForeignKey('IoTDevice', on_delete=models.CASCADE, null=True, blank=True, related_name='+')
	commandDefinition = models.ForeignKey('CommandDefinition', on_delete=models.CASCADE, null=True, blank=True, related_name='+')
	actuator = models.ForeignKey('ActuatorInstance', on_delete=models.CASCADE, null=True, blank=True, related_name='+')
	user = models.ForeignKey('TenantUser', on_delete=models.CASCADE, null=True, blank=True, related_name='+')
	status = models.CharField(max_length=64, null=True, choices=[(tag.name, tag.value) for tag in CommandStatus])

#======================================================================
# function declarations
#======================================================================
	def toString(self):
		str = ""
		str = str + self.invocationId
		str = str + self.requestedAt
		str = str + self.completedAt
		str = str + self.status
		return str;
    
	def __str__(self):
		return self.toString();

	def identity(self):
		return "CommandInvocation";
    
	def objectType(self):
		return "CommandInvocation";
