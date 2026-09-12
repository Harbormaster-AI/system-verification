import datetime

from django.test import TestCase
from django.utils import timezone
from demo.models.Collateral import Collateral
from demo.delegates.CollateralDelegate import CollateralDelegate

 #======================================================================
# 
# Encapsulates data for model Collateral
#
# @author your_name_here
#
#======================================================================

#======================================================================
# Class CollateralTest Declaration
#======================================================================
class CollateralTest (TestCase) :
	def test_crud(self) :
		collateral = Collateral()
		collateral.appraisedValue = "default appraisedValue field value"
		collateral.description = "default description field value"
		collateral.location = "default location field value"
		collateral.collateralType = "default collateralType field value"
		
		delegate = CollateralDelegate()
		responseObj = delegate.create(collateral)
		
		self.assertEqual(responseObj, delegate.get( responseObj.id ))
	
		allObj = delegate.getAll()
		self.assertEqual(allObj.count(), 1 )		
		delegate.delete(responseObj.id)
		
		allObj = delegate.getAll()
		self.assertEqual(allObj.count(), 0 )		


