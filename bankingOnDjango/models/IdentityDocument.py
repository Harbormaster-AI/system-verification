
from django.db import models
from bankingOnDjango.models.IdentityDocumentType import IdentityDocumentType

#======================================================================
# Class IdentityDocument Declaration
#======================================================================
class IdentityDocument (models.Model):

#======================================================================
# attribute declarations
#======================================================================
	documentNumber = models.CharField(max_length=200, null=True)
	issuingCountry = models.CharField(max_length=200, null=True)
	expirationDate = models.DateField(null=True)
	kycProfile = models.ForeignKey('KycProfile', on_delete=models.CASCADE, null=True, blank=True, related_name='+')
	documentType = models.CharField(max_length=64, null=True, choices=[(tag.name, tag.value) for tag in IdentityDocumentType])

#======================================================================
# function declarations
#======================================================================
	def toString(self):
		str = ""
		str = str + self.documentNumber
		str = str + self.issuingCountry
		str = str + self.expirationDate
		str = str + self.documentType
		return str;
    
	def __str__(self):
		return self.toString();

	def identity(self):
		return "IdentityDocument";
    
	def objectType(self):
		return "IdentityDocument";
