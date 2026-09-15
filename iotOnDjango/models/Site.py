
from django.db import models

#======================================================================
# Class Site Declaration
#======================================================================
class Site (models.Model):

#======================================================================
# attribute declarations
#======================================================================
	name = models.CharField(max_length=200, null=True)
	address = Address
	timezone = models.CharField(max_length=200, null=True)
	latitude = models.CharField(max_length=64, null=True)
	longitude = models.CharField(max_length=64, null=True)
	tenant = models.ForeignKey('Tenant', on_delete=models.CASCADE, null=True, blank=True, related_name='+')
	buildings = models.ManyToManyField('Building',  blank=True, related_name='+')
	devices = models.ManyToManyField('IoTDevice',  blank=True, related_name='+')
	gateways = models.ManyToManyField('Gateway',  blank=True, related_name='+')

#======================================================================
# function declarations
#======================================================================
	def toString(self):
		str = ""
		str = str + self.name
		str = str + self.address
		str = str + self.timezone
		str = str + self.latitude
		str = str + self.longitude
		return str;
    
	def __str__(self):
		return self.toString();

	def identity(self):
		return "Site";
    
	def objectType(self):
		return "Site";
