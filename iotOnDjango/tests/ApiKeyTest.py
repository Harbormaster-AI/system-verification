
import datetime

from django.test import TestCase
from django.utils import timezone
from iotOnDjango.models.ApiKey import ApiKey
from iotOnDjango.delegates.ApiKeyDelegate import ApiKeyDelegate

 #======================================================================
# 
# Encapsulates data for model ApiKey
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class ApiKeyTest Declaration
#======================================================================
class ApiKeyTest (TestCase) :
	def test_crud(self) :
		apiKey = ApiKey()
		apiKey.keyId = "default keyId field value"
		apiKey.hashedSecret = "default hashedSecret field value"
		apiKey.createdAt = "default createdAt field value"
		apiKey.lastUsedAt = "default lastUsedAt field value"
		
		delegate = ApiKeyDelegate()
		responseObj = delegate.create(apiKey)
		
		self.assertEqual(responseObj, delegate.get( responseObj.id ))
	
		allObj = delegate.getAll()
		self.assertEqual(allObj.count(), 1 )		
		delegate.delete(responseObj.id)
		
		allObj = delegate.getAll()
		self.assertEqual(allObj.count(), 0 )		


