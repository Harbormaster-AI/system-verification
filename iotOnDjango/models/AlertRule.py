
from django.db import models
from iotOnDjango.models.AlertSeverity import AlertSeverity

#======================================================================
# Class AlertRule Declaration
#======================================================================
class AlertRule (models.Model):

#======================================================================
# attribute declarations
#======================================================================
	name = models.CharField(max_length=200, null=True)
	expression = models.CharField(max_length=200, null=True)
	tenant = models.ForeignKey('Tenant', on_delete=models.CASCADE, null=True, blank=True, related_name='+')
	streams = models.ManyToManyField('TelemetryStream',  blank=True, related_name='+')
	alerts = models.ManyToManyField('Alert',  blank=True, related_name='+')
	severity = models.CharField(max_length=64, null=True, choices=[(tag.name, tag.value) for tag in AlertSeverity])

#======================================================================
# function declarations
#======================================================================
	def toString(self):
		str = ""
		str = str + self.name
		str = str + self.expression
		str = str + self.severity
		return str;
    
	def __str__(self):
		return self.toString();

	def identity(self):
		return "AlertRule";
    
	def objectType(self):
		return "AlertRule";
