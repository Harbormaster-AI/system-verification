
import datetime

from django.test import TestCase
from django.utils import timezone
from iotOnDjango.models.CommandDefinition import CommandDefinition
from iotOnDjango.delegates.CommandDefinitionDelegate import CommandDefinitionDelegate

 #======================================================================
# 
# Encapsulates data for model CommandDefinition
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class CommandDefinitionTest Declaration
#======================================================================
class CommandDefinitionTest (TestCase) :
	def test_crud(self) :
		commandDefinition = CommandDefinition()
		commandDefinition.name = "default name field value"
		commandDefinition.requestSchemaUri = "default requestSchemaUri field value"
		commandDefinition.responseSchemaUri = "default responseSchemaUri field value"
		commandDefinition.timeoutSeconds = 22
		
		delegate = CommandDefinitionDelegate()
		responseObj = delegate.create(commandDefinition)
		
		self.assertEqual(responseObj, delegate.get( responseObj.id ))
	
		allObj = delegate.getAll()
		self.assertEqual(allObj.count(), 1 )		
		delegate.delete(responseObj.id)
		
		allObj = delegate.getAll()
		self.assertEqual(allObj.count(), 0 )		


