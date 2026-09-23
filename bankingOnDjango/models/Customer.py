
from django.db import models
from bankingOnDjango.models.CustomerType import CustomerType
from bankingOnDjango.models.RiskRating import RiskRating
from bankingOnDjango.models.KycStatus import KycStatus

#======================================================================
# Class Customer Declaration
#======================================================================
class Customer (models.Model):

#======================================================================
# attribute declarations
#======================================================================
	firstName = models.CharField(max_length=200, null=True)
	lastName = models.CharField(max_length=200, null=True)
	legalName = models.CharField(max_length=200, null=True)
	dateOfBirth = models.DateField(null=True)
	taxId = models.CharField(max_length=200, null=True)
	email = models.CharField(max_length=200, null=True)
	phone = models.CharField(max_length=200, null=True)
	addressStreet = models.CharField(max_length=200, null=True)
	addressCity = models.CharField(max_length=200, null=True)
	addressState = models.CharField(max_length=200, null=True)
	addressPostalCode = models.CharField(max_length=200, null=True)
	addressCountry = models.CharField(max_length=200, null=True)
	bank = models.ForeignKey('Bank', on_delete=models.CASCADE, null=True, blank=True, related_name='+')
	accounts = models.ManyToManyField('Account',  blank=True, related_name='+')
	loanAccounts = models.ManyToManyField('LoanAccount',  blank=True, related_name='+')
	paymentCards = models.ManyToManyField('PaymentCard',  blank=True, related_name='+')
	externalAccounts = models.ManyToManyField('ExternalAccount',  blank=True, related_name='+')
	fundsTransfers = models.ManyToManyField('FundsTransfer',  blank=True, related_name='+')
	disputes = models.ManyToManyField('Dispute',  blank=True, related_name='+')
	kycProfiles = models.ManyToManyField('KycProfile',  blank=True, related_name='+')
	consents = models.ManyToManyField('Consent',  blank=True, related_name='+')
	customerType = models.CharField(max_length=64, null=True, choices=[(tag.name, tag.value) for tag in CustomerType])
	riskRating = models.CharField(max_length=64, null=True, choices=[(tag.name, tag.value) for tag in RiskRating])
	kycStatus = models.CharField(max_length=64, null=True, choices=[(tag.name, tag.value) for tag in KycStatus])

#======================================================================
# function declarations
#======================================================================
	def toString(self):
		str = ""
		str = str + self.street
		str = str + self.city
		str = str + self.state
		str = str + self.postalCode
		str = str + self.country
		return str;
    
	def __str__(self):
		return self.toString();

	def identity(self):
		return "Customer";
    
	def objectType(self):
		return "Customer";
