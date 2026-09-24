from django.test import TestCase

from bankingOnDjango.models.Customer import Customer
from bankingOnDjango.delegates.CustomerDelegate import CustomerDelegate

# ======================================================================
#
# Encapsulates data for model Customer
#
# @author Harbormaster Dev Team
#
# ======================================================================


# ======================================================================
# Class CustomerTest Declaration
# ======================================================================
class CustomerTest(TestCase):
    def test_crud(self):
        customer = Customer()
        customer.firstName = "default firstName field value"
        customer.lastName = "default lastName field value"
        customer.legalName = "default legalName field value"
        customer.dateOfBirth = datetime.datetime.now()
        customer.taxId = "default taxId field value"
        customer.email = "default email field value"
        customer.phone = "default phone field value"
        customer.address = "default address field value"
        customer.customerType = "default customerType field value"
        customer.riskRating = "default riskRating field value"
        customer.kycStatus = "default kycStatus field value"

        delegate = CustomerDelegate()
        response_obj = delegate.create(customer)

        self.assertEqual(response_obj, delegate.get(response_obj.id))

        all_obj = delegate.getAll()
        self.assertEqual(all_obj.count(), 1)
        delegate.delete(response_obj.id)

        all_obj = delegate.getAll()
        self.assertEqual(all_obj.count(), 0)
