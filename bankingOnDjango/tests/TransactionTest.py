import datetime

from django.test import TestCase
from django.utils import timezone
from bankingOnDjango.models.Transaction import Transaction
from bankingOnDjango.delegates.TransactionDelegate import TransactionDelegate

# ======================================================================
#
# Encapsulates data for model Transaction
#
# @author Harbormaster Dev Team
#
# ======================================================================


# ======================================================================
# Class TransactionTest Declaration
# ======================================================================
class TransactionTest(TestCase):
    def test_crud(self):
        transaction = Transaction()
        transaction.bookingDate = datetime.datetime.now()
        transaction.valueDate = datetime.datetime.now()
        transaction.amount = "default amount field value"
        transaction.description = "default description field value"
        transaction.direction = "default direction field value"
        transaction.transactionType = "default transactionType field value"
        transaction.status = "default status field value"
        transaction.channel = "default channel field value"

        delegate = TransactionDelegate()
        response_obj = delegate.create(transaction)

        self.assertEqual(response_obj, delegate.get(response_obj.id))

        all_obj = delegate.getAll()
        self.assertEqual(all_obj.count(), 1)
        delegate.delete(response_obj.id)

        all_obj = delegate.getAll()
        self.assertEqual(all_obj.count(), 0)
