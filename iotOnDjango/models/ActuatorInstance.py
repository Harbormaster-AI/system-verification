
from django.db import models
from iotOnDjango.models.ActuatorType import ActuatorType

#======================================================================
# Class ActuatorInstance Declaration
#======================================================================
class ActuatorInstance (models.Model):

#======================================================================
# attribute declarations
#======================================================================
	name = models.CharField(max_length=200, null=True)
	commandTopic = TopicName
	device = models.ForeignKey('IoTDevice', on_delete=models.CASCADE, null=True, blank=True, related_name='+')
	supportedCommands = models.ManyToManyField('CommandDefinition',  blank=True, related_name='+')
	actuatorType = models.CharField(max_length=64, null=True, choices=[(tag.name, tag.value) for tag in ActuatorType])

#======================================================================
# function declarations
#======================================================================
	def toString(self):
		str = ""
		str = str + self.name
		str = str + self.commandTopic
		str = str + self.actuatorType
		return str;
    
	def __str__(self):
		return self.toString();

	def identity(self):
		return "ActuatorInstance";
    
	def objectType(self):
		return "ActuatorInstance";
