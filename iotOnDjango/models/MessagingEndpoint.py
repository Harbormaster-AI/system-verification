
from django.db import models
from iotOnDjango.models.MessagingProtocol import MessagingProtocol

#======================================================================
# Class MessagingEndpoint Declaration
#======================================================================
class MessagingEndpoint (models.Model):

#======================================================================
# attribute declarations
#======================================================================
	host = models.CharField(max_length=200, null=True)
	port = models.IntegerField(null=True)
	secure = models.BooleanField(null=True)
	tenant = models.ForeignKey('Tenant', on_delete=models.CASCADE, null=True, blank=True, related_name='+')
	streams = models.ManyToManyField('TelemetryStream',  blank=True, related_name='+')
	protocol = models.CharField(max_length=64, null=True, choices=[(tag.name, tag.value) for tag in MessagingProtocol])

#======================================================================
# function declarations
#======================================================================
	def toString(self):
		str = ""
		str = str + self.host
		str = str + self.port
		str = str + self.secure
		str = str + self.protocol
		return str;
    
	def __str__(self):
		return self.toString();

	def identity(self):
		return "MessagingEndpoint";
    
	def objectType(self):
		return "MessagingEndpoint";
