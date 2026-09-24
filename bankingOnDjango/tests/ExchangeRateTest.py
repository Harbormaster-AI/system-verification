from django.test import TestCase

from bankingOnDjango.models.ExchangeRate import ExchangeRate
from bankingOnDjango.delegates.ExchangeRateDelegate import ExchangeRateDelegate

# ======================================================================
#
# Encapsulates data for model ExchangeRate
#
# @author Harbormaster Dev Team
#
# ======================================================================


# ======================================================================
# Class ExchangeRateTest Declaration
# ======================================================================
class ExchangeRateTest(TestCase):
    def test_crud(self):
        exchange_rate = ExchangeRate()
        exchange_rate.baseCurrency = "default baseCurrency field value"
        exchange_rate.counterCurrency = "default counterCurrency field value"
        exchange_rate.rate = "default rate field value"
        exchange_rate.asOf = datetime.datetime.now()
        exchange_rate.source = "default source field value"

        delegate = ExchangeRateDelegate()
        response_obj = delegate.create(exchange_rate)

        self.assertEqual(response_obj, delegate.get(response_obj.id))

        all_obj = delegate.getAll()
        self.assertEqual(all_obj.count(), 1)
        delegate.delete(response_obj.id)

        all_obj = delegate.getAll()
        self.assertEqual(all_obj.count(), 0)
