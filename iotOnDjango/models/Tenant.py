
from django.db import models
from iotOnDjango.models.TenantType import TenantType

#======================================================================
# Class Tenant Declaration
#======================================================================
class Tenant (models.Model):

#======================================================================
# attribute declarations
#======================================================================
	name = models.CharField(max_length=200, null=True)
	sites = models.ManyToManyField('Site',  blank=True, related_name='+')
	users = models.ManyToManyField('TenantUser',  blank=True, related_name='+')
	devices = models.ManyToManyField('IoTDevice',  blank=True, related_name='+')
	dataRetentionPolicies = models.ManyToManyField('DataRetentionPolicy',  blank=True, related_name='+')
	connectivityPlans = models.ManyToManyField('ConnectivityPlan',  blank=True, related_name='+')
	simCards = models.ManyToManyField('SimCard',  blank=True, related_name='+')
	messagingEndpoints = models.ManyToManyField('MessagingEndpoint',  blank=True, related_name='+')
	accessPolicies = models.ManyToManyField('AccessPolicy',  blank=True, related_name='+')
	deviceGroups = models.ManyToManyField('DeviceGroup',  blank=True, related_name='+')
	alertRules = models.ManyToManyField('AlertRule',  blank=True, related_name='+')
	maintenanceTickets = models.ManyToManyField('MaintenanceTicket',  blank=True, related_name='+')
	usageRecords = models.ManyToManyField('UsageRecord',  blank=True, related_name='+')
	tenantType = models.CharField(max_length=64, null=True, choices=[(tag.name, tag.value) for tag in TenantType])

#======================================================================
# function declarations
#======================================================================
	def toString(self):
		str = ""
		str = str + self.name
		str = str + self.tenantType
		return str;
    
	def __str__(self):
		return self.toString();

	def identity(self):
		return "Tenant";
    
	def objectType(self):
		return "Tenant";
