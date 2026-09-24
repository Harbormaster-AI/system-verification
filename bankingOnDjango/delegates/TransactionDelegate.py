from django.core import serializers
from django.db import utils

from bankingOnDjango.models.Transaction import Transaction
from bankingOnDjango.models.Account import Account
from bankingOnDjango.models.ExternalAccount import ExternalAccount
from bankingOnDjango.models.PaymentCard import PaymentCard
from bankingOnDjango.models.FundsTransfer import FundsTransfer
from bankingOnDjango.models.FXTrade import FXTrade
from bankingOnDjango.models.Dispute import Dispute
from bankingOnDjango.exceptions import Exceptions

# ======================================================================
#
# Encapsulates data for model Transaction
#
# @author Harbormaster Dev Team
#
# ======================================================================


# ======================================================================
# Class TransactionDelegate Declaration
# ======================================================================
class TransactionDelegate:

    # ======================================================================
    # Function Declarations
    # ======================================================================

    def get(self, transaction_id):
        err_msg = "Failed to get Transaction from db using id " + str(transaction_id)
        try:
            transaction = Transaction.objects.filter(id=transaction_id)
            return transaction.first()
        except Transaction.DoesNotExist:
            raise Exceptions.ProcessingError(
                "Transaction with id " + str(transaction_id) + " does not exist."
            )
        except utils.Exceptions.DatabaseError:
            raise Exceptions.StorageReadError()
        except Exception:
            raise Exceptions.GeneralError(err_msg)

    def createFromJson(self, transaction):
        for model in serializers.deserialize("json", transaction):
            model.save()
            return model

    def create(self, transaction):
        transaction.save()
        return transaction

    def saveFromJson(self, transaction):
        for model in serializers.deserialize("json", transaction):
            model.save()
            return transaction

    def save(self, transaction):
        transaction.save()
        return transaction

    def delete(self, transaction_id):
        err_msg = "Failed to delete Transaction from db using id " + str(transaction_id)

        try:
            transaction = Transaction.objects.get(id=transaction_id)
            transaction.delete()
            return True
        except Transaction.DoesNotExist:
            raise Exceptions.ProcessingError(
                "Transaction with id " + str(transaction_id) + " does not exist."
            )
        except utils.Exceptions.DatabaseError:
            raise Exceptions.StorageReadError()
        except Exception:
            raise Exceptions.GeneralError(err_msg)

    def getAll(self):
        try:
            all = Transaction.objects.all()
            return all
        except utils.Exceptions.DatabaseError:
            raise Exceptions.StorageReadError("Failed to get all Transaction from db")
        except Exception:
            return None

    def assignAccount(self, transaction_id, account_id):
        # lazy importing avoids circular dependencies
        from bankingOnDjango.delegates.AccountDelegate import child_delegate

        err_msg = (
            "Failed to assign element "
            + str(account_id)
            + " for Account on Transaction"
        )

        try:
            # get the Transaction from db
            transaction = self.get(transaction_id).first()

            # get the Account from db
            account = child_delegate.get(account_id).first()

            # assign the Account
            transaction.account = account

            # save it
            transaction.save()

            # reload and return the appropriate version
            return self.get(transaction_id)
        except Transaction.DoesNotExist:
            raise Exceptions.ProcessingError(
                err_msg
                + " : Transaction with id "
                + str(transaction_id)
                + " does not exist."
            )
        except Account.DoesNotExist:
            raise Exceptions.ProcessingError(
                err_msg + " : Account with id " + str(account_id) + " does not exist."
            )
        except Exception:
            return None

    def unassignAccount(self, transaction_id):
        err_msg = (
            "Failed to unassign element "
            + str(transaction_id)
            + " for Account on Transaction"
        )

        try:
            # get the Transaction from db
            transaction = self.get(transaction_id).first()

            # assign to None for unassignment
            transaction.account = None

            # save it
            transaction.save()

            # reload and return the appropriate version
            return self.get(transaction_id)
        except Transaction.DoesNotExist:
            raise Exceptions.ProcessingError(
                err_msg
                + " : Transaction with id "
                + str(transaction_id)
                + " does not exist."
            )
        except Exception:
            return None

    def assignExternalCounterparty(self, transaction_id, external_counterparty_id):
        # lazy importing avoids circular dependencies
        from bankingOnDjango.delegates.ExternalAccountDelegate import child_delegate

        err_msg = (
            "Failed to assign element "
            + str(external_counterparty_id)
            + " for ExternalCounterparty on Transaction"
        )

        try:
            # get the Transaction from db
            transaction = self.get(transaction_id).first()

            # get the ExternalAccount from db
            external_account = child_delegate.get(external_counterparty_id).first()

            # assign the ExternalCounterparty
            transaction.external_counterparty = external_account

            # save it
            transaction.save()

            # reload and return the appropriate version
            return self.get(transaction_id)
        except Transaction.DoesNotExist:
            raise Exceptions.ProcessingError(
                err_msg
                + " : Transaction with id "
                + str(transaction_id)
                + " does not exist."
            )
        except ExternalAccount.DoesNotExist:
            raise Exceptions.ProcessingError(
                err_msg
                + " : ExternalAccount with id "
                + str(external_counterparty_id)
                + " does not exist."
            )
        except Exception:
            return None

    def unassignExternalCounterparty(self, transaction_id):
        err_msg = (
            "Failed to unassign element "
            + str(transaction_id)
            + " for ExternalCounterparty on Transaction"
        )

        try:
            # get the Transaction from db
            transaction = self.get(transaction_id).first()

            # assign to None for unassignment
            transaction.external_account = None

            # save it
            transaction.save()

            # reload and return the appropriate version
            return self.get(transaction_id)
        except Transaction.DoesNotExist:
            raise Exceptions.ProcessingError(
                err_msg
                + " : Transaction with id "
                + str(transaction_id)
                + " does not exist."
            )
        except Exception:
            return None

    def assignPaymentCard(self, transaction_id, payment_card_id):
        # lazy importing avoids circular dependencies
        from bankingOnDjango.delegates.PaymentCardDelegate import child_delegate

        err_msg = (
            "Failed to assign element "
            + str(payment_card_id)
            + " for PaymentCard on Transaction"
        )

        try:
            # get the Transaction from db
            transaction = self.get(transaction_id).first()

            # get the PaymentCard from db
            payment_card = child_delegate.get(payment_card_id).first()

            # assign the PaymentCard
            transaction.payment_card = payment_card

            # save it
            transaction.save()

            # reload and return the appropriate version
            return self.get(transaction_id)
        except Transaction.DoesNotExist:
            raise Exceptions.ProcessingError(
                err_msg
                + " : Transaction with id "
                + str(transaction_id)
                + " does not exist."
            )
        except PaymentCard.DoesNotExist:
            raise Exceptions.ProcessingError(
                err_msg
                + " : PaymentCard with id "
                + str(payment_card_id)
                + " does not exist."
            )
        except Exception:
            return None

    def unassignPaymentCard(self, transaction_id):
        err_msg = (
            "Failed to unassign element "
            + str(transaction_id)
            + " for PaymentCard on Transaction"
        )

        try:
            # get the Transaction from db
            transaction = self.get(transaction_id).first()

            # assign to None for unassignment
            transaction.payment_card = None

            # save it
            transaction.save()

            # reload and return the appropriate version
            return self.get(transaction_id)
        except Transaction.DoesNotExist:
            raise Exceptions.ProcessingError(
                err_msg
                + " : Transaction with id "
                + str(transaction_id)
                + " does not exist."
            )
        except Exception:
            return None

    def assignFundsTransfer(self, transaction_id, funds_transfer_id):
        # lazy importing avoids circular dependencies
        from bankingOnDjango.delegates.FundsTransferDelegate import child_delegate

        err_msg = (
            "Failed to assign element "
            + str(funds_transfer_id)
            + " for FundsTransfer on Transaction"
        )

        try:
            # get the Transaction from db
            transaction = self.get(transaction_id).first()

            # get the FundsTransfer from db
            funds_transfer = child_delegate.get(funds_transfer_id).first()

            # assign the FundsTransfer
            transaction.funds_transfer = funds_transfer

            # save it
            transaction.save()

            # reload and return the appropriate version
            return self.get(transaction_id)
        except Transaction.DoesNotExist:
            raise Exceptions.ProcessingError(
                err_msg
                + " : Transaction with id "
                + str(transaction_id)
                + " does not exist."
            )
        except FundsTransfer.DoesNotExist:
            raise Exceptions.ProcessingError(
                err_msg
                + " : FundsTransfer with id "
                + str(funds_transfer_id)
                + " does not exist."
            )
        except Exception:
            return None

    def unassignFundsTransfer(self, transaction_id):
        err_msg = (
            "Failed to unassign element "
            + str(transaction_id)
            + " for FundsTransfer on Transaction"
        )

        try:
            # get the Transaction from db
            transaction = self.get(transaction_id).first()

            # assign to None for unassignment
            transaction.funds_transfer = None

            # save it
            transaction.save()

            # reload and return the appropriate version
            return self.get(transaction_id)
        except Transaction.DoesNotExist:
            raise Exceptions.ProcessingError(
                err_msg
                + " : Transaction with id "
                + str(transaction_id)
                + " does not exist."
            )
        except Exception:
            return None

    def assignFxTrade(self, transaction_id, fx_trade_id):
        # lazy importing avoids circular dependencies
        from bankingOnDjango.delegates.FXTradeDelegate import child_delegate

        err_msg = (
            "Failed to assign element "
            + str(fx_trade_id)
            + " for FxTrade on Transaction"
        )

        try:
            # get the Transaction from db
            transaction = self.get(transaction_id).first()

            # get the FXTrade from db
            f_x_trade = child_delegate.get(fx_trade_id).first()

            # assign the FxTrade
            transaction.fx_trade = f_x_trade

            # save it
            transaction.save()

            # reload and return the appropriate version
            return self.get(transaction_id)
        except Transaction.DoesNotExist:
            raise Exceptions.ProcessingError(
                err_msg
                + " : Transaction with id "
                + str(transaction_id)
                + " does not exist."
            )
        except FXTrade.DoesNotExist:
            raise Exceptions.ProcessingError(
                err_msg + " : FXTrade with id " + str(fx_trade_id) + " does not exist."
            )
        except Exception:
            return None

    def unassignFxTrade(self, transaction_id):
        err_msg = (
            "Failed to unassign element "
            + str(transaction_id)
            + " for FxTrade on Transaction"
        )

        try:
            # get the Transaction from db
            transaction = self.get(transaction_id).first()

            # assign to None for unassignment
            transaction.f_x_trade = None

            # save it
            transaction.save()

            # reload and return the appropriate version
            return self.get(transaction_id)
        except Transaction.DoesNotExist:
            raise Exceptions.ProcessingError(
                err_msg
                + " : Transaction with id "
                + str(transaction_id)
                + " does not exist."
            )
        except Exception:
            return None

    def assignDispute(self, transaction_id, dispute_id):
        # lazy importing avoids circular dependencies
        from bankingOnDjango.delegates.DisputeDelegate import child_delegate

        err_msg = (
            "Failed to assign element "
            + str(dispute_id)
            + " for Dispute on Transaction"
        )

        try:
            # get the Transaction from db
            transaction = self.get(transaction_id).first()

            # get the Dispute from db
            dispute = child_delegate.get(dispute_id).first()

            # assign the Dispute
            transaction.dispute = dispute

            # save it
            transaction.save()

            # reload and return the appropriate version
            return self.get(transaction_id)
        except Transaction.DoesNotExist:
            raise Exceptions.ProcessingError(
                err_msg
                + " : Transaction with id "
                + str(transaction_id)
                + " does not exist."
            )
        except Dispute.DoesNotExist:
            raise Exceptions.ProcessingError(
                err_msg + " : Dispute with id " + str(dispute_id) + " does not exist."
            )
        except Exception:
            return None

    def unassignDispute(self, transaction_id):
        err_msg = (
            "Failed to unassign element "
            + str(transaction_id)
            + " for Dispute on Transaction"
        )

        try:
            # get the Transaction from db
            transaction = self.get(transaction_id).first()

            # assign to None for unassignment
            transaction.dispute = None

            # save it
            transaction.save()

            # reload and return the appropriate version
            return self.get(transaction_id)
        except Transaction.DoesNotExist:
            raise Exceptions.ProcessingError(
                err_msg
                + " : Transaction with id "
                + str(transaction_id)
                + " does not exist."
            )
        except Exception:
            return None
