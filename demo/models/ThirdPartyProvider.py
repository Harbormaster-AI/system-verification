from django.db import models

#======================================================================
# 
# Encapsulates data for model ThirdPartyProvider
#
# @author your_name_here
#
#======================================================================

#======================================================================
# Class ThirdPartyProvider Declaration
#======================================================================
class ThirdPartyProvider (models.Model):

#======================================================================
# attribute declarations
#======================================================================
	name = models.CharField(max_length=200, null=True)
	registrationId = models.CharField(max_length=200, null=True)
	website = models.CharField(max_length=200, null=True)
	bank = models.ForeignKey('Bank', on_delete=models.CASCADE, null=True, blank=True, related_name='+')
	consents = models.ManyToManyField('Consent',  blank=True, related_name='+')

#======================================================================
# function declarations
#======================================================================
	def toString(self):
		str = ""
		str = str + self.name
		str = str + self.registrationId
		str = str + self.website
		return str;
    
	def __str__(self):
		return self.toString();

	def identity(self):
		return "ThirdPartyProvider";
    
	def objectType(self):
		return "ThirdPartyProvider";
