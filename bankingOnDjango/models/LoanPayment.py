from django.db import models
from bankingOnDjango.models.PaymentMethod import PaymentMethod
from bankingOnDjango.models.PaymentStatus import PaymentStatus


# ======================================================================
# Class LoanPayment Declaration
# ======================================================================
class LoanPayment(models.Model):

    # ======================================================================
    # attribute declarations
    # ======================================================================
    payment_reference = models.CharField(max_length=200, null=True)
    amount_amount = models.CharField(max_length=64, null=True)
    amount_currency = models.CharField(max_length=200, null=True)
    payment_date = models.DateField(null=True)
    loan_account = models.ForeignKey(
        "LoanAccount", on_delete=models.CASCADE, null=True, blank=True, related_name="+"
    )
    transaction = models.ForeignKey(
        "Transaction", on_delete=models.CASCADE, null=True, blank=True, related_name="+"
    )
    method = models.CharField(
        max_length=64,
        null=True,
        choices=[(tag.name, tag.value) for tag in PaymentMethod],
    )
    status = models.CharField(
        max_length=64,
        null=True,
        choices=[(tag.name, tag.value) for tag in PaymentStatus],
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
        return "LoanPayment"

    def objectType(self):
        return "LoanPayment"
