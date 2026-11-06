from django.test import TestCase

from demo.models.Bank import Bank
from demo.delegates.BankDelegate import BankDelegate


# ======================================================================
#
# Encapsulates data for model Bank
#
# @author your_name_here
#
# ======================================================================


# ======================================================================
# Class BankTest Declaration
# ======================================================================
class BankTest(TestCase):
    def test_crud(self):
        bank = Bank()
        bank.name = "default name field value"
        bank.legalName = "default legalName field value"
        bank.swiftBic = "default swiftBic field value"
        bank.headquartersCountry = "default headquartersCountry field value"
        bank.website = "default website field value"

        delegate = BankDelegate()
        response_obj = delegate.create(bank)

        self.assertEqual(response_obj, delegate.get(response_obj.id))

        all_obj = delegate.getAll()
        self.assertEqual(all_obj.count(), 1)
        delegate.delete(response_obj.id)

        all_obj = delegate.getAll()
        self.assertEqual(all_obj.count(), 0)
