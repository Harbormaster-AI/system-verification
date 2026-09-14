from django.db import models

#======================================================================
# 
# Encapsulates data for model Bank
#
# @author your_name_here
#
#======================================================================

#======================================================================
# Class Bank Declaration
#======================================================================
class Bank (models.Model):

#======================================================================
# attribute declarations
#======================================================================
	name = models.CharField(max_length=200, null=True)
	legalName = models.CharField(max_length=200, null=True)
	swiftBic = BIC
	headquartersCountry = models.CharField(max_length=200, null=True)
	website = models.CharField(max_length=200, null=True)
	branches = models.ManyToManyField('Branch',  blank=True, related_name='+')
	products = models.ManyToManyField('BankingProduct',  blank=True, related_name='+')
	customers = models.ManyToManyField('Customer',  blank=True, related_name='+')
	accounts = models.ManyToManyField('Account',  blank=True, related_name='+')
	paymentCards = models.ManyToManyField('PaymentCard',  blank=True, related_name='+')
	loanAccounts = models.ManyToManyField('LoanAccount',  blank=True, related_name='+')
	exchangeRates = models.ManyToManyField('ExchangeRate',  blank=True, related_name='+')
	consents = models.ManyToManyField('Consent',  blank=True, related_name='+')
	thirdPartyProviders = models.ManyToManyField('ThirdPartyProvider',  blank=True, related_name='+')

#======================================================================
# function declarations
#======================================================================
	def toString(self):
		str = ""
		str = str + self.name
		str = str + self.legalName
		str = str + self.swiftBic
		str = str + self.headquartersCountry
		str = str + self.website
		return str;
    
	def __str__(self):
		return self.toString();

	def identity(self):
		return "Bank";
    
	def objectType(self):
		return "Bank";
