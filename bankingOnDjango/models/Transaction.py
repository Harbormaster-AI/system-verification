from django.db import models
from bankingOnDjango.models.TransactionDirection import TransactionDirection
from bankingOnDjango.models.TransactionType import TransactionType
from bankingOnDjango.models.TransactionStatus import TransactionStatus
from bankingOnDjango.models.ChannelType import ChannelType


# ======================================================================
# Class Transaction Declaration
# ======================================================================
class Transaction(models.Model):

    # ======================================================================
    # attribute declarations
    # ======================================================================
    booking_date = models.DateField(null=True)
    value_date = models.DateField(null=True)
    amount_amount = models.CharField(max_length=64, null=True)
    amount_currency = models.CharField(max_length=200, null=True)
    description = models.CharField(max_length=200, null=True)
    account = models.ForeignKey(
        "Account", on_delete=models.CASCADE, null=True, blank=True, related_name="+"
    )
    external_counterparty = models.ForeignKey(
        "ExternalAccount",
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name="+",
    )
    payment_card = models.ForeignKey(
        "PaymentCard", on_delete=models.CASCADE, null=True, blank=True, related_name="+"
    )
    funds_transfer = models.ForeignKey(
        "FundsTransfer",
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name="+",
    )
    fx_trade = models.ForeignKey(
        "FXTrade", on_delete=models.CASCADE, null=True, blank=True, related_name="+"
    )
    dispute = models.OneToOneField(
        "Dispute", on_delete=models.CASCADE, null=True, blank=True, related_name="+"
    )
    direction = models.CharField(
        max_length=64,
        null=True,
        choices=[(tag.name, tag.value) for tag in TransactionDirection],
    )
    transaction_type = models.CharField(
        max_length=64,
        null=True,
        choices=[(tag.name, tag.value) for tag in TransactionType],
    )
    status = models.CharField(
        max_length=64,
        null=True,
        choices=[(tag.name, tag.value) for tag in TransactionStatus],
    )
    channel = models.CharField(
        max_length=64, null=True, choices=[(tag.name, tag.value) for tag in ChannelType]
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
        return "Transaction"

    def objectType(self):
        return "Transaction"
