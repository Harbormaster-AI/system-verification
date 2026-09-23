import datetime

from django.test import TestCase
from django.utils import timezone
from bankingOnDjango.models.IdentityDocument import IdentityDocument
from bankingOnDjango.delegates.IdentityDocumentDelegate import IdentityDocumentDelegate

# ======================================================================
#
# Encapsulates data for model IdentityDocument
#
# @author Harbormaster Dev Team
#
# ======================================================================


# ======================================================================
# Class IdentityDocumentTest Declaration
# ======================================================================
class IdentityDocumentTest(TestCase):
    def test_crud(self):
        identity_document = IdentityDocument()
        identity_document.documentNumber = "default documentNumber field value"
        identity_document.issuingCountry = "default issuingCountry field value"
        identity_document.expirationDate = datetime.datetime.now()
        identity_document.documentType = "default documentType field value"

        delegate = IdentityDocumentDelegate()
        response_obj = delegate.create(identity_document)

        self.assertEqual(response_obj, delegate.get(response_obj.id))

        all_obj = delegate.getAll()
        self.assertEqual(all_obj.count(), 1)
        delegate.delete(response_obj.id)

        all_obj = delegate.getAll()
        self.assertEqual(all_obj.count(), 0)
