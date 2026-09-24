from django.test import TestCase

from bankingOnDjango.models.Dispute import Dispute
from bankingOnDjango.delegates.DisputeDelegate import DisputeDelegate

# ======================================================================
#
# Encapsulates data for model Dispute
#
# @author Harbormaster Dev Team
#
# ======================================================================


# ======================================================================
# Class DisputeTest Declaration
# ======================================================================
class DisputeTest(TestCase):
    def test_crud(self):
        dispute = Dispute()
        dispute.disputeReference = "default disputeReference field value"
        dispute.raisedOn = datetime.datetime.now()
        dispute.reason = "default reason field value"
        dispute.status = "default status field value"

        delegate = DisputeDelegate()
        response_obj = delegate.create(dispute)

        self.assertEqual(response_obj, delegate.get(response_obj.id))

        all_obj = delegate.getAll()
        self.assertEqual(all_obj.count(), 1)
        delegate.delete(response_obj.id)

        all_obj = delegate.getAll()
        self.assertEqual(all_obj.count(), 0)
