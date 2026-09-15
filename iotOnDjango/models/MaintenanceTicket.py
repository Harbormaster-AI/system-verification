
from django.db import models
from iotOnDjango.models.MaintenancePriority import MaintenancePriority
from iotOnDjango.models.MaintenanceStatus import MaintenanceStatus

#======================================================================
# Class MaintenanceTicket Declaration
#======================================================================
class MaintenanceTicket (models.Model):

#======================================================================
# attribute declarations
#======================================================================
	ticketNumber = models.CharField(max_length=200, null=True)
	openedAt = models.CharField(max_length=64, null=True)
	closedAt = models.CharField(max_length=64, null=True)
	device = models.ForeignKey('IoTDevice', on_delete=models.CASCADE, null=True, blank=True, related_name='+')
	tenant = models.ForeignKey('Tenant', on_delete=models.CASCADE, null=True, blank=True, related_name='+')
	priority = models.CharField(max_length=64, null=True, choices=[(tag.name, tag.value) for tag in MaintenancePriority])
	status = models.CharField(max_length=64, null=True, choices=[(tag.name, tag.value) for tag in MaintenanceStatus])

#======================================================================
# function declarations
#======================================================================
	def toString(self):
		str = ""
		str = str + self.ticketNumber
		str = str + self.openedAt
		str = str + self.closedAt
		str = str + self.priority
		str = str + self.status
		return str;
    
	def __str__(self):
		return self.toString();

	def identity(self):
		return "MaintenanceTicket";
    
	def objectType(self):
		return "MaintenanceTicket";
