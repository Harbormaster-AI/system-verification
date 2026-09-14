from django.db import models
from demo.models.AccountType import AccountType
from demo.models.AccountOwnershipType import AccountOwnershipType
from demo.models.AccountStatus import AccountStatus

#======================================================================
# 
# Encapsulates data for model Account
#
# @author your_name_here
#
#======================================================================

#======================================================================
# Class Account Declaration
#======================================================================
class Account (models.Model):

#======================================================================
# attribute declarations
#======================================================================
	accountNumber = AccountNumber
	iban = IBAN
	accountName = models.CharField(max_length=200, null=True)
	currency = models.CharField(max_length=200, null=True)
	openedOn = models.DateField(null=True)
	closedOn = models.DateField(null=True)
	bank = models.ForeignKey('Bank', on_delete=models.CASCADE, null=True, blank=True, related_name='+')
	branch = models.ForeignKey('Branch', on_delete=models.CASCADE, null=True, blank=True, related_name='+')
	product = models.ForeignKey('BankingProduct', on_delete=models.CASCADE, null=True, blank=True, related_name='+')
	owners = models.ManyToManyField('Customer',  blank=True, related_name='+')
	transactions = models.ManyToManyField('Transaction',  blank=True, related_name='+')
	statements = models.ManyToManyField('AccountStatement',  blank=True, related_name='+')
	standingInstructions = models.ManyToManyField('StandingInstruction',  blank=True, related_name='+')
	feeCharges = models.ManyToManyField('FeeCharge',  blank=True, related_name='+')
	accountType = models.CharField(max_length=64, null=True, choices=[(tag.name, tag.value) for tag in AccountType])
	ownershipType = models.CharField(max_length=64, null=True, choices=[(tag.name, tag.value) for tag in AccountOwnershipType])
	status = models.CharField(max_length=64, null=True, choices=[(tag.name, tag.value) for tag in AccountStatus])

#======================================================================
# function declarations
#======================================================================
	def toString(self):
		str = ""
		str = str + self.accountNumber
		str = str + self.iban
		str = str + self.accountName
		str = str + self.currency
		str = str + self.openedOn
		str = str + self.closedOn
		str = str + self.accountType
		str = str + self.ownershipType
		str = str + self.status
		return str;
    
	def __str__(self):
		return self.toString();

	def identity(self):
		return "Account";
    
	def objectType(self):
		return "Account";
