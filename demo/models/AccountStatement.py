from django.db import models
from demo.models.StatementDeliveryMethod import StatementDeliveryMethod

#======================================================================
# 
# Encapsulates data for model AccountStatement
#
# @author your_name_here
#
#======================================================================

#======================================================================
# Class AccountStatement Declaration
#======================================================================
class AccountStatement (models.Model):

#======================================================================
# attribute declarations
#======================================================================
	statementNumber = models.CharField(max_length=200, null=True)
	periodStart = models.DateField(null=True)
	periodEnd = models.DateField(null=True)
	openingBalance = Money
	closingBalance = Money
	account = models.ForeignKey('Account', on_delete=models.CASCADE, null=True, blank=True, related_name='+')
	deliveryMethod = models.CharField(max_length=64, null=True, choices=[(tag.name, tag.value) for tag in StatementDeliveryMethod])

#======================================================================
# function declarations
#======================================================================
	def toString(self):
		str = ""
		str = str + self.statementNumber
		str = str + self.periodStart
		str = str + self.periodEnd
		str = str + self.openingBalance
		str = str + self.closingBalance
		str = str + self.deliveryMethod
		return str;
    
	def __str__(self):
		return self.toString();

	def identity(self):
		return "AccountStatement";
    
	def objectType(self):
		return "AccountStatement";
