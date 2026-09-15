
import datetime

from django.test import TestCase
from django.utils import timezone
from iotOnDjango.models.NetworkProfile import NetworkProfile
from iotOnDjango.delegates.NetworkProfileDelegate import NetworkProfileDelegate

 #======================================================================
# 
# Encapsulates data for model NetworkProfile
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class NetworkProfileTest Declaration
#======================================================================
class NetworkProfileTest (TestCase) :
	def test_crud(self) :
		networkProfile = NetworkProfile()
		networkProfile.profileName = "default profileName field value"
		networkProfile.ssid = "default ssid field value"
		networkProfile.apn = "default apn field value"
		networkProfile.connectivityType = "default connectivityType field value"
		
		delegate = NetworkProfileDelegate()
		responseObj = delegate.create(networkProfile)
		
		self.assertEqual(responseObj, delegate.get( responseObj.id ))
	
		allObj = delegate.getAll()
		self.assertEqual(allObj.count(), 1 )		
		delegate.delete(responseObj.id)
		
		allObj = delegate.getAll()
		self.assertEqual(allObj.count(), 0 )		


