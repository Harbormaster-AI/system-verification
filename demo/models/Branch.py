from django.db import models

#======================================================================
# 
# Encapsulates data for model Branch
#
# @author your_name_here
#
#======================================================================

#======================================================================
# Class Branch Declaration
#======================================================================
class Branch (models.Model):

#======================================================================
# attribute declarations
#======================================================================
	name = models.CharField(max_length=200, null=True)
	branchCode = models.CharField(max_length=200, null=True)
	address = Address
	phone = models.CharField(max_length=200, null=True)
	openingHours = models.CharField(max_length=200, null=True)
	bank = models.ForeignKey('Bank', on_delete=models.CASCADE, null=True, blank=True, related_name='+')
	accounts = models.ManyToManyField('Account',  blank=True, related_name='+')
	loanAccounts = models.ManyToManyField('LoanAccount',  blank=True, related_name='+')
	atms = models.ManyToManyField('ATM',  blank=True, related_name='+')

#======================================================================
# function declarations
#======================================================================
	def toString(self):
		str = ""
		str = str + self.name
		str = str + self.branchCode
		str = str + self.address
		str = str + self.phone
		str = str + self.openingHours
		return str;
    
	def __str__(self):
		return self.toString();

	def identity(self):
		return "Branch";
    
	def objectType(self):
		return "Branch";
