from django.db import models
from bankingOnDjango.models.ConsentType import ConsentType
from bankingOnDjango.models.ConsentStatus import ConsentStatus


# ======================================================================
# Class Consent Declaration
# ======================================================================
class Consent(models.Model):

    # ======================================================================
    # attribute declarations
    # ======================================================================
    granted_on = models.DateField(null=True)
    expires_on = models.DateField(null=True)
    customer = models.ForeignKey(
        "Customer", on_delete=models.CASCADE, null=True, blank=True, related_name="+"
    )
    bank = models.ForeignKey(
        "Bank", on_delete=models.CASCADE, null=True, blank=True, related_name="+"
    )
    authorized_accounts = models.ManyToManyField(
        "Account", blank=True, related_name="+"
    )
    third_party_provider = models.ForeignKey(
        "ThirdPartyProvider",
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name="+",
    )
    consent_type = models.CharField(
        max_length=64, null=True, choices=[(tag.name, tag.value) for tag in ConsentType]
    )
    status = models.CharField(
        max_length=64,
        null=True,
        choices=[(tag.name, tag.value) for tag in ConsentStatus],
    )

    # ======================================================================
    # function declarations
    # ======================================================================
    def toString(self):
        str = ""
        str = str + self.grantedOn
        str = str + self.expiresOn
        str = str + self.consentType
        str = str + self.status
        return str

    def __str__(self):
        return self.toString()

    def identity(self):
        return "Consent"

    def objectType(self):
        return "Consent"
