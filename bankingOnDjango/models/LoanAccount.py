
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
	loanNumber = models.CharField(max_length=200, null=True)
	principalAmountAmount = models.CharField(max_length=64, null=True)
	principalAmountCurrency = models.CharField(max_length=200, null=True)
	outstandingPrincipalAmount = models.CharField(max_length=64, null=True)
	outstandingPrincipalCurrency = models.CharField(max_length=200, null=True)
	interestRateValue = models.CharField(max_length=64, null=True)
	originationDate = models.DateField(null=True)
	maturityDate = models.DateField(null=True)
	paymentDayOfMonth = models.IntegerField(null=True)
	currency = models.CharField(max_length=200, null=True)
	bank = models.ForeignKey('Bank', on_delete=models.CASCADE, null=True, blank=True, related_name='+')
	branch = models.ForeignKey('Branch', on_delete=models.CASCADE, null=True, blank=True, related_name='+')
	product = models.ForeignKey('BankingProduct', on_delete=models.CASCADE, null=True, blank=True, related_name='+')
	borrowers = models.ManyToManyField('Customer',  blank=True, related_name='+')
	repaymentSchedule = models.ManyToManyField('RepaymentSchedule',  blank=True, related_name='+')
	payments = models.ManyToManyField('LoanPayment',  blank=True, related_name='+')
	collateral = models.ManyToManyField('Collateral',  blank=True, related_name='+')
	feeCharges = models.ManyToManyField('FeeCharge',  blank=True, related_name='+')
	loanType = models.CharField(max_length=64, null=True, choices=[(tag.name, tag.value) for tag in LoanType])
	rateType = models.CharField(max_length=64, null=True, choices=[(tag.name, tag.value) for tag in RateType])
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
