
import datetime

from django.test import TestCase
from django.utils import timezone
from iotOnDjango.models.SoftwareUpdateExecution import SoftwareUpdateExecution
from iotOnDjango.delegates.SoftwareUpdateExecutionDelegate import SoftwareUpdateExecutionDelegate

 #======================================================================
# 
# Encapsulates data for model SoftwareUpdateExecution
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class SoftwareUpdateExecutionTest Declaration
#======================================================================
class SoftwareUpdateExecutionTest (TestCase) :
	def test_crud(self) :
		softwareUpdateExecution = SoftwareUpdateExecution()
		softwareUpdateExecution.startedAt = "default startedAt field value"
		softwareUpdateExecution.completedAt = "default completedAt field value"
		softwareUpdateExecution.status = "default status field value"
		
		delegate = SoftwareUpdateExecutionDelegate()
		responseObj = delegate.create(softwareUpdateExecution)
		
		self.assertEqual(responseObj, delegate.get( responseObj.id ))
	
		allObj = delegate.getAll()
		self.assertEqual(allObj.count(), 1 )		
		delegate.delete(responseObj.id)
		
		allObj = delegate.getAll()
		self.assertEqual(allObj.count(), 0 )		


