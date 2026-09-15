
from django.db import models
from iotOnDjango.models.TwinChangeType import TwinChangeType

#======================================================================
# Class TwinChangeEvent Declaration
#======================================================================
class TwinChangeEvent (models.Model):

#======================================================================
# attribute declarations
#======================================================================
	eventId = models.CharField(max_length=200, null=True)
	occurredAt = models.CharField(max_length=64, null=True)
	twin = models.ForeignKey('DigitalTwin', on_delete=models.CASCADE, null=True, blank=True, related_name='+')
	changeType = models.CharField(max_length=64, null=True, choices=[(tag.name, tag.value) for tag in TwinChangeType])

#======================================================================
# function declarations
#======================================================================
	def toString(self):
		str = ""
		str = str + self.eventId
		str = str + self.occurredAt
		str = str + self.changeType
		return str;
    
	def __str__(self):
		return self.toString();

	def identity(self):
		return "TwinChangeEvent";
    
	def objectType(self):
		return "TwinChangeEvent";
