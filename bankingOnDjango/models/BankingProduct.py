from django.db import models
from bankingOnDjango.models.ProductCategory import ProductCategory


# ======================================================================
# Class BankingProduct Declaration
# ======================================================================
class BankingProduct(models.Model):

    # ======================================================================
    # attribute declarations
    # ======================================================================
    product_code = models.CharField(max_length=200, null=True)
    name = models.CharField(max_length=200, null=True)
    description = models.CharField(max_length=200, null=True)
    bank = models.ForeignKey(
        "Bank", on_delete=models.CASCADE, null=True, blank=True, related_name="+"
    )
    accounts = models.ManyToManyField("Account", blank=True, related_name="+")
    loan_accounts = models.ManyToManyField("LoanAccount", blank=True, related_name="+")
    payment_cards = models.ManyToManyField("PaymentCard", blank=True, related_name="+")
    product_category = models.CharField(
        max_length=64,
        null=True,
        choices=[(tag.name, tag.value) for tag in ProductCategory],
    )

    # ======================================================================
    # function declarations
    # ======================================================================
    def toString(self):
        str = ""
        str = str + self.productCode
        str = str + self.name
        str = str + self.description
        str = str + self.productCategory
        return str

    def __str__(self):
        return self.toString()

    def identity(self):
        return "BankingProduct"

    def objectType(self):
        return "BankingProduct"
