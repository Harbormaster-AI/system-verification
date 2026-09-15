
import datetime

from django.test import TestCase
from django.utils import timezone
from iotOnDjango.models.MaintenanceTicket import MaintenanceTicket
from iotOnDjango.delegates.MaintenanceTicketDelegate import MaintenanceTicketDelegate

 #======================================================================
# 
# Encapsulates data for model MaintenanceTicket
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class MaintenanceTicketTest Declaration
#======================================================================
class MaintenanceTicketTest (TestCase) :
	def test_crud(self) :
		maintenanceTicket = MaintenanceTicket()
		maintenanceTicket.ticketNumber = "default ticketNumber field value"
		maintenanceTicket.openedAt = "default openedAt field value"
		maintenanceTicket.closedAt = "default closedAt field value"
		maintenanceTicket.priority = "default priority field value"
		maintenanceTicket.status = "default status field value"
		
		delegate = MaintenanceTicketDelegate()
		responseObj = delegate.create(maintenanceTicket)
		
		self.assertEqual(responseObj, delegate.get( responseObj.id ))
	
		allObj = delegate.getAll()
		self.assertEqual(allObj.count(), 1 )		
		delegate.delete(responseObj.id)
		
		allObj = delegate.getAll()
		self.assertEqual(allObj.count(), 0 )		


