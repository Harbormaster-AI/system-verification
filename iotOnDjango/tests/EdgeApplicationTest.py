
import datetime

from django.test import TestCase
from django.utils import timezone
from iotOnDjango.models.EdgeApplication import EdgeApplication
from iotOnDjango.delegates.EdgeApplicationDelegate import EdgeApplicationDelegate

 #======================================================================
# 
# Encapsulates data for model EdgeApplication
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class EdgeApplicationTest Declaration
#======================================================================
class EdgeApplicationTest (TestCase) :
	def test_crud(self) :
		edgeApplication = EdgeApplication()
		edgeApplication.name = "default name field value"
		edgeApplication.version = "default version field value"
		edgeApplication.image = "default image field value"
		edgeApplication.status = "default status field value"
		
		delegate = EdgeApplicationDelegate()
		responseObj = delegate.create(edgeApplication)
		
		self.assertEqual(responseObj, delegate.get( responseObj.id ))
	
		allObj = delegate.getAll()
		self.assertEqual(allObj.count(), 1 )		
		delegate.delete(responseObj.id)
		
		allObj = delegate.getAll()
		self.assertEqual(allObj.count(), 0 )		


