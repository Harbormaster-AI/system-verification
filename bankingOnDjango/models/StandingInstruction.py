from django.db import models
from bankingOnDjango.models.StandingInstructionFrequency import (
    StandingInstructionFrequency,
)
from bankingOnDjango.models.StandingInstructionStatus import StandingInstructionStatus


# ======================================================================
# Class StandingInstruction Declaration
# ======================================================================
class StandingInstruction(models.Model):

    # ======================================================================
    # attribute declarations
    # ======================================================================
    instruction_id = models.CharField(max_length=200, null=True)
    amount_amount = models.CharField(max_length=64, null=True)
    amount_currency = models.CharField(max_length=200, null=True)
    next_execution_date = models.DateField(null=True)
    account = models.ForeignKey(
        "Account", on_delete=models.CASCADE, null=True, blank=True, related_name="+"
    )
    beneficiary = models.ForeignKey(
        "ExternalAccount",
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name="+",
    )
    frequency = models.CharField(
        max_length=64,
        null=True,
        choices=[(tag.name, tag.value) for tag in StandingInstructionFrequency],
    )
    status = models.CharField(
        max_length=64,
        null=True,
        choices=[(tag.name, tag.value) for tag in StandingInstructionStatus],
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
        return "StandingInstruction"

    def objectType(self):
        return "StandingInstruction"
