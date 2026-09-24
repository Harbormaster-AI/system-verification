from django.core import serializers
from django.db import models
from django.db import utils

from bankingOnDjango.models.FundsTransfer import FundsTransfer
from bankingOnDjango.models.Account import Account
from bankingOnDjango.models.ExternalAccount import ExternalAccount
from bankingOnDjango.models.Customer import Customer
from bankingOnDjango.models.Transaction import Transaction
from bankingOnDjango.exceptions import Exceptions

# ======================================================================
#
# Encapsulates data for model FundsTransfer
#
# @author Harbormaster Dev Team
#
# ======================================================================


# ======================================================================
# Class FundsTransferDelegate Declaration
# ======================================================================
class FundsTransferDelegate:

    # ======================================================================
    # Function Declarations
    # ======================================================================

    def get(self, funds_transfer_id):
        err_msg = "Failed to get FundsTransfer from db using id " + str(
            funds_transfer_id
        )
        try:
            funds_transfer = FundsTransfer.objects.filter(id=funds_transfer_id)
            return funds_transfer.first()
        except FundsTransfer.DoesNotExist:
            raise Exceptions.ProcessingError(
                "FundsTransfer with id " + str(funds_transfer_id) + " does not exist."
            )
        except utils.Exceptions.DatabaseError:
            raise Exceptions.StorageReadError()
        except Exception:
            raise Exceptions.GeneralError(err_msg)

    def createFromJson(self, funds_transfer):
        for model in serializers.deserialize("json", funds_transfer):
            model.save()
            return model

    def create(self, funds_transfer):
        funds_transfer.save()
        return funds_transfer

    def saveFromJson(self, funds_transfer):
        for model in serializers.deserialize("json", funds_transfer):
            model.save()
            return funds_transfer

    def save(self, funds_transfer):
        funds_transfer.save()
        return funds_transfer

    def delete(self, funds_transfer_id):
        err_msg = "Failed to delete FundsTransfer from db using id " + str(
            funds_transfer_id
        )

        try:
            funds_transfer = FundsTransfer.objects.get(id=funds_transfer_id)
            funds_transfer.delete()
            return True
        except FundsTransfer.DoesNotExist:
            raise Exceptions.ProcessingError(
                "FundsTransfer with id " + str(funds_transfer_id) + " does not exist."
            )
        except utils.Exceptions.DatabaseError:
            raise Exceptions.StorageReadError()
        except Exception:
            raise Exceptions.GeneralError(err_msg)

    def getAll(self):
        try:
            all = FundsTransfer.objects.all()
            return all
        except utils.Exceptions.DatabaseError:
            raise Exceptions.StorageReadError("Failed to get all FundsTransfer from db")
        except Exception:
            return None

    def assignSourceAccount(self, funds_transfer_id, sourceAccount_id):
        # lazy importing avoids circular dependencies
        from bankingOnDjango.delegates.AccountDelegate import AccountDelegate

        err_msg = (
            "Failed to assign element "
            + str(sourceAccount_id)
            + " for SourceAccount on FundsTransfer"
        )

        try:
            # get the FundsTransfer from db
            funds_transfer = self.get(funds_transfer_id).first()

            # get the Account from db
            account = AccountDelegate().get(sourceAccount_id).first()

            # assign the SourceAccount
            funds_transfer.sourceAccount = account

            # save it
            funds_transfer.save()

            # reload and return the appropriate version
            return self.get(funds_transfer_id)
        except FundsTransfer.DoesNotExist:
            raise Exceptions.ProcessingError(
                err_msg
                + " : FundsTransfer with id "
                + str(funds_transfer_id)
                + " does not exist."
            )
        except Account.DoesNotExist:
            raise Exceptions.ProcessingError(
                err_msg
                + " : Account with id "
                + str(sourceAccount_id)
                + " does not exist."
            )
        except Exception:
            return None

    def unassignSourceAccount(self, funds_transfer_id):
        err_msg = (
            "Failed to unassign element "
            + str(sourceAccount_id)
            + " for SourceAccount on FundsTransfer"
        )

        try:
            # get the FundsTransfer from db
            funds_transfer = self.get(funds_transfer_id).first()

            # assign to None for unassignment
            funds_transfer.account = None

            # save it
            funds_transfer.save()

            # reload and return the appropriate version
            return self.get(funds_transfer_id)
        except FundsTransfer.DoesNotExist:
            raise Exceptions.ProcessingError(
                err_msg
                + " : FundsTransfer with id "
                + str(funds_transfer_id)
                + " does not exist."
            )
        except Exception:
            return None

    def assignDestinationAccount(self, funds_transfer_id, destinationAccount_id):
        # lazy importing avoids circular dependencies
        from bankingOnDjango.delegates.AccountDelegate import AccountDelegate

        err_msg = (
            "Failed to assign element "
            + str(destinationAccount_id)
            + " for DestinationAccount on FundsTransfer"
        )

        try:
            # get the FundsTransfer from db
            funds_transfer = self.get(funds_transfer_id).first()

            # get the Account from db
            account = AccountDelegate().get(destinationAccount_id).first()

            # assign the DestinationAccount
            funds_transfer.destinationAccount = account

            # save it
            funds_transfer.save()

            # reload and return the appropriate version
            return self.get(funds_transfer_id)
        except FundsTransfer.DoesNotExist:
            raise Exceptions.ProcessingError(
                err_msg
                + " : FundsTransfer with id "
                + str(funds_transfer_id)
                + " does not exist."
            )
        except Account.DoesNotExist:
            raise Exceptions.ProcessingError(
                err_msg
                + " : Account with id "
                + str(destinationAccount_id)
                + " does not exist."
            )
        except Exception:
            return None

    def unassignDestinationAccount(self, funds_transfer_id):
        err_msg = (
            "Failed to unassign element "
            + str(destinationAccount_id)
            + " for DestinationAccount on FundsTransfer"
        )

        try:
            # get the FundsTransfer from db
            funds_transfer = self.get(funds_transfer_id).first()

            # assign to None for unassignment
            funds_transfer.account = None

            # save it
            funds_transfer.save()

            # reload and return the appropriate version
            return self.get(funds_transfer_id)
        except FundsTransfer.DoesNotExist:
            raise Exceptions.ProcessingError(
                err_msg
                + " : FundsTransfer with id "
                + str(funds_transfer_id)
                + " does not exist."
            )
        except Exception:
            return None

    def assignExternalBeneficiary(self, funds_transfer_id, externalBeneficiary_id):
        # lazy importing avoids circular dependencies
        from bankingOnDjango.delegates.ExternalAccountDelegate import (
            ExternalAccountDelegate,
        )

        err_msg = (
            "Failed to assign element "
            + str(externalBeneficiary_id)
            + " for ExternalBeneficiary on FundsTransfer"
        )

        try:
            # get the FundsTransfer from db
            funds_transfer = self.get(funds_transfer_id).first()

            # get the ExternalAccount from db
            externalAccount = (
                ExternalAccountDelegate().get(externalBeneficiary_id).first()
            )

            # assign the ExternalBeneficiary
            funds_transfer.externalBeneficiary = externalAccount

            # save it
            funds_transfer.save()

            # reload and return the appropriate version
            return self.get(funds_transfer_id)
        except FundsTransfer.DoesNotExist:
            raise Exceptions.ProcessingError(
                err_msg
                + " : FundsTransfer with id "
                + str(funds_transfer_id)
                + " does not exist."
            )
        except ExternalAccount.DoesNotExist:
            raise Exceptions.ProcessingError(
                err_msg
                + " : ExternalAccount with id "
                + str(externalBeneficiary_id)
                + " does not exist."
            )
        except Exception:
            return None

    def unassignExternalBeneficiary(self, funds_transfer_id):
        err_msg = (
            "Failed to unassign element "
            + str(externalBeneficiary_id)
            + " for ExternalBeneficiary on FundsTransfer"
        )

        try:
            # get the FundsTransfer from db
            funds_transfer = self.get(funds_transfer_id).first()

            # assign to None for unassignment
            funds_transfer.externalAccount = None

            # save it
            funds_transfer.save()

            # reload and return the appropriate version
            return self.get(funds_transfer_id)
        except FundsTransfer.DoesNotExist:
            raise Exceptions.ProcessingError(
                err_msg
                + " : FundsTransfer with id "
                + str(funds_transfer_id)
                + " does not exist."
            )
        except Exception:
            return None

    def assignInitiatedBy(self, funds_transfer_id, initiatedBy_id):
        # lazy importing avoids circular dependencies
        from bankingOnDjango.delegates.CustomerDelegate import CustomerDelegate

        err_msg = (
            "Failed to assign element "
            + str(initiatedBy_id)
            + " for InitiatedBy on FundsTransfer"
        )

        try:
            # get the FundsTransfer from db
            funds_transfer = self.get(funds_transfer_id).first()

            # get the Customer from db
            customer = CustomerDelegate().get(initiatedBy_id).first()

            # assign the InitiatedBy
            funds_transfer.initiatedBy = customer

            # save it
            funds_transfer.save()

            # reload and return the appropriate version
            return self.get(funds_transfer_id)
        except FundsTransfer.DoesNotExist:
            raise Exceptions.ProcessingError(
                err_msg
                + " : FundsTransfer with id "
                + str(funds_transfer_id)
                + " does not exist."
            )
        except Customer.DoesNotExist:
            raise Exceptions.ProcessingError(
                err_msg
                + " : Customer with id "
                + str(initiatedBy_id)
                + " does not exist."
            )
        except Exception:
            return None

    def unassignInitiatedBy(self, funds_transfer_id):
        err_msg = (
            "Failed to unassign element "
            + str(initiatedBy_id)
            + " for InitiatedBy on FundsTransfer"
        )

        try:
            # get the FundsTransfer from db
            funds_transfer = self.get(funds_transfer_id).first()

            # assign to None for unassignment
            funds_transfer.customer = None

            # save it
            funds_transfer.save()

            # reload and return the appropriate version
            return self.get(funds_transfer_id)
        except FundsTransfer.DoesNotExist:
            raise Exceptions.ProcessingError(
                err_msg
                + " : FundsTransfer with id "
                + str(funds_transfer_id)
                + " does not exist."
            )
        except Exception:
            return None

    def addTransactions(self, funds_transfer_id, transactions_ids):
        # lazy importing avoids circular dependencies
        from bankingOnDjango.delegates.TransactionDelegate import TransactionDelegate

        err_msg = (
            "Failed to add elements "
            + str(transactions_ids)
            + " for Transactions on FundsTransfer"
        )

        try:
            # get the FundsTransfer
            funds_transfer = self.get(funds_transfer_id).first()

            # iterate over ids
            for id in transactions_ids:
                # read the Transaction
                transaction = TransactionDelegate().get(id).first()
                # add the Transaction
                funds_transfer.transactions.add(transaction)

            # save it
            funds_transfer.save()

            # reload and return the appropriate version
            return self.get(funds_transfer_id)
        except FundsTransfer.DoesNotExist:
            raise Exceptions.ProcessingError(
                err_msg
                + " : FundsTransfer with id "
                + str(funds_transfer_id)
                + " does not exist."
            )
        except Transaction.DoesNotExist:
            raise Exceptions.ProcessingError(err_msg + " : Transaction does not exist.")
        except Exception:
            raise Exceptions.ProcessingError(err_msg)

    def removeTransactions(self, funds_transfer_id, transactions_ids):
        # lazy importing avoids circular dependenciesId
        try:
            # reload and return the appropriate version
            return self.get(funds_transfer_id)
        except FundsTransfer.DoesNotExist:
            raise Exceptions.ProcessingError(
                err_msg
                + " : FundsTransfer with id "
                + str(funds_transfer_id)
                + " does not exist."
            )
        except Transaction.DoesNotExist:
            raise Exceptions.ProcessingError(err_msg + " : Transaction does not exist.")
        except utils.Exceptions.DatabaseError:
            raise Exceptions.StorageWriteError()
        except Exception:
            raise Exceptions.GeneralError(err_msg)
