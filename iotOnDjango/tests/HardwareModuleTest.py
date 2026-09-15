
import datetime

from django.test import TestCase
from django.utils import timezone
from iotOnDjango.models.HardwareModule import HardwareModule
from iotOnDjango.delegates.HardwareModuleDelegate import HardwareModuleDelegate

 #======================================================================
# 
# Encapsulates data for model HardwareModule
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class HardwareModuleTest Declaration
#======================================================================
class HardwareModuleTest (TestCase) :
	def test_crud(self) :
		hardwareModule = HardwareModule()
		hardwareModule.moduleCode = "default moduleCode field value"
		hardwareModule.datasheetUri = "default datasheetUri field value"
		hardwareModule.moduleType = "default moduleType field value"
		
		delegate = HardwareModuleDelegate()
		responseObj = delegate.create(hardwareModule)
		
		self.assertEqual(responseObj, delegate.get( responseObj.id ))
	
		allObj = delegate.getAll()
		self.assertEqual(allObj.count(), 1 )		
		delegate.delete(responseObj.id)
		
		allObj = delegate.getAll()
		self.assertEqual(allObj.count(), 0 )		


