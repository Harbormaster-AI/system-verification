
import datetime

from django.test import TestCase
from django.utils import timezone
from iotOnDjango.models.Gateway import Gateway
from iotOnDjango.delegates.GatewayDelegate import GatewayDelegate

 #======================================================================
# 
# Encapsulates data for model Gateway
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class GatewayTest Declaration
#======================================================================
class GatewayTest (TestCase) :
	def test_crud(self) :
		gateway = Gateway()
		gateway.softwareVersion = "default softwareVersion field value"
		gateway.status = "default status field value"
		
		delegate = GatewayDelegate()
		responseObj = delegate.create(gateway)
		
		self.assertEqual(responseObj, delegate.get( responseObj.id ))
	
		allObj = delegate.getAll()
		self.assertEqual(allObj.count(), 1 )		
		delegate.delete(responseObj.id)
		
		allObj = delegate.getAll()
		self.assertEqual(allObj.count(), 0 )		


