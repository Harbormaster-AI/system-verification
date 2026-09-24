from django.test import TestCase

from bankingOnDjango.models.Collateral import Collateral
from bankingOnDjango.delegates.CollateralDelegate import CollateralDelegate

# ======================================================================
#
# Encapsulates data for model Collateral
#
# @author Harbormaster Dev Team
#
# ======================================================================


# ======================================================================
# Class CollateralTest Declaration
# ======================================================================
class CollateralTest(TestCase):
    def test_crud(self):
        collateral = Collateral()
        collateral.collateralIdentifier = "default collateralIdentifier field value"
        collateral.appraisedValue = "default appraisedValue field value"
        collateral.description = "default description field value"
        collateral.location = "default location field value"
        collateral.collateralType = "default collateralType field value"

        delegate = CollateralDelegate()
        response_obj = delegate.create(collateral)

        self.assertEqual(response_obj, delegate.get(response_obj.id))

        all_obj = delegate.getAll()
        self.assertEqual(all_obj.count(), 1)
        delegate.delete(response_obj.id)

        all_obj = delegate.getAll()
        self.assertEqual(all_obj.count(), 0)
