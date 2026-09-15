
from django.db import models
from iotOnDjango.models.TelemetryEncoding import TelemetryEncoding

#======================================================================
# Class TelemetrySchema Declaration
#======================================================================
class TelemetrySchema (models.Model):

#======================================================================
# attribute declarations
#======================================================================
	schemaId = models.CharField(max_length=200, null=True)
	schemaUri = Uri
	streams = models.ManyToManyField('TelemetryStream',  blank=True, related_name='+')
	encoding = models.CharField(max_length=64, null=True, choices=[(tag.name, tag.value) for tag in TelemetryEncoding])

#======================================================================
# function declarations
#======================================================================
	def toString(self):
		str = ""
		str = str + self.schemaId
		str = str + self.schemaUri
		str = str + self.encoding
		return str;
    
	def __str__(self):
		return self.toString();

	def identity(self):
		return "TelemetrySchema";
    
	def objectType(self):
		return "TelemetrySchema";
