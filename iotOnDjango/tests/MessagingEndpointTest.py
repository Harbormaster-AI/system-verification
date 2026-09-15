
import datetime

from django.test import TestCase
from django.utils import timezone
from iotOnDjango.models.MessagingEndpoint import MessagingEndpoint
from iotOnDjango.delegates.MessagingEndpointDelegate import MessagingEndpointDelegate

 #======================================================================
# 
# Encapsulates data for model MessagingEndpoint
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class MessagingEndpointTest Declaration
#======================================================================
class MessagingEndpointTest (TestCase) :
	def test_crud(self) :
		messagingEndpoint = MessagingEndpoint()
		messagingEndpoint.host = "default host field value"
		messagingEndpoint.port = 22
		messagingEndpoint.secure = False
		messagingEndpoint.protocol = "default protocol field value"
		
		delegate = MessagingEndpointDelegate()
		responseObj = delegate.create(messagingEndpoint)
		
		self.assertEqual(responseObj, delegate.get( responseObj.id ))
	
		allObj = delegate.getAll()
		self.assertEqual(allObj.count(), 1 )		
		delegate.delete(responseObj.id)
		
		allObj = delegate.getAll()
		self.assertEqual(allObj.count(), 0 )		


