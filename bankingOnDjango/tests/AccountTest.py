from django.test import TestCase

from bankingOnDjango.models.Account import Account
from bankingOnDjango.delegates.AccountDelegate import AccountDelegate


# ======================================================================
#
# Encapsulates data for model Account
#
# @author Harbormaster Dev Team
#
# ======================================================================


# ======================================================================
# Class AccountTest Declaration
# ======================================================================
class AccountTest(TestCase):
    def test_crud(self):
        account = Account()
        account.accountNumber = "default accountNumber field value"
        account.iban = "default iban field value"
        account.accountName = "default accountName field value"
        account.currency = "default currency field value"
        account.openedOn = datetime.datetime.now()
        account.closedOn = datetime.datetime.now()
        account.accountType = "default accountType field value"
        account.ownershipType = "default ownershipType field value"
        account.status = "default status field value"

        delegate = AccountDelegate()
        response_obj = delegate.create(account)

        self.assertEqual(response_obj, delegate.get(response_obj.id))

        all_obj = delegate.getAll()
        self.assertEqual(all_obj.count(), 1)
        delegate.delete(response_obj.id)

        all_obj = delegate.getAll()
        self.assertEqual(all_obj.count(), 0)
