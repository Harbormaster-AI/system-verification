
from django.db import models
from iotOnDjango.models.MessageQoS import MessageQoS

#======================================================================
# Class TelemetryStream Declaration
#======================================================================
class TelemetryStream (models.Model):

#======================================================================
# attribute declarations
#======================================================================
	streamName = models.CharField(max_length=200, null=True)
	retentionDays = models.IntegerField(null=True)
	device = models.ForeignKey('IoTDevice', on_delete=models.CASCADE, null=True, blank=True, related_name='+')
	sensor = models.ForeignKey('SensorInstance', on_delete=models.CASCADE, null=True, blank=True, related_name='+')
	schema = models.ForeignKey('TelemetrySchema', on_delete=models.CASCADE, null=True, blank=True, related_name='+')
	messagingEndpoint = models.ForeignKey('MessagingEndpoint', on_delete=models.CASCADE, null=True, blank=True, related_name='+')
	retentionPolicy = models.ForeignKey('DataRetentionPolicy', on_delete=models.CASCADE, null=True, blank=True, related_name='+')
	qos = models.CharField(max_length=64, null=True, choices=[(tag.name, tag.value) for tag in MessageQoS])

#======================================================================
# function declarations
#======================================================================
	def toString(self):
		str = ""
		str = str + self.streamName
		str = str + self.retentionDays
		str = str + self.qos
		return str;
    
	def __str__(self):
		return self.toString();

	def identity(self):
		return "TelemetryStream";
    
	def objectType(self):
		return "TelemetryStream";
