

from django.test import TestCase

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
		kyc_profile = KycProfile()
		kyc_profile.profileId = "default profileId field value"
		kyc_profile.lastReviewedOn = datetime.datetime.now()
		kyc_profile.status = "default status field value"
		
		delegate = KycProfileDelegate()
		response_obj = delegate.create(kyc_profile)
		
		self.assertEqual(response_obj, delegate.get( response_obj.id ))
	
		all_obj = delegate.getAll()
		self.assertEqual(all_obj.count(), 1 )		
		delegate.delete(response_obj.id)
		
		all_obj = delegate.getAll()
		self.assertEqual(all_obj.count(), 0 )		


