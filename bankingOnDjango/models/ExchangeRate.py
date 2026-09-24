from django.db import models


# ======================================================================
# Class ExchangeRate Declaration
# ======================================================================
class ExchangeRate(models.Model):

    # ======================================================================
    # attribute declarations
    # ======================================================================
    base_currency = models.CharField(max_length=200, null=True)
    counter_currency = models.CharField(max_length=200, null=True)
    rate = models.CharField(max_length=64, null=True)
    as_of = models.DateField(null=True)
    source = models.CharField(max_length=200, null=True)
    bank = models.ForeignKey(
        "Bank", on_delete=models.CASCADE, null=True, blank=True, related_name="+"
    )
    fx_trades = models.ManyToManyField("FXTrade", blank=True, related_name="+")

    # ======================================================================
    # function declarations
    # ======================================================================
    def toString(self):
        str = ""
        str = str + self.baseCurrency
        str = str + self.counterCurrency
        str = str + self.rate
        str = str + self.asOf
        str = str + self.source
        return str

    def __str__(self):
        return self.toString()

    def identity(self):
        return "ExchangeRate"

    def objectType(self):
        return "ExchangeRate"
