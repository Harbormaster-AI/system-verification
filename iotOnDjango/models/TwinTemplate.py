
from django.db import models

#======================================================================
# Class TwinTemplate Declaration
#======================================================================
class TwinTemplate (models.Model):

#======================================================================
# attribute declarations
#======================================================================
	name = models.CharField(max_length=200, null=True)
	schemaUri = Uri
	version = models.CharField(max_length=200, null=True)
	deviceModels = models.ManyToManyField('DeviceModel',  blank=True, related_name='+')

#======================================================================
# function declarations
#======================================================================
	def toString(self):
		str = ""
		str = str + self.name
		str = str + self.schemaUri
		str = str + self.version
		return str;
    
	def __str__(self):
		return self.toString();

	def identity(self):
		return "TwinTemplate";
    
	def objectType(self):
		return "TwinTemplate";
