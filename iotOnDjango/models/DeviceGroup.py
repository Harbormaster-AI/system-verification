
from django.db import models

#======================================================================
# Class DeviceGroup Declaration
#======================================================================
class DeviceGroup (models.Model):

#======================================================================
# attribute declarations
#======================================================================
	name = models.CharField(max_length=200, null=True)
	criteria = models.CharField(max_length=200, null=True)
	tenant = models.ForeignKey('Tenant', on_delete=models.CASCADE, null=True, blank=True, related_name='+')
	devices = models.ManyToManyField('IoTDevice',  blank=True, related_name='+')

#======================================================================
# function declarations
#======================================================================
	def toString(self):
		str = ""
		str = str + self.name
		str = str + self.criteria
		return str;
    
	def __str__(self):
		return self.toString();

	def identity(self):
		return "DeviceGroup";
    
	def objectType(self):
		return "DeviceGroup";
