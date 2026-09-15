
from django.db import models

#======================================================================
# Class ConnectivityPlan Declaration
#======================================================================
class ConnectivityPlan (models.Model):

#======================================================================
# attribute declarations
#======================================================================
	name = models.CharField(max_length=200, null=True)
	dataCapMB = models.IntegerField(null=True)
	billingCycleDays = models.IntegerField(null=True)
	simCards = models.ManyToManyField('SimCard',  blank=True, related_name='+')
	tenant = models.ForeignKey('Tenant', on_delete=models.CASCADE, null=True, blank=True, related_name='+')

#======================================================================
# function declarations
#======================================================================
	def toString(self):
		str = ""
		str = str + self.name
		str = str + self.dataCapMB
		str = str + self.billingCycleDays
		return str;
    
	def __str__(self):
		return self.toString();

	def identity(self):
		return "ConnectivityPlan";
    
	def objectType(self):
		return "ConnectivityPlan";
