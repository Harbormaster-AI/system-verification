from django.db import models

#======================================================================
# 
# Encapsulates data for model ExternalAccount
#
# @author your_name_here
#
#======================================================================

#======================================================================
# Class ExternalAccount Declaration
#======================================================================
class ExternalAccount (models.Model):

#======================================================================
# attribute declarations
#======================================================================
	name = models.CharField(max_length=200, null=True)
	iban = IBAN
	accountNumber = AccountNumber
	bic = BIC
	bankName = models.CharField(max_length=200, null=True)
	country = models.CharField(max_length=200, null=True)
	customer = models.ForeignKey('Customer', on_delete=models.CASCADE, null=True, blank=True, related_name='+')
	transactions = models.ManyToManyField('Transaction',  blank=True, related_name='+')

#======================================================================
# function declarations
#======================================================================
	def toString(self):
		str = ""
		str = str + self.name
		str = str + self.iban
		str = str + self.accountNumber
		str = str + self.bic
		str = str + self.bankName
		str = str + self.country
		return str;
    
	def __str__(self):
		return self.toString();

	def identity(self):
		return "ExternalAccount";
    
	def objectType(self):
		return "ExternalAccount";
