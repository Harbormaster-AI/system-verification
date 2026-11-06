from django.test import TestCase

from demo.models.Branch import Branch
from demo.delegates.BranchDelegate import BranchDelegate


# ======================================================================
#
# Encapsulates data for model Branch
#
# @author your_name_here
#
# ======================================================================


# ======================================================================
# Class BranchTest Declaration
# ======================================================================
class BranchTest(TestCase):
    def test_crud(self):
        branch = Branch()
        branch.name = "default name field value"
        branch.branchCode = "default branchCode field value"
        branch.address = "default address field value"
        branch.phone = "default phone field value"
        branch.openingHours = "default openingHours field value"

        delegate = BranchDelegate()
        response_obj = delegate.create(branch)

        self.assertEqual(response_obj, delegate.get(response_obj.id))

        all_obj = delegate.getAll()
        self.assertEqual(all_obj.count(), 1)
        delegate.delete(response_obj.id)

        all_obj = delegate.getAll()
        self.assertEqual(all_obj.count(), 0)
