
import datetime

from django.test import TestCase
from django.utils import timezone
from bankingOnDjango.models.KycProfile import KycProfile
from bankingOnDjango.delegates.KycProfileDelegate import KycProfileDelegate

 #======================================================================
# 
# Encapsulates data for model KycProfile
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class KycProfileTest Declaration
#======================================================================
class KycProfileTest (TestCase) :
	def test_crud(self) :
		kycProfile = KycProfile()
		kycProfile.profileId = "default profileId field value"
		kycProfile.lastReviewedOn = datetime.datetime.now()
		kycProfile.status = "default status field value"
		
		delegate = KycProfileDelegate()
		responseObj = delegate.create(kycProfile)
		
		self.assertEqual(responseObj, delegate.get( responseObj.id ))
	
		allObj = delegate.getAll()
		self.assertEqual(allObj.count(), 1 )		
		delegate.delete(responseObj.id)
		
		allObj = delegate.getAll()
		self.assertEqual(allObj.count(), 0 )		


