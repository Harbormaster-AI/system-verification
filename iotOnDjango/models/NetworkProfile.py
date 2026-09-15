
from django.db import models
from iotOnDjango.models.ConnectivityType import ConnectivityType

#======================================================================
# Class NetworkProfile Declaration
#======================================================================
class NetworkProfile (models.Model):

#======================================================================
# attribute declarations
#======================================================================
	profileName = models.CharField(max_length=200, null=True)
	ssid = models.CharField(max_length=200, null=True)
	apn = models.CharField(max_length=200, null=True)
	device = models.ForeignKey('IoTDevice', on_delete=models.CASCADE, null=True, blank=True, related_name='+')
	gateway = models.ForeignKey('Gateway', on_delete=models.CASCADE, null=True, blank=True, related_name='+')
	simCard = models.ForeignKey('SimCard', on_delete=models.CASCADE, null=True, blank=True, related_name='+')
	connectivityType = models.CharField(max_length=64, null=True, choices=[(tag.name, tag.value) for tag in ConnectivityType])

#======================================================================
# function declarations
#======================================================================
	def toString(self):
		str = ""
		str = str + self.profileName
		str = str + self.ssid
		str = str + self.apn
		str = str + self.connectivityType
		return str;
    
	def __str__(self):
		return self.toString();

	def identity(self):
		return "NetworkProfile";
    
	def objectType(self):
		return "NetworkProfile";
