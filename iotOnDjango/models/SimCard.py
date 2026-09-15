
from django.db import models
from iotOnDjango.models.SimStatus import SimStatus

#======================================================================
# Class SimCard Declaration
#======================================================================
class SimCard (models.Model):

#======================================================================
# attribute declarations
#======================================================================
	iccid = models.CharField(max_length=200, null=True)
	imsi = models.CharField(max_length=200, null=True)
	carrier = models.CharField(max_length=200, null=True)
	networkProfiles = models.ManyToManyField('NetworkProfile',  blank=True, related_name='+')
	tenant = models.ForeignKey('Tenant', on_delete=models.CASCADE, null=True, blank=True, related_name='+')
	connectivityPlan = models.ForeignKey('ConnectivityPlan', on_delete=models.CASCADE, null=True, blank=True, related_name='+')
	status = models.CharField(max_length=64, null=True, choices=[(tag.name, tag.value) for tag in SimStatus])

#======================================================================
# function declarations
#======================================================================
	def toString(self):
		str = ""
		str = str + self.iccid
		str = str + self.imsi
		str = str + self.carrier
		str = str + self.status
		return str;
    
	def __str__(self):
		return self.toString();

	def identity(self):
		return "SimCard";
    
	def objectType(self):
		return "SimCard";
