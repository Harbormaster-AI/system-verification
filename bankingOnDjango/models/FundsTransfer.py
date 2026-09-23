
from django.db import models
from bankingOnDjango.models.PaymentMethod import PaymentMethod
from bankingOnDjango.models.PaymentStatus import PaymentStatus

#======================================================================
# Class FundsTransfer Declaration
#======================================================================
class FundsTransfer (models.Model):

#======================================================================
# attribute declarations
#======================================================================
	transferReference = models.CharField(max_length=200, null=True)
	amountAmount = models.CharField(max_length=64, null=True)
	amountCurrency = models.CharField(max_length=200, null=True)
	requestedDate = models.DateField(null=True)
	executionDate = models.DateField(null=True)
	purpose = models.CharField(max_length=200, null=True)
	feeAmountAmount = models.CharField(max_length=64, null=True)
	feeAmountCurrency = models.CharField(max_length=200, null=True)
	sourceAccount = models.ForeignKey('Account', on_delete=models.CASCADE, null=True, blank=True, related_name='+')
	destinationAccount = models.ForeignKey('Account', on_delete=models.CASCADE, null=True, blank=True, related_name='+')
	externalBeneficiary = models.ForeignKey('ExternalAccount', on_delete=models.CASCADE, null=True, blank=True, related_name='+')
	initiatedBy = models.ForeignKey('Customer', on_delete=models.CASCADE, null=True, blank=True, related_name='+')
	transactions = models.ManyToManyField('Transaction',  blank=True, related_name='+')
	method = models.CharField(max_length=64, null=True, choices=[(tag.name, tag.value) for tag in PaymentMethod])
	status = models.CharField(max_length=64, null=True, choices=[(tag.name, tag.value) for tag in PaymentStatus])

#======================================================================
# function declarations
#======================================================================
	def toString(self):
		str = ""
		str = str + self.amount
		str = str + self.currency
		return str;
    
	def __str__(self):
		return self.toString();

	def identity(self):
		return "FundsTransfer";
    
	def objectType(self):
		return "FundsTransfer";
