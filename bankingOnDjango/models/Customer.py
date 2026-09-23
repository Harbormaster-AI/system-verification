from django.db import models
from bankingOnDjango.models.CustomerType import CustomerType
from bankingOnDjango.models.RiskRating import RiskRating
from bankingOnDjango.models.KycStatus import KycStatus


# ======================================================================
# Class Customer Declaration
# ======================================================================
class Customer(models.Model):

    # ======================================================================
    # attribute declarations
    # ======================================================================
    first_name = models.CharField(max_length=200, null=True)
    last_name = models.CharField(max_length=200, null=True)
    legal_name = models.CharField(max_length=200, null=True)
    date_of_birth = models.DateField(null=True)
    tax_id = models.CharField(max_length=200, null=True)
    email = models.CharField(max_length=200, null=True)
    phone = models.CharField(max_length=200, null=True)
    address_street = models.CharField(max_length=200, null=True)
    address_city = models.CharField(max_length=200, null=True)
    address_state = models.CharField(max_length=200, null=True)
    address_postal_code = models.CharField(max_length=200, null=True)
    address_country = models.CharField(max_length=200, null=True)
    bank = models.ForeignKey(
        "Bank", on_delete=models.CASCADE, null=True, blank=True, related_name="+"
    )
    accounts = models.ManyToManyField("Account", blank=True, related_name="+")
    loan_accounts = models.ManyToManyField("LoanAccount", blank=True, related_name="+")
    payment_cards = models.ManyToManyField("PaymentCard", blank=True, related_name="+")
    external_accounts = models.ManyToManyField(
        "ExternalAccount", blank=True, related_name="+"
    )
    funds_transfers = models.ManyToManyField(
        "FundsTransfer", blank=True, related_name="+"
    )
    disputes = models.ManyToManyField("Dispute", blank=True, related_name="+")
    kyc_profiles = models.ManyToManyField("KycProfile", blank=True, related_name="+")
    consents = models.ManyToManyField("Consent", blank=True, related_name="+")
    customer_type = models.CharField(
        max_length=64,
        null=True,
        choices=[(tag.name, tag.value) for tag in CustomerType],
    )
    risk_rating = models.CharField(
        max_length=64, null=True, choices=[(tag.name, tag.value) for tag in RiskRating]
    )
    kyc_status = models.CharField(
        max_length=64, null=True, choices=[(tag.name, tag.value) for tag in KycStatus]
    )

    # ======================================================================
    # function declarations
    # ======================================================================
    def toString(self):
        str = ""
        str = str + self.street
        str = str + self.city
        str = str + self.state
        str = str + self.postalCode
        str = str + self.country
        return str

    def __str__(self):
        return self.toString()

    def identity(self):
        return "Customer"

    def objectType(self):
        return "Customer"
