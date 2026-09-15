
from django.db import models
from iotOnDjango.models.ModuleType import ModuleType

#======================================================================
# Class HardwareModule Declaration
#======================================================================
class HardwareModule (models.Model):

#======================================================================
# attribute declarations
#======================================================================
	moduleCode = models.CharField(max_length=200, null=True)
	datasheetUri = Uri
	vendor = models.ForeignKey('DeviceVendor', on_delete=models.CASCADE, null=True, blank=True, related_name='+')
	moduleType = models.CharField(max_length=64, null=True, choices=[(tag.name, tag.value) for tag in ModuleType])

#======================================================================
# function declarations
#======================================================================
	def toString(self):
		str = ""
		str = str + self.moduleCode
		str = str + self.datasheetUri
		str = str + self.moduleType
		return str;
    
	def __str__(self):
		return self.toString();

	def identity(self):
		return "HardwareModule";
    
	def objectType(self):
		return "HardwareModule";
