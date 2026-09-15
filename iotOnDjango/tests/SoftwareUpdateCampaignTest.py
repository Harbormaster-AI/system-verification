
import datetime

from django.test import TestCase
from django.utils import timezone
from iotOnDjango.models.SoftwareUpdateCampaign import SoftwareUpdateCampaign
from iotOnDjango.delegates.SoftwareUpdateCampaignDelegate import SoftwareUpdateCampaignDelegate

 #======================================================================
# 
# Encapsulates data for model SoftwareUpdateCampaign
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class SoftwareUpdateCampaignTest Declaration
#======================================================================
class SoftwareUpdateCampaignTest (TestCase) :
	def test_crud(self) :
		softwareUpdateCampaign = SoftwareUpdateCampaign()
		softwareUpdateCampaign.campaignCode = "default campaignCode field value"
		softwareUpdateCampaign.scheduledStart = "default scheduledStart field value"
		softwareUpdateCampaign.scheduledEnd = "default scheduledEnd field value"
		softwareUpdateCampaign.status = "default status field value"
		
		delegate = SoftwareUpdateCampaignDelegate()
		responseObj = delegate.create(softwareUpdateCampaign)
		
		self.assertEqual(responseObj, delegate.get( responseObj.id ))
	
		allObj = delegate.getAll()
		self.assertEqual(allObj.count(), 1 )		
		delegate.delete(responseObj.id)
		
		allObj = delegate.getAll()
		self.assertEqual(allObj.count(), 0 )		


