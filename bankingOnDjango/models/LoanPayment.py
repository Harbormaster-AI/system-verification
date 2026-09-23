
from django.db import models
from bankingOnDjango.models.PaymentMethod import PaymentMethod
from bankingOnDjango.models.PaymentStatus import PaymentStatus

#======================================================================
# Class LoanPayment Declaration
#======================================================================
class LoanPayment (models.Model):

#======================================================================
# attribute declarations
#======================================================================
	paymentReference = models.CharField(max_length=200, null=True)
	amountAmount = models.CharField(max_length=64, null=True)
	amountCurrency = models.CharField(max_length=200, null=True)
	paymentDate = models.DateField(null=True)
	loanAccount = models.ForeignKey('LoanAccount', on_delete=models.CASCADE, null=True, blank=True, related_name='+')
	transaction = models.ForeignKey('Transaction', on_delete=models.CASCADE, null=True, blank=True, related_name='+')
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
		return "LoanPayment";
    
	def objectType(self):
		return "LoanPayment";
