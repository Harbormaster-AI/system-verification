
from django.db import models
from bankingOnDjango.models.LoanType import LoanType
from bankingOnDjango.models.RateType import RateType
from bankingOnDjango.models.InterestCompounding import InterestCompounding
from bankingOnDjango.models.LoanStatus import LoanStatus

#======================================================================
# Class LoanAccount Declaration
#======================================================================
class LoanAccount (models.Model):

#======================================================================
# attribute declarations
#======================================================================
	loan_number = models.CharField(max_length=200, null=True)
	principal_amount_amount = models.CharField(max_length=64, null=True)
	principal_amount_currency = models.CharField(max_length=200, null=True)
	outstanding_principal_amount = models.CharField(max_length=64, null=True)
	outstanding_principal_currency = models.CharField(max_length=200, null=True)
	interest_rate_value = models.CharField(max_length=64, null=True)
	origination_date = models.DateField(null=True)
	maturity_date = models.DateField(null=True)
	payment_day_of_month = models.IntegerField(null=True)
	currency = models.CharField(max_length=200, null=True)
	bank = models.ForeignKey('Bank', on_delete=models.CASCADE, null=True, blank=True, related_name='+')
	branch = models.ForeignKey('Branch', on_delete=models.CASCADE, null=True, blank=True, related_name='+')
	product = models.ForeignKey('BankingProduct', on_delete=models.CASCADE, null=True, blank=True, related_name='+')
	borrowers = models.ManyToManyField('Customer',  blank=True, related_name='+')
	repayment_schedule = models.ManyToManyField('RepaymentSchedule',  blank=True, related_name='+')
	payments = models.ManyToManyField('LoanPayment',  blank=True, related_name='+')
	collateral = models.ManyToManyField('Collateral',  blank=True, related_name='+')
	fee_charges = models.ManyToManyField('FeeCharge',  blank=True, related_name='+')
	loan_type = models.CharField(max_length=64, null=True, choices=[(tag.name, tag.value) for tag in LoanType])
	rate_type = models.CharField(max_length=64, null=True, choices=[(tag.name, tag.value) for tag in RateType])
	compounding = models.CharField(max_length=64, null=True, choices=[(tag.name, tag.value) for tag in InterestCompounding])
	status = models.CharField(max_length=64, null=True, choices=[(tag.name, tag.value) for tag in LoanStatus])

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
		return "LoanAccount";
    
	def objectType(self):
		return "LoanAccount";
