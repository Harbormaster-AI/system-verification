from django.core import exceptions
from django.core import serializers
from django.db import models
from django.db import utils

from bankingOnDjango.models.Dispute import Dispute
from bankingOnDjango.models.Transaction import Transaction
from bankingOnDjango.models.Customer import Customer
from bankingOnDjango.models.Account import Account
from bankingOnDjango.models.PaymentCard import PaymentCard
from bankingOnDjango.exceptions import Exceptions

# ======================================================================
#
# Encapsulates data for model Dispute
#
# @author Harbormaster Dev Team
#
# ======================================================================


# ======================================================================
# Class DisputeDelegate Declaration
# ======================================================================
class DisputeDelegate:

    # ======================================================================
    # Function Declarations
    # ======================================================================

    def get(self, dispute_id):
        err_msg = "Failed to get Dispute from db using id " + str(dispute_id)
        try:
            dispute = Dispute.objects.filter(id=dispute_id)
            return dispute.first()
        except Dispute.DoesNotExist:
            raise Exceptions.ProcessingError(
                "Dispute with id " + str(dispute_id) + " does not exist."
            )
        except utils.Exceptions.DatabaseError:
            raise Exceptions.StorageReadError()
        except Exception:
            raise Exceptions.GeneralError(err_msg)

    def createFromJson(self, dispute):
        for model in serializers.deserialize("json", dispute):
            model.save()
            return model

    def create(self, dispute):
        dispute.save()
        return dispute

    def saveFromJson(self, dispute):
        for model in serializers.deserialize("json", dispute):
            model.save()
            return dispute

    def save(self, dispute):
        dispute.save()
        return dispute

    def delete(self, dispute_id):
        err_msg = "Failed to delete Dispute from db using id " + str(dispute_id)

        try:
            dispute = Dispute.objects.get(id=dispute_id)
            dispute.delete()
            return True
        except Dispute.DoesNotExist:
            raise Exceptions.ProcessingError(
                "Dispute with id " + str(dispute_id) + " does not exist."
            )
        except utils.Exceptions.DatabaseError:
            raise Exceptions.StorageReadError()
        except Exception:
            raise Exceptions.GeneralError(err_msg)

    def getAll(self):
        try:
            all = Dispute.objects.all()
            return all
        except utils.Exceptions.DatabaseError:
            raise Exceptions.StorageReadError("Failed to get all Dispute from db")
        except Exception:
            return None

    def assignTransaction(self, dispute_id, transactionId):
        # lazy importing avoids circular dependencies
        from bankingOnDjango.delegates.TransactionDelegate import TransactionDelegate

        err_msg = (
            "Failed to assign element "
            + str(transactionId)
            + " for Transaction on Dispute"
        )

        try:
            # get the Dispute from db
            dispute = self.get(dispute_id).first()

            # get the Transaction from db
            transaction = TransactionDelegate().get(transactionId).first()

            # assign the Transaction
            dispute.transaction = transaction

            # save it
            dispute.save()

            # reload and return the appropriate version
            return self.get(dispute_id)
        except Dispute.DoesNotExist:
            raise Exceptions.ProcessingError(
                err_msg + " : Dispute with id " + str(dispute_id) + " does not exist."
            )
        except Transaction.DoesNotExist:
            raise Exceptions.ProcessingError(
                err_msg
                + " : Transaction with id "
                + str(transactionId)
                + " does not exist."
            )
        except Exception:
            return None

    def unassignTransaction(self, dispute_id):
        err_msg = (
            "Failed to unassign element "
            + str(transactionId)
            + " for Transaction on Dispute"
        )

        try:
            # get the Dispute from db
            dispute = self.get(dispute_id).first()

            # assign to None for unassignment
            dispute.transaction = None

            # save it
            dispute.save()

            # reload and return the appropriate version
            return self.get(dispute_id)
        except Dispute.DoesNotExist:
            raise Exceptions.ProcessingError(
                err_msg + " : Dispute with id " + str(dispute_id) + " does not exist."
            )
        except Exception:
            return None

    def assignCustomer(self, dispute_id, customerId):
        # lazy importing avoids circular dependencies
        from bankingOnDjango.delegates.CustomerDelegate import CustomerDelegate

        err_msg = (
            "Failed to assign element " + str(customerId) + " for Customer on Dispute"
        )

        try:
            # get the Dispute from db
            dispute = self.get(dispute_id).first()

            # get the Customer from db
            customer = CustomerDelegate().get(customerId).first()

            # assign the Customer
            dispute.customer = customer

            # save it
            dispute.save()

            # reload and return the appropriate version
            return self.get(dispute_id)
        except Dispute.DoesNotExist:
            raise Exceptions.ProcessingError(
                err_msg + " : Dispute with id " + str(dispute_id) + " does not exist."
            )
        except Customer.DoesNotExist:
            raise Exceptions.ProcessingError(
                err_msg + " : Customer with id " + str(customerId) + " does not exist."
            )
        except Exception:
            return None

    def unassignCustomer(self, dispute_id):
        err_msg = (
            "Failed to unassign element " + str(customerId) + " for Customer on Dispute"
        )

        try:
            # get the Dispute from db
            dispute = self.get(dispute_id).first()

            # assign to None for unassignment
            dispute.customer = None

            # save it
            dispute.save()

            # reload and return the appropriate version
            return self.get(dispute_id)
        except Dispute.DoesNotExist:
            raise Exceptions.ProcessingError(
                err_msg + " : Dispute with id " + str(dispute_id) + " does not exist."
            )
        except Exception:
            return None

    def assignAccount(self, dispute_id, accountId):
        # lazy importing avoids circular dependencies
        from bankingOnDjango.delegates.AccountDelegate import AccountDelegate

        err_msg = (
            "Failed to assign element " + str(accountId) + " for Account on Dispute"
        )

        try:
            # get the Dispute from db
            dispute = self.get(dispute_id).first()

            # get the Account from db
            account = AccountDelegate().get(accountId).first()

            # assign the Account
            dispute.account = account

            # save it
            dispute.save()

            # reload and return the appropriate version
            return self.get(dispute_id)
        except Dispute.DoesNotExist:
            raise Exceptions.ProcessingError(
                err_msg + " : Dispute with id " + str(dispute_id) + " does not exist."
            )
        except Account.DoesNotExist:
            raise Exceptions.ProcessingError(
                err_msg + " : Account with id " + str(accountId) + " does not exist."
            )
        except Exception:
            return None

    def unassignAccount(self, dispute_id):
        err_msg = (
            "Failed to unassign element " + str(accountId) + " for Account on Dispute"
        )

        try:
            # get the Dispute from db
            dispute = self.get(dispute_id).first()

            # assign to None for unassignment
            dispute.account = None

            # save it
            dispute.save()

            # reload and return the appropriate version
            return self.get(dispute_id)
        except Dispute.DoesNotExist:
            raise Exceptions.ProcessingError(
                err_msg + " : Dispute with id " + str(dispute_id) + " does not exist."
            )
        except Exception:
            return None

    def assignPaymentCard(self, dispute_id, paymentCardId):
        # lazy importing avoids circular dependencies
        from bankingOnDjango.delegates.PaymentCardDelegate import PaymentCardDelegate

        err_msg = (
            "Failed to assign element "
            + str(paymentCardId)
            + " for PaymentCard on Dispute"
        )

        try:
            # get the Dispute from db
            dispute = self.get(dispute_id).first()

            # get the PaymentCard from db
            paymentCard = PaymentCardDelegate().get(paymentCardId).first()

            # assign the PaymentCard
            dispute.paymentCard = paymentCard

            # save it
            dispute.save()

            # reload and return the appropriate version
            return self.get(dispute_id)
        except Dispute.DoesNotExist:
            raise Exceptions.ProcessingError(
                err_msg + " : Dispute with id " + str(dispute_id) + " does not exist."
            )
        except PaymentCard.DoesNotExist:
            raise Exceptions.ProcessingError(
                err_msg
                + " : PaymentCard with id "
                + str(paymentCardId)
                + " does not exist."
            )
        except Exception:
            return None

    def unassignPaymentCard(self, dispute_id):
        err_msg = (
            "Failed to unassign element "
            + str(paymentCardId)
            + " for PaymentCard on Dispute"
        )

        try:
            # get the Dispute from db
            dispute = self.get(dispute_id).first()

            # assign to None for unassignment
            dispute.paymentCard = None

            # save it
            dispute.save()

            # reload and return the appropriate version
            return self.get(dispute_id)
        except Dispute.DoesNotExist:
            raise Exceptions.ProcessingError(
                err_msg + " : Dispute with id " + str(dispute_id) + " does not exist."
            )
        except Exception:
            return None
