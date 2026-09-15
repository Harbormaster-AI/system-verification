
from django.db import models

#======================================================================
# Class DataRetentionPolicy Declaration
#======================================================================
class DataRetentionPolicy (models.Model):

#======================================================================
# attribute declarations
#======================================================================
	name = models.CharField(max_length=200, null=True)
	retentionDays = models.IntegerField(null=True)
	tenant = models.ForeignKey('Tenant', on_delete=models.CASCADE, null=True, blank=True, related_name='+')
	streams = models.ManyToManyField('TelemetryStream',  blank=True, related_name='+')

#======================================================================
# function declarations
#======================================================================
	def toString(self):
		str = ""
		str = str + self.name
		str = str + self.retentionDays
		return str;
    
	def __str__(self):
		return self.toString();

	def identity(self):
		return "DataRetentionPolicy";
    
	def objectType(self):
		return "DataRetentionPolicy";
