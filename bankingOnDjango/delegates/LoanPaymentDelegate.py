from django.core import serializers
from django.db import models
from django.db import utils

from bankingOnDjango.models.LoanPayment import LoanPayment
from bankingOnDjango.models.LoanAccount import LoanAccount
from bankingOnDjango.models.Transaction import Transaction
from bankingOnDjango.exceptions import Exceptions

# ======================================================================
#
# Encapsulates data for model LoanPayment
#
# @author Harbormaster Dev Team
#
# ======================================================================


# ======================================================================
# Class LoanPaymentDelegate Declaration
# ======================================================================
class LoanPaymentDelegate:

    # ======================================================================
    # Function Declarations
    # ======================================================================

    def get(self, loan_payment_id):
        err_msg = "Failed to get LoanPayment from db using id " + str(loan_payment_id)
        try:
            loan_payment = LoanPayment.objects.filter(id=loan_payment_id)
            return loan_payment.first()
        except LoanPayment.DoesNotExist:
            raise Exceptions.ProcessingError(
                "LoanPayment with id " + str(loan_payment_id) + " does not exist."
            )
        except utils.Exceptions.DatabaseError:
            raise Exceptions.StorageReadError()
        except Exception:
            raise Exceptions.GeneralError(err_msg)

    def createFromJson(self, loan_payment):
        for model in serializers.deserialize("json", loan_payment):
            model.save()
            return model

    def create(self, loan_payment):
        loan_payment.save()
        return loan_payment

    def saveFromJson(self, loan_payment):
        for model in serializers.deserialize("json", loan_payment):
            model.save()
            return loan_payment

    def save(self, loan_payment):
        loan_payment.save()
        return loan_payment

    def delete(self, loan_payment_id):
        err_msg = "Failed to delete LoanPayment from db using id " + str(
            loan_payment_id
        )

        try:
            loan_payment = LoanPayment.objects.get(id=loan_payment_id)
            loan_payment.delete()
            return True
        except LoanPayment.DoesNotExist:
            raise Exceptions.ProcessingError(
                "LoanPayment with id " + str(loan_payment_id) + " does not exist."
            )
        except utils.Exceptions.DatabaseError:
            raise Exceptions.StorageReadError()
        except Exception:
            raise Exceptions.GeneralError(err_msg)

    def getAll(self):
        try:
            all = LoanPayment.objects.all()
            return all
        except utils.Exceptions.DatabaseError:
            raise Exceptions.StorageReadError("Failed to get all LoanPayment from db")
        except Exception:
            return None

    def assignLoanAccount(self, loan_payment_id, loanAccount_id):
        # lazy importing avoids circular dependencies
        from bankingOnDjango.delegates.LoanAccountDelegate import LoanAccountDelegate

        err_msg = (
            "Failed to assign element "
            + str(loanAccount_id)
            + " for LoanAccount on LoanPayment"
        )

        try:
            # get the LoanPayment from db
            loan_payment = self.get(loan_payment_id).first()

            # get the LoanAccount from db
            loanAccount = LoanAccountDelegate().get(loanAccount_id).first()

            # assign the LoanAccount
            loan_payment.loanAccount = loanAccount

            # save it
            loan_payment.save()

            # reload and return the appropriate version
            return self.get(loan_payment_id)
        except LoanPayment.DoesNotExist:
            raise Exceptions.ProcessingError(
                err_msg
                + " : LoanPayment with id "
                + str(loan_payment_id)
                + " does not exist."
            )
        except LoanAccount.DoesNotExist:
            raise Exceptions.ProcessingError(
                err_msg
                + " : LoanAccount with id "
                + str(loanAccount_id)
                + " does not exist."
            )
        except Exception:
            return None

    def unassignLoanAccount(self, loan_payment_id):
        err_msg = (
            "Failed to unassign element "
            + str(loanAccount_id)
            + " for LoanAccount on LoanPayment"
        )

        try:
            # get the LoanPayment from db
            loan_payment = self.get(loan_payment_id).first()

            # assign to None for unassignment
            loan_payment.loanAccount = None

            # save it
            loan_payment.save()

            # reload and return the appropriate version
            return self.get(loan_payment_id)
        except LoanPayment.DoesNotExist:
            raise Exceptions.ProcessingError(
                err_msg
                + " : LoanPayment with id "
                + str(loan_payment_id)
                + " does not exist."
            )
        except Exception:
            return None

    def assignTransaction(self, loan_payment_id, transaction_id):
        # lazy importing avoids circular dependencies
        from bankingOnDjango.delegates.TransactionDelegate import TransactionDelegate

        err_msg = (
            "Failed to assign element "
            + str(transaction_id)
            + " for Transaction on LoanPayment"
        )

        try:
            # get the LoanPayment from db
            loan_payment = self.get(loan_payment_id).first()

            # get the Transaction from db
            transaction = TransactionDelegate().get(transaction_id).first()

            # assign the Transaction
            loan_payment.transaction = transaction

            # save it
            loan_payment.save()

            # reload and return the appropriate version
            return self.get(loan_payment_id)
        except LoanPayment.DoesNotExist:
            raise Exceptions.ProcessingError(
                err_msg
                + " : LoanPayment with id "
                + str(loan_payment_id)
                + " does not exist."
            )
        except Transaction.DoesNotExist:
            raise Exceptions.ProcessingError(
                err_msg
                + " : Transaction with id "
                + str(transaction_id)
                + " does not exist."
            )
        except Exception:
            return None

    def unassignTransaction(self, loan_payment_id):
        err_msg = (
            "Failed to unassign element "
            + str(transaction_id)
            + " for Transaction on LoanPayment"
        )

        try:
            # get the LoanPayment from db
            loan_payment = self.get(loan_payment_id).first()

            # assign to None for unassignment
            loan_payment.transaction = None

            # save it
            loan_payment.save()

            # reload and return the appropriate version
            return self.get(loan_payment_id)
        except LoanPayment.DoesNotExist:
            raise Exceptions.ProcessingError(
                err_msg
                + " : LoanPayment with id "
                + str(loan_payment_id)
                + " does not exist."
            )
        except Exception:
            return None
