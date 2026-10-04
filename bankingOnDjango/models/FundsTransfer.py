from django.db import models
from bankingOnDjango.models.PaymentMethod import PaymentMethod
from bankingOnDjango.models.PaymentStatus import PaymentStatus


# ======================================================================
# Class FundsTransfer Declaration
# ======================================================================
class FundsTransfer(models.Model):

    # ======================================================================
    # attribute declarations
    # ======================================================================
    transfer_reference = models.CharField(max_length=200, null=True)
    amount_amount = models.CharField(max_length=64, null=True)
    amount_currency = models.CharField(max_length=200, null=True)
    requested_date = models.DateField(null=True)
    execution_date = models.DateField(null=True)
    purpose = models.CharField(max_length=200, null=True)
    fee_amount_amount = models.CharField(max_length=64, null=True)
    fee_amount_currency = models.CharField(max_length=200, null=True)
    source_account = models.ForeignKey(
        "Account", on_delete=models.CASCADE, null=True, blank=True, related_name="+"
    )
    destination_account = models.ForeignKey(
        "Account", on_delete=models.CASCADE, null=True, blank=True, related_name="+"
    )
    external_beneficiary = models.ForeignKey(
        "ExternalAccount",
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name="+",
    )
    initiated_by = models.ForeignKey(
        "Customer", on_delete=models.CASCADE, null=True, blank=True, related_name="+"
    )
    transactions = models.ManyToManyField("Transaction", blank=True, related_name="+")
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
        return "FundsTransfer"

    def objectType(self):
        return "FundsTransfer"
