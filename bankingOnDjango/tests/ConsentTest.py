from django.test import TestCase

from bankingOnDjango.models.Consent import Consent
from bankingOnDjango.delegates.ConsentDelegate import ConsentDelegate

# ======================================================================
#
# Encapsulates data for model Consent
#
# @author Harbormaster Dev Team
#
# ======================================================================


# ======================================================================
# Class ConsentTest Declaration
# ======================================================================
class ConsentTest(TestCase):
    def test_crud(self):
        consent = Consent()
        consent.grantedOn = datetime.datetime.now()
        consent.expiresOn = datetime.datetime.now()
        consent.consentType = "default consentType field value"
        consent.status = "default status field value"

        delegate = ConsentDelegate()
        response_obj = delegate.create(consent)

        self.assertEqual(response_obj, delegate.get(response_obj.id))

        all_obj = delegate.getAll()
        self.assertEqual(all_obj.count(), 1)
        delegate.delete(response_obj.id)

        all_obj = delegate.getAll()
        self.assertEqual(all_obj.count(), 0)
