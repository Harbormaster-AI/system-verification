
from django.db import models

#======================================================================
# Class Bank Declaration
#======================================================================
class Bank (models.Model):

#======================================================================
# attribute declarations
#======================================================================
	name = models.CharField(max_length=200, null=True)
	legal_name = models.CharField(max_length=200, null=True)
	swift_bic_value = models.CharField(max_length=200, null=True)
	headquarters_country = models.CharField(max_length=200, null=True)
	website = models.CharField(max_length=200, null=True)
	branches = models.ManyToManyField('Branch',  blank=True, related_name='+')
	products = models.ManyToManyField('BankingProduct',  blank=True, related_name='+')
	customers = models.ManyToManyField('Customer',  blank=True, related_name='+')
	accounts = models.ManyToManyField('Account',  blank=True, related_name='+')
	payment_cards = models.ManyToManyField('PaymentCard',  blank=True, related_name='+')
	loan_accounts = models.ManyToManyField('LoanAccount',  blank=True, related_name='+')
	exchange_rates = models.ManyToManyField('ExchangeRate',  blank=True, related_name='+')
	consents = models.ManyToManyField('Consent',  blank=True, related_name='+')
	third_party_providers = models.ManyToManyField('ThirdPartyProvider',  blank=True, related_name='+')

#======================================================================
# function declarations
#======================================================================
	def toString(self):
		str = ""
		str = str + self.value
		return str;
    
	def __str__(self):
		return self.toString();

	def identity(self):
		return "Bank";
    
	def objectType(self):
		return "Bank";
