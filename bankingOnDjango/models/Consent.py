
from django.db import models
from bankingOnDjango.models.ConsentType import ConsentType
from bankingOnDjango.models.ConsentStatus import ConsentStatus

#======================================================================
# Class Consent Declaration
#======================================================================
class Consent (models.Model):

#======================================================================
# attribute declarations
#======================================================================
	grantedOn = models.DateField(null=True)
	expiresOn = models.DateField(null=True)
	customer = models.ForeignKey('Customer', on_delete=models.CASCADE, null=True, blank=True, related_name='+')
	bank = models.ForeignKey('Bank', on_delete=models.CASCADE, null=True, blank=True, related_name='+')
	authorizedAccounts = models.ManyToManyField('Account',  blank=True, related_name='+')
	thirdPartyProvider = models.ForeignKey('ThirdPartyProvider', on_delete=models.CASCADE, null=True, blank=True, related_name='+')
	consentType = models.CharField(max_length=64, null=True, choices=[(tag.name, tag.value) for tag in ConsentType])
	status = models.CharField(max_length=64, null=True, choices=[(tag.name, tag.value) for tag in ConsentStatus])

#======================================================================
# function declarations
#======================================================================
	def toString(self):
		str = ""
		str = str + self.grantedOn
		str = str + self.expiresOn
		str = str + self.consentType
		str = str + self.status
		return str;
    
	def __str__(self):
		return self.toString();

	def identity(self):
		return "Consent";
    
	def objectType(self):
		return "Consent";
