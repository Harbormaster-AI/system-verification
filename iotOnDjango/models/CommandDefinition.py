
from django.db import models

#======================================================================
# Class CommandDefinition Declaration
#======================================================================
class CommandDefinition (models.Model):

#======================================================================
# attribute declarations
#======================================================================
	name = models.CharField(max_length=200, null=True)
	requestSchemaUri = Uri
	responseSchemaUri = Uri
	timeoutSeconds = models.IntegerField(null=True)
	deviceModel = models.ForeignKey('DeviceModel', on_delete=models.CASCADE, null=True, blank=True, related_name='+')
	actuators = models.ManyToManyField('ActuatorInstance',  blank=True, related_name='+')
	commandInvocations = models.ManyToManyField('CommandInvocation',  blank=True, related_name='+')

#======================================================================
# function declarations
#======================================================================
	def toString(self):
		str = ""
		str = str + self.name
		str = str + self.requestSchemaUri
		str = str + self.responseSchemaUri
		str = str + self.timeoutSeconds
		return str;
    
	def __str__(self):
		return self.toString();

	def identity(self):
		return "CommandDefinition";
    
	def objectType(self):
		return "CommandDefinition";
