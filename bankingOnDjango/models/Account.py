from django.db import models
from bankingOnDjango.models.AccountType import AccountType
from bankingOnDjango.models.AccountOwnershipType import AccountOwnershipType
from bankingOnDjango.models.AccountStatus import AccountStatus


# ======================================================================
# Class Account Declaration
# ======================================================================
class Account(models.Model):

    # ======================================================================
    # attribute declarations
    # ======================================================================
    account_number_value = models.CharField(max_length=200, null=True)
    iban_value = models.CharField(max_length=200, null=True)
    account_name = models.CharField(max_length=200, null=True)
    currency = models.CharField(max_length=200, null=True)
    opened_on = models.DateField(null=True)
    closed_on = models.DateField(null=True)
    bank = models.ForeignKey(
        "Bank", on_delete=models.CASCADE, null=True, blank=True, related_name="+"
    )
    branch = models.ForeignKey(
        "Branch", on_delete=models.CASCADE, null=True, blank=True, related_name="+"
    )
    product = models.ForeignKey(
        "BankingProduct",
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name="+",
    )
    owners = models.ManyToManyField("Customer", blank=True, related_name="+")
    transactions = models.ManyToManyField("Transaction", blank=True, related_name="+")
    statements = models.ManyToManyField(
        "AccountStatement", blank=True, related_name="+"
    )
    standing_instructions = models.ManyToManyField(
        "StandingInstruction", blank=True, related_name="+"
    )
    fee_charges = models.ManyToManyField("FeeCharge", blank=True, related_name="+")
    account_type = models.CharField(
        max_length=64, null=True, choices=[(tag.name, tag.value) for tag in AccountType]
    )
    ownership_type = models.CharField(
        max_length=64,
        null=True,
        choices=[(tag.name, tag.value) for tag in AccountOwnershipType],
    )
    status = models.CharField(
        max_length=64,
        null=True,
        choices=[(tag.name, tag.value) for tag in AccountStatus],
    )

    # ======================================================================
    # function declarations
    # ======================================================================
    def toString(self):
        str = ""
        str = str + self.value
        return str

    def __str__(self):
        return self.toString()

    def identity(self):
        return "Account"

    def objectType(self):
        return "Account"
