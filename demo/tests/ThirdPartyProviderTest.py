import datetime

from django.test import TestCase
from django.utils import timezone
from demo.models.ThirdPartyProvider import ThirdPartyProvider
from demo.delegates.ThirdPartyProviderDelegate import ThirdPartyProviderDelegate

 #======================================================================
# 
# Encapsulates data for model ThirdPartyProvider
#
# @author your_name_here
#
#======================================================================

#======================================================================
# Class ThirdPartyProviderTest Declaration
#======================================================================
class ThirdPartyProviderTest (TestCase) :
	def test_crud(self) :
		thirdPartyProvider = ThirdPartyProvider()
		thirdPartyProvider.name = "default name field value"
		thirdPartyProvider.registrationId = "default registrationId field value"
		thirdPartyProvider.website = "default website field value"
		
		delegate = ThirdPartyProviderDelegate()
		responseObj = delegate.create(thirdPartyProvider)
		
		self.assertEqual(responseObj, delegate.get( responseObj.id ))
	
		allObj = delegate.getAll()
		self.assertEqual(allObj.count(), 1 )		
		delegate.delete(responseObj.id)
		
		allObj = delegate.getAll()
		self.assertEqual(allObj.count(), 0 )		


