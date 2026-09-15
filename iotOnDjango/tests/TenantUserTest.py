
import datetime

from django.test import TestCase
from django.utils import timezone
from iotOnDjango.models.TenantUser import TenantUser
from iotOnDjango.delegates.TenantUserDelegate import TenantUserDelegate

 #======================================================================
# 
# Encapsulates data for model TenantUser
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class TenantUserTest Declaration
#======================================================================
class TenantUserTest (TestCase) :
	def test_crud(self) :
		tenantUser = TenantUser()
		tenantUser.firstName = "default firstName field value"
		tenantUser.lastName = "default lastName field value"
		tenantUser.email = "default email field value"
		tenantUser.role = "default role field value"
		
		delegate = TenantUserDelegate()
		responseObj = delegate.create(tenantUser)
		
		self.assertEqual(responseObj, delegate.get( responseObj.id ))
	
		allObj = delegate.getAll()
		self.assertEqual(allObj.count(), 1 )		
		delegate.delete(responseObj.id)
		
		allObj = delegate.getAll()
		self.assertEqual(allObj.count(), 0 )		


