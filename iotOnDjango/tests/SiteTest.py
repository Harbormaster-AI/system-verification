
import datetime

from django.test import TestCase
from django.utils import timezone
from iotOnDjango.models.Site import Site
from iotOnDjango.delegates.SiteDelegate import SiteDelegate

 #======================================================================
# 
# Encapsulates data for model Site
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class SiteTest Declaration
#======================================================================
class SiteTest (TestCase) :
	def test_crud(self) :
		site = Site()
		site.name = "default name field value"
		site.address = "default address field value"
		site.timezone = "default timezone field value"
		site.latitude = "default latitude field value"
		site.longitude = "default longitude field value"
		
		delegate = SiteDelegate()
		responseObj = delegate.create(site)
		
		self.assertEqual(responseObj, delegate.get( responseObj.id ))
	
		allObj = delegate.getAll()
		self.assertEqual(allObj.count(), 1 )		
		delegate.delete(responseObj.id)
		
		allObj = delegate.getAll()
		self.assertEqual(allObj.count(), 0 )		


