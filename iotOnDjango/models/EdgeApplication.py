
from django.db import models
from iotOnDjango.models.DeploymentStatus import DeploymentStatus

#======================================================================
# Class EdgeApplication Declaration
#======================================================================
class EdgeApplication (models.Model):

#======================================================================
# attribute declarations
#======================================================================
	name = models.CharField(max_length=200, null=True)
	version = models.CharField(max_length=200, null=True)
	image = models.CharField(max_length=200, null=True)
	gateway = models.ForeignKey('Gateway', on_delete=models.CASCADE, null=True, blank=True, related_name='+')
	status = models.CharField(max_length=64, null=True, choices=[(tag.name, tag.value) for tag in DeploymentStatus])

#======================================================================
# function declarations
#======================================================================
	def toString(self):
		str = ""
		str = str + self.name
		str = str + self.version
		str = str + self.image
		str = str + self.status
		return str;
    
	def __str__(self):
		return self.toString();

	def identity(self):
		return "EdgeApplication";
    
	def objectType(self):
		return "EdgeApplication";
