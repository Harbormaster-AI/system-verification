
import datetime

from django.test import TestCase
from django.utils import timezone
from iotOnDjango.models.TwinTemplate import TwinTemplate
from iotOnDjango.delegates.TwinTemplateDelegate import TwinTemplateDelegate

 #======================================================================
# 
# Encapsulates data for model TwinTemplate
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class TwinTemplateTest Declaration
#======================================================================
class TwinTemplateTest (TestCase) :
	def test_crud(self) :
		twinTemplate = TwinTemplate()
		twinTemplate.name = "default name field value"
		twinTemplate.schemaUri = "default schemaUri field value"
		twinTemplate.version = "default version field value"
		
		delegate = TwinTemplateDelegate()
		responseObj = delegate.create(twinTemplate)
		
		self.assertEqual(responseObj, delegate.get( responseObj.id ))
	
		allObj = delegate.getAll()
		self.assertEqual(allObj.count(), 1 )		
		delegate.delete(responseObj.id)
		
		allObj = delegate.getAll()
		self.assertEqual(allObj.count(), 0 )		


