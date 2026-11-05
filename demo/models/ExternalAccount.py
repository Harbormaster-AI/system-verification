from django.db import models


# ======================================================================
# Class ExternalAccount Declaration
# ======================================================================
class ExternalAccount(models.Model):

    # ======================================================================
    # attribute declarations
    # ======================================================================
    name = models.CharField(max_length=200, null=True)
    iban_value = models.CharField(max_length=200, null=True)
    account_number_value = models.CharField(max_length=200, null=True)
    bic_value = models.CharField(max_length=200, null=True)
    bank_name = models.CharField(max_length=200, null=True)
    country = models.CharField(max_length=200, null=True)
    customer = models.ForeignKey(
        "Customer", on_delete=models.CASCADE, null=True, blank=True, related_name="+"
    )
    transactions = models.ManyToManyField("Transaction", blank=True, related_name="+")

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
        return "ExternalAccount"

    def objectType(self):
        return "ExternalAccount"
