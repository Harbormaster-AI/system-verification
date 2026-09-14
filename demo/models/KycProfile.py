from django.db import models
from demo.models.KycStatus import KycStatus

#======================================================================
# 
# Encapsulates data for model KycProfile
#
# @author your_name_here
#
#======================================================================

#======================================================================
# Class KycProfile Declaration
#======================================================================
class KycProfile (models.Model):

#======================================================================
# attribute declarations
#======================================================================
	profileId = models.CharField(max_length=200, null=True)
	lastReviewedOn = models.DateField(null=True)
	customer = models.ForeignKey('Customer', on_delete=models.CASCADE, null=True, blank=True, related_name='+')
	identityDocuments = models.ManyToManyField('IdentityDocument',  blank=True, related_name='+')
	riskAssessments = models.ManyToManyField('RiskAssessment',  blank=True, related_name='+')
	screenings = models.ManyToManyField('ScreeningResult',  blank=True, related_name='+')
	status = models.CharField(max_length=64, null=True, choices=[(tag.name, tag.value) for tag in KycStatus])

#======================================================================
# function declarations
#======================================================================
	def toString(self):
		str = ""
		str = str + self.profileId
		str = str + self.lastReviewedOn
		str = str + self.status
		return str;
    
	def __str__(self):
		return self.toString();

	def identity(self):
		return "KycProfile";
    
	def objectType(self):
		return "KycProfile";
