
from django.db import models

#======================================================================
# Class UsageRecord Declaration
#======================================================================
class UsageRecord (models.Model):

#======================================================================
# attribute declarations
#======================================================================
	periodStart = models.DateField(null=True)
	periodEnd = models.DateField(null=True)
	messagesSent = models.IntegerField(null=True)
	dataVolumeMB = models.IntegerField(null=True)
	tenant = models.ForeignKey('Tenant', on_delete=models.CASCADE, null=True, blank=True, related_name='+')
	device = models.ForeignKey('IoTDevice', on_delete=models.CASCADE, null=True, blank=True, related_name='+')
	connectivityPlan = models.ForeignKey('ConnectivityPlan', on_delete=models.CASCADE, null=True, blank=True, related_name='+')

#======================================================================
# function declarations
#======================================================================
	def toString(self):
		str = ""
		str = str + self.periodStart
		str = str + self.periodEnd
		str = str + self.messagesSent
		str = str + self.dataVolumeMB
		return str;
    
	def __str__(self):
		return self.toString();

	def identity(self):
		return "UsageRecord";
    
	def objectType(self):
		return "UsageRecord";
