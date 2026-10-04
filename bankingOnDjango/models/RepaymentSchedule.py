
from django.db import models
from bankingOnDjango.models.InstallmentStatus import InstallmentStatus

#======================================================================
# Class RepaymentSchedule Declaration
#======================================================================
class RepaymentSchedule (models.Model):

#======================================================================
# attribute declarations
#======================================================================
	installment_number = models.IntegerField(null=True)
	due_date = models.DateField(null=True)
	principal_due_amount = models.CharField(max_length=64, null=True)
	principal_due_currency = models.CharField(max_length=200, null=True)
	interest_due_amount = models.CharField(max_length=64, null=True)
	interest_due_currency = models.CharField(max_length=200, null=True)
	total_due_amount = models.CharField(max_length=64, null=True)
	total_due_currency = models.CharField(max_length=200, null=True)
	loan_account = models.ForeignKey('LoanAccount', on_delete=models.CASCADE, null=True, blank=True, related_name='+')
	payment = models.ForeignKey('LoanPayment', on_delete=models.CASCADE, null=True, blank=True, related_name='+')
	status = models.CharField(max_length=64, null=True, choices=[(tag.name, tag.value) for tag in InstallmentStatus])

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
		return "RepaymentSchedule";
    
	def objectType(self):
		return "RepaymentSchedule";
