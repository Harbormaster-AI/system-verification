
from django.db import models
from iotOnDjango.models.SensorType import SensorType

#======================================================================
# Class SensorInstance Declaration
#======================================================================
class SensorInstance (models.Model):

#======================================================================
# attribute declarations
#======================================================================
	name = models.CharField(max_length=200, null=True)
	unit = models.CharField(max_length=200, null=True)
	samplingIntervalMs = models.IntegerField(null=True)
	device = models.ForeignKey('IoTDevice', on_delete=models.CASCADE, null=True, blank=True, related_name='+')
	telemetryStreams = models.ManyToManyField('TelemetryStream',  blank=True, related_name='+')
	sensorType = models.CharField(max_length=64, null=True, choices=[(tag.name, tag.value) for tag in SensorType])

#======================================================================
# function declarations
#======================================================================
	def toString(self):
		str = ""
		str = str + self.name
		str = str + self.unit
		str = str + self.samplingIntervalMs
		str = str + self.sensorType
		return str;
    
	def __str__(self):
		return self.toString();

	def identity(self):
		return "SensorInstance";
    
	def objectType(self):
		return "SensorInstance";
