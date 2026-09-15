
import datetime

from django.test import TestCase
from django.utils import timezone
from iotOnDjango.models.CommandInvocation import CommandInvocation
from iotOnDjango.delegates.CommandInvocationDelegate import CommandInvocationDelegate

 #======================================================================
# 
# Encapsulates data for model CommandInvocation
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class CommandInvocationTest Declaration
#======================================================================
class CommandInvocationTest (TestCase) :
	def test_crud(self) :
		commandInvocation = CommandInvocation()
		commandInvocation.invocationId = "default invocationId field value"
		commandInvocation.requestedAt = "default requestedAt field value"
		commandInvocation.completedAt = "default completedAt field value"
		commandInvocation.status = "default status field value"
		
		delegate = CommandInvocationDelegate()
		responseObj = delegate.create(commandInvocation)
		
		self.assertEqual(responseObj, delegate.get( responseObj.id ))
	
		allObj = delegate.getAll()
		self.assertEqual(allObj.count(), 1 )		
		delegate.delete(responseObj.id)
		
		allObj = delegate.getAll()
		self.assertEqual(allObj.count(), 0 )		


