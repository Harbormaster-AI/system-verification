
import datetime

from django.test import TestCase
from django.utils import timezone
from iotOnDjango.models.TelemetrySchema import TelemetrySchema
from iotOnDjango.delegates.TelemetrySchemaDelegate import TelemetrySchemaDelegate

 #======================================================================
# 
# Encapsulates data for model TelemetrySchema
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class TelemetrySchemaTest Declaration
#======================================================================
class TelemetrySchemaTest (TestCase) :
	def test_crud(self) :
		telemetrySchema = TelemetrySchema()
		telemetrySchema.schemaId = "default schemaId field value"
		telemetrySchema.schemaUri = "default schemaUri field value"
		telemetrySchema.encoding = "default encoding field value"
		
		delegate = TelemetrySchemaDelegate()
		responseObj = delegate.create(telemetrySchema)
		
		self.assertEqual(responseObj, delegate.get( responseObj.id ))
	
		allObj = delegate.getAll()
		self.assertEqual(allObj.count(), 1 )		
		delegate.delete(responseObj.id)
		
		allObj = delegate.getAll()
		self.assertEqual(allObj.count(), 0 )		


