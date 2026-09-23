
import datetime

from django.test import TestCase
from django.utils import timezone
from bankingOnDjango.models.ThirdPartyProvider import ThirdPartyProvider
from bankingOnDjango.delegates.ThirdPartyProviderDelegate import ThirdPartyProviderDelegate

 #======================================================================
# 
# Encapsulates data for model ThirdPartyProvider
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class ThirdPartyProviderTest Declaration
#======================================================================
class ThirdPartyProviderTest (TestCase) :
	def test_crud(self) :
		third_party_provider = ThirdPartyProvider()
		third_party_provider.name = "default name field value"
		third_party_provider.registrationId = "default registrationId field value"
		third_party_provider.website = "default website field value"
		
		delegate = ThirdPartyProviderDelegate()
		response_obj = delegate.create(third_party_provider)
		
		self.assertEqual(response_obj, delegate.get( response_obj.id ))
	
		all_obj = delegate.getAll()
		self.assertEqual(all_obj.count(), 1 )		
		delegate.delete(response_obj.id)
		
		all_obj = delegate.getAll()
		self.assertEqual(all_obj.count(), 0 )		


