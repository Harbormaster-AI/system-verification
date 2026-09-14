from django.db import models
from demo.models.RiskRating import RiskRating

#======================================================================
# 
# Encapsulates data for model RiskAssessment
#
# @author your_name_here
#
#======================================================================

#======================================================================
# Class RiskAssessment Declaration
#======================================================================
class RiskAssessment (models.Model):

#======================================================================
# attribute declarations
#======================================================================
	score = models.IntegerField(null=True)
	assessedOn = models.DateField(null=True)
	kycProfile = models.ForeignKey('KycProfile', on_delete=models.CASCADE, null=True, blank=True, related_name='+')
	rating = models.CharField(max_length=64, null=True, choices=[(tag.name, tag.value) for tag in RiskRating])

#======================================================================
# function declarations
#======================================================================
	def toString(self):
		str = ""
		str = str + self.score
		str = str + self.assessedOn
		str = str + self.rating
		return str;
    
	def __str__(self):
		return self.toString();

	def identity(self):
		return "RiskAssessment";
    
	def objectType(self):
		return "RiskAssessment";
