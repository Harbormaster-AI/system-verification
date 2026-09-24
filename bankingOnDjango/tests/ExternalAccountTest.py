from django.test import TestCase

from bankingOnDjango.models.ExternalAccount import ExternalAccount
from bankingOnDjango.delegates.ExternalAccountDelegate import ExternalAccountDelegate


# ======================================================================
#
# Encapsulates data for model ExternalAccount
#
# @author Harbormaster Dev Team
#
# ======================================================================


# ======================================================================
# Class ExternalAccountTest Declaration
# ======================================================================
class ExternalAccountTest(TestCase):
    def test_crud(self):
        external_account = ExternalAccount()
        external_account.name = "default name field value"
        external_account.iban = "default iban field value"
        external_account.accountNumber = "default accountNumber field value"
        external_account.bic = "default bic field value"
        external_account.bankName = "default bankName field value"
        external_account.country = "default country field value"

        delegate = ExternalAccountDelegate()
        response_obj = delegate.create(external_account)

        self.assertEqual(response_obj, delegate.get(response_obj.id))

        all_obj = delegate.getAll()
        self.assertEqual(all_obj.count(), 1)
        delegate.delete(response_obj.id)

        all_obj = delegate.getAll()
        self.assertEqual(all_obj.count(), 0)
