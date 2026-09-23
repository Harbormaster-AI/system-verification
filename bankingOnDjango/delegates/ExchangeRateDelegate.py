from django.core import exceptions
from django.core import serializers
from django.db import models
from django.db import utils

from bankingOnDjango.models.ExchangeRate import ExchangeRate
from bankingOnDjango.models.Bank import Bank
from bankingOnDjango.models.FXTrade import FXTrade
from bankingOnDjango.exceptions import Exceptions

# ======================================================================
#
# Encapsulates data for model ExchangeRate
#
# @author Harbormaster Dev Team
#
# ======================================================================


# ======================================================================
# Class ExchangeRateDelegate Declaration
# ======================================================================
class ExchangeRateDelegate:

    # ======================================================================
    # Function Declarations
    # ======================================================================

    def get(self, exchange_rate_id):
        err_msg = "Failed to get ExchangeRate from db using id " + str(exchange_rate_id)
        try:
            exchange_rate = ExchangeRate.objects.filter(id=exchange_rate_id)
            return exchange_rate.first()
        except ExchangeRate.DoesNotExist:
            raise Exceptions.ProcessingError(
                "ExchangeRate with id " + str(exchange_rate_id) + " does not exist."
            )
        except utils.Exceptions.DatabaseError:
            raise Exceptions.StorageReadError()
        except Exception:
            raise Exceptions.GeneralError(err_msg)

    def createFromJson(self, exchange_rate):
        for model in serializers.deserialize("json", exchange_rate):
            model.save()
            return model

    def create(self, exchange_rate):
        exchange_rate.save()
        return exchange_rate

    def saveFromJson(self, exchange_rate):
        for model in serializers.deserialize("json", exchange_rate):
            model.save()
            return exchange_rate

    def save(self, exchange_rate):
        exchange_rate.save()
        return exchange_rate

    def delete(self, exchange_rate_id):
        err_msg = "Failed to delete ExchangeRate from db using id " + str(
            exchange_rate_id
        )

        try:
            exchange_rate = ExchangeRate.objects.get(id=exchange_rate_id)
            exchange_rate.delete()
            return True
        except ExchangeRate.DoesNotExist:
            raise Exceptions.ProcessingError(
                "ExchangeRate with id " + str(exchange_rate_id) + " does not exist."
            )
        except utils.Exceptions.DatabaseError:
            raise Exceptions.StorageReadError()
        except Exception:
            raise Exceptions.GeneralError(err_msg)

    def getAll(self):
        try:
            all = ExchangeRate.objects.all()
            return all
        except utils.Exceptions.DatabaseError:
            raise Exceptions.StorageReadError("Failed to get all ExchangeRate from db")
        except Exception:
            return None

    def assignBank(self, exchange_rate_id, bankId):
        # lazy importing avoids circular dependencies
        from bankingOnDjango.delegates.BankDelegate import BankDelegate

        err_msg = (
            "Failed to assign element " + str(bankId) + " for Bank on ExchangeRate"
        )

        try:
            # get the ExchangeRate from db
            exchange_rate = self.get(exchange_rate_id).first()

            # get the Bank from db
            bank = BankDelegate().get(bankId).first()

            # assign the Bank
            exchange_rate.bank = bank

            # save it
            exchange_rate.save()

            # reload and return the appropriate version
            return self.get(exchange_rate_id)
        except ExchangeRate.DoesNotExist:
            raise Exceptions.ProcessingError(
                err_msg
                + " : ExchangeRate with id "
                + str(exchange_rate_id)
                + " does not exist."
            )
        except Bank.DoesNotExist:
            raise Exceptions.ProcessingError(
                err_msg + " : Bank with id " + str(bankId) + " does not exist."
            )
        except Exception:
            return None

    def unassignBank(self, exchange_rate_id):
        err_msg = (
            "Failed to unassign element " + str(bankId) + " for Bank on ExchangeRate"
        )

        try:
            # get the ExchangeRate from db
            exchange_rate = self.get(exchange_rate_id).first()

            # assign to None for unassignment
            exchange_rate.bank = None

            # save it
            exchange_rate.save()

            # reload and return the appropriate version
            return self.get(exchange_rate_id)
        except ExchangeRate.DoesNotExist:
            raise Exceptions.ProcessingError(
                err_msg
                + " : ExchangeRate with id "
                + str(exchange_rate_id)
                + " does not exist."
            )
        except Exception:
            return None

    def addFxTrades(self, exchange_rate_id, fxTradesIds):
        # lazy importing avoids circular dependencies
        from bankingOnDjango.delegates.FXTradeDelegate import FXTradeDelegate

        err_msg = (
            "Failed to add elements "
            + str(fxTradesIds)
            + " for FxTrades on ExchangeRate"
        )

        try:
            # get the ExchangeRate
            exchange_rate = self.get(exchange_rate_id).first()

            # iterate over ids
            for id in fxTradesIds:
                # read the FXTrade
                fXTrade = FXTradeDelegate().get(id).first()
                # add the FXTrade
                exchange_rate.fxTrades.add(fXTrade)

            # save it
            exchange_rate.save()

            # reload and return the appropriate version
            return self.get(exchange_rate_id)
        except ExchangeRate.DoesNotExist:
            raise Exceptions.ProcessingError(
                err_msg
                + " : ExchangeRate with id "
                + str(exchange_rate_id)
                + " does not exist."
            )
        except FXTrade.DoesNotExist:
            raise Exceptions.ProcessingError(err_msg + " : FXTrade does not exist.")
        except Exception:
            raise Exceptions.ProcessingError(err_msg)

    def removeFxTrades(self, exchange_rate_id, fxTradesIds):
        # lazy importing avoids circular dependencies
        from bankingOnDjango.delegates.FXTradeDelegate import FXTradeDelegate

        err_msg = (
            "Failed to remove elements "
            + str(fxTradesIds)
            + " for FxTrades on ExchangeRate"
        )

        try:
            # get the ExchangeRate
            exchange_rate = self.get(exchange_rate_id).first()

            # iterate over ids
            for id in fxTradesIds:
                # read the FXTrade
                fXTrade = FXTradeDelegate().get(id).first()
                # add the FXTrade
                exchange_rate.fxTrades.remove(fXTrade)

            # save it
            exchange_rate.save()

            # reload and return the appropriate version
            return self.get(exchange_rate_id)
        except ExchangeRate.DoesNotExist:
            raise Exceptions.ProcessingError(
                err_msg
                + " : ExchangeRate with id "
                + str(exchange_rate_id)
                + " does not exist."
            )
        except FXTrade.DoesNotExist:
            raise Exceptions.ProcessingError(err_msg + " : FXTrade does not exist.")
        except utils.Exceptions.DatabaseError:
            raise StorageWriteError()
        except Exception:
            raise Exceptions.GeneralError(err_msg)
