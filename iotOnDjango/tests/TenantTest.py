
import datetime

from django.test import TestCase
from django.utils import timezone
from iotOnDjango.models.Tenant import Tenant
from iotOnDjango.delegates.TenantDelegate import TenantDelegate

 #======================================================================
# 
# Encapsulates data for model Tenant
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class TenantTest Declaration
#======================================================================
class TenantTest (TestCase) :
	def test_crud(self) :
		tenant = Tenant()
		tenant.name = "default name field value"
		tenant.tenantType = "default tenantType field value"
		
		delegate = TenantDelegate()
		responseObj = delegate.create(tenant)
		
		self.assertEqual(responseObj, delegate.get( responseObj.id ))
	
		allObj = delegate.getAll()
		self.assertEqual(allObj.count(), 1 )		
		delegate.delete(responseObj.id)
		
		allObj = delegate.getAll()
		self.assertEqual(allObj.count(), 0 )		


