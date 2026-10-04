from django.db import models
from bankingOnDjango.models.FeeType import FeeType


# ======================================================================
# Class FeeCharge Declaration
# ======================================================================
class FeeCharge(models.Model):

    # ======================================================================
    # attribute declarations
    # ======================================================================
    fee_code = models.CharField(max_length=200, null=True)
    amount_amount = models.CharField(max_length=64, null=True)
    amount_currency = models.CharField(max_length=200, null=True)
    applied_on = models.DateField(null=True)
    account = models.ForeignKey(
        "Account", on_delete=models.CASCADE, null=True, blank=True, related_name="+"
    )
    loan_account = models.ForeignKey(
        "LoanAccount", on_delete=models.CASCADE, null=True, blank=True, related_name="+"
    )
    fee_type = models.CharField(
        max_length=64, null=True, choices=[(tag.name, tag.value) for tag in FeeType]
    )

    # ======================================================================
    # function declarations
    # ======================================================================
    def toString(self):
        str = ""
        str = str + self.amount
        str = str + self.currency
        return str

    def __str__(self):
        return self.toString()

    def identity(self):
        return "FeeCharge"

    def objectType(self):
        return "FeeCharge"
