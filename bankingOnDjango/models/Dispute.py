from django.db import models
from bankingOnDjango.models.DisputeStatus import DisputeStatus


# ======================================================================
# Class Dispute Declaration
# ======================================================================
class Dispute(models.Model):

    # ======================================================================
    # attribute declarations
    # ======================================================================
    dispute_reference = models.CharField(max_length=200, null=True)
    raised_on = models.DateField(null=True)
    reason = models.CharField(max_length=200, null=True)
    transaction = models.ForeignKey(
        "Transaction", on_delete=models.CASCADE, null=True, blank=True, related_name="+"
    )
    customer = models.ForeignKey(
        "Customer", on_delete=models.CASCADE, null=True, blank=True, related_name="+"
    )
    account = models.ForeignKey(
        "Account", on_delete=models.CASCADE, null=True, blank=True, related_name="+"
    )
    payment_card = models.ForeignKey(
        "PaymentCard", on_delete=models.CASCADE, null=True, blank=True, related_name="+"
    )
    status = models.CharField(
        max_length=64,
        null=True,
        choices=[(tag.name, tag.value) for tag in DisputeStatus],
    )

    # ======================================================================
    # function declarations
    # ======================================================================
    def toString(self):
        str = ""
        str = str + self.disputeReference
        str = str + self.raisedOn
        str = str + self.reason
        str = str + self.status
        return str

    def __str__(self):
        return self.toString()

    def identity(self):
        return "Dispute"

    def objectType(self):
        return "Dispute"
