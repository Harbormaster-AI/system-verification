from django.core import serializers
from django.db import models
from django.db import utils

from bankingOnDjango.models.ExternalAccount import ExternalAccount
from bankingOnDjango.models.Customer import Customer
from bankingOnDjango.models.Transaction import Transaction
from bankingOnDjango.exceptions import Exceptions

# ======================================================================
#
# Encapsulates data for model ExternalAccount
#
# @author Harbormaster Dev Team
#
# ======================================================================


# ======================================================================
# Class ExternalAccountDelegate Declaration
# ======================================================================
class ExternalAccountDelegate:

    # ======================================================================
    # Function Declarations
    # ======================================================================

    def get(self, external_account_id):
        err_msg = "Failed to get ExternalAccount from db using id " + str(
            external_account_id
        )
        try:
            external_account = ExternalAccount.objects.filter(id=external_account_id)
            return external_account.first()
        except ExternalAccount.DoesNotExist:
            raise Exceptions.ProcessingError(
                "ExternalAccount with id "
                + str(external_account_id)
                + " does not exist."
            )
        except utils.Exceptions.DatabaseError:
            raise Exceptions.StorageReadError()
        except Exception:
            raise Exceptions.GeneralError(err_msg)

    def createFromJson(self, external_account):
        for model in serializers.deserialize("json", external_account):
            model.save()
            return model

    def create(self, external_account):
        external_account.save()
        return external_account

    def saveFromJson(self, external_account):
        for model in serializers.deserialize("json", external_account):
            model.save()
            return external_account

    def save(self, external_account):
        external_account.save()
        return external_account

    def delete(self, external_account_id):
        err_msg = "Failed to delete ExternalAccount from db using id " + str(
            external_account_id
        )

        try:
            external_account = ExternalAccount.objects.get(id=external_account_id)
            external_account.delete()
            return True
        except ExternalAccount.DoesNotExist:
            raise Exceptions.ProcessingError(
                "ExternalAccount with id "
                + str(external_account_id)
                + " does not exist."
            )
        except utils.Exceptions.DatabaseError:
            raise Exceptions.StorageReadError()
        except Exception:
            raise Exceptions.GeneralError(err_msg)

    def getAll(self):
        try:
            all = ExternalAccount.objects.all()
            return all
        except utils.Exceptions.DatabaseError:
            raise Exceptions.StorageReadError(
                "Failed to get all ExternalAccount from db"
            )
        except Exception:
            return None

    def assignCustomer(self, external_account_id, customer_id):
        # lazy importing avoids circular dependencies
        from bankingOnDjango.delegates.CustomerDelegate import CustomerDelegate

        err_msg = (
            "Failed to assign element "
            + str(customer_id)
            + " for Customer on ExternalAccount"
        )

        try:
            # get the ExternalAccount from db
            external_account = self.get(external_account_id).first()

            # get the Customer from db
            customer = CustomerDelegate().get(customer_id).first()

            # assign the Customer
            external_account.customer = customer

            # save it
            external_account.save()

            # reload and return the appropriate version
            return self.get(external_account_id)
        except ExternalAccount.DoesNotExist:
            raise Exceptions.ProcessingError(
                err_msg
                + " : ExternalAccount with id "
                + str(external_account_id)
                + " does not exist."
            )
        except Customer.DoesNotExist:
            raise Exceptions.ProcessingError(
                err_msg + " : Customer with id " + str(customer_id) + " does not exist."
            )
        except Exception:
            return None

    def unassignCustomer(self, external_account_id):
        err_msg = (
            "Failed to unassign element "
            + str(external_account_id)
            + " for Customer on ExternalAccount"
        )

        try:
            # get the ExternalAccount from db
            external_account = self.get(external_account_id).first()

            # assign to None for unassignment
            external_account.customer = None

            # save it
            external_account.save()

            # reload and return the appropriate version
            return self.get(external_account_id)
        except ExternalAccount.DoesNotExist:
            raise Exceptions.ProcessingError(
                err_msg
                + " : ExternalAccount with id "
                + str(external_account_id)
                + " does not exist."
            )
        except Exception:
            return None

    def addTransactions(self, external_account_id, transactions_ids):
        # lazy importing avoids circular dependencies
        from bankingOnDjango.delegates.TransactionDelegate import TransactionDelegate

        err_msg = (
            "Failed to add elements "
            + str(transactions_ids)
            + " for Transactions on ExternalAccount"
        )

        try:
            # get the ExternalAccount
            external_account = self.get(external_account_id).first()

            # iterate over ids
            for id in transactions_ids:
                # read the Transaction
                transaction = TransactionDelegate().get(id).first()
                # add the Transaction
                external_account.transactions.add(transaction)

            # save it
            external_account.save()

            # reload and return the appropriate version
            return self.get(external_account_id)
        except ExternalAccount.DoesNotExist:
            raise Exceptions.ProcessingError(
                err_msg
                + " : ExternalAccount with id "
                + str(external_account_id)
                + " does not exist."
            )
        except Transaction.DoesNotExist:
            raise Exceptions.ProcessingError(err_msg + " : Transaction does not exist.")
        except Exception:
            raise Exceptions.ProcessingError(err_msg)

    def removeTransactions(self, external_account_id, transactions_ids):
        # lazy importing avoids circular dependenciesId
        try:
            # reload and return the appropriate version
            return self.get(external_account_id)
        except ExternalAccount.DoesNotExist:
            raise Exceptions.ProcessingError(
                "ExternalAccount with id "
                + str(external_account_id)
                + " does not exist."
            )
        except Transaction.DoesNotExist:
            raise Exceptions.ProcessingError(
                "Transaction with id " + str(transactions_id) + " does not exist."
            )
        except utils.Exceptions.DatabaseError:
            raise Exceptions.StorageWriteError()
        except Exception:
            raise Exceptions.GeneralError(err_msg)
