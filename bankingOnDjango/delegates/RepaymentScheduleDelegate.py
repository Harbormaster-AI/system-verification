from django.core import serializers
from django.db import models
from django.db import utils

from bankingOnDjango.models.RepaymentSchedule import RepaymentSchedule
from bankingOnDjango.models.LoanAccount import LoanAccount
from bankingOnDjango.models.LoanPayment import LoanPayment
from bankingOnDjango.exceptions import Exceptions

# ======================================================================
#
# Encapsulates data for model RepaymentSchedule
#
# @author Harbormaster Dev Team
#
# ======================================================================


# ======================================================================
# Class RepaymentScheduleDelegate Declaration
# ======================================================================
class RepaymentScheduleDelegate:

    # ======================================================================
    # Function Declarations
    # ======================================================================

    def get(self, repayment_schedule_id):
        err_msg = "Failed to get RepaymentSchedule from db using id " + str(
            repayment_schedule_id
        )
        try:
            repayment_schedule = RepaymentSchedule.objects.filter(
                id=repayment_schedule_id
            )
            return repayment_schedule.first()
        except RepaymentSchedule.DoesNotExist:
            raise Exceptions.ProcessingError(
                "RepaymentSchedule with id "
                + str(repayment_schedule_id)
                + " does not exist."
            )
        except utils.Exceptions.DatabaseError:
            raise Exceptions.StorageReadError()
        except Exception:
            raise Exceptions.GeneralError(err_msg)

    def createFromJson(self, repayment_schedule):
        for model in serializers.deserialize("json", repayment_schedule):
            model.save()
            return model

    def create(self, repayment_schedule):
        repayment_schedule.save()
        return repayment_schedule

    def saveFromJson(self, repayment_schedule):
        for model in serializers.deserialize("json", repayment_schedule):
            model.save()
            return repayment_schedule

    def save(self, repayment_schedule):
        repayment_schedule.save()
        return repayment_schedule

    def delete(self, repayment_schedule_id):
        err_msg = "Failed to delete RepaymentSchedule from db using id " + str(
            repayment_schedule_id
        )

        try:
            repayment_schedule = RepaymentSchedule.objects.get(id=repayment_schedule_id)
            repayment_schedule.delete()
            return True
        except RepaymentSchedule.DoesNotExist:
            raise Exceptions.ProcessingError(
                "RepaymentSchedule with id "
                + str(repayment_schedule_id)
                + " does not exist."
            )
        except utils.Exceptions.DatabaseError:
            raise Exceptions.StorageReadError()
        except Exception:
            raise Exceptions.GeneralError(err_msg)

    def getAll(self):
        try:
            all = RepaymentSchedule.objects.all()
            return all
        except utils.Exceptions.DatabaseError:
            raise Exceptions.StorageReadError(
                "Failed to get all RepaymentSchedule from db"
            )
        except Exception:
            return None

    def assignLoanAccount(self, repayment_schedule_id, loan_account_id):
        # lazy importing avoids circular dependencies
        from bankingOnDjango.delegates.LoanAccountDelegate import LoanAccountDelegate

        err_msg = (
            "Failed to assign element "
            + str(loan_account_id)
            + " for LoanAccount on RepaymentSchedule"
        )

        try:
            # get the RepaymentSchedule from db
            repayment_schedule = self.get(repayment_schedule_id).first()

            # get the LoanAccount from db
            loan_account = LoanAccountDelegate().get(loan_account_id).first()

            # assign the LoanAccount
            repayment_schedule.loan_account = loan_account

            # save it
            repayment_schedule.save()

            # reload and return the appropriate version
            return self.get(repayment_schedule_id)
        except RepaymentSchedule.DoesNotExist:
            raise Exceptions.ProcessingError(
                err_msg
                + " : RepaymentSchedule with id "
                + str(repayment_schedule_id)
                + " does not exist."
            )
        except LoanAccount.DoesNotExist:
            raise Exceptions.ProcessingError(
                err_msg
                + " : LoanAccount with id "
                + str(loan_account_id)
                + " does not exist."
            )
        except Exception:
            return None

    def unassignLoanAccount(self, repayment_schedule_id):
        err_msg = (
            "Failed to unassign element "
            + str(loan_account_id)
            + " for LoanAccount on RepaymentSchedule"
        )

        try:
            # get the RepaymentSchedule from db
            repayment_schedule = self.get(repayment_schedule_id).first()

            # assign to None for unassignment
            repayment_schedule.loan_account = None

            # save it
            repayment_schedule.save()

            # reload and return the appropriate version
            return self.get(repayment_schedule_id)
        except RepaymentSchedule.DoesNotExist:
            raise Exceptions.ProcessingError(
                err_msg
                + " : RepaymentSchedule with id "
                + str(repayment_schedule_id)
                + " does not exist."
            )
        except Exception:
            return None

    def assignPayment(self, repayment_schedule_id, payment_id):
        # lazy importing avoids circular dependencies
        from bankingOnDjango.delegates.LoanPaymentDelegate import LoanPaymentDelegate

        err_msg = (
            "Failed to assign element "
            + str(payment_id)
            + " for Payment on RepaymentSchedule"
        )

        try:
            # get the RepaymentSchedule from db
            repayment_schedule = self.get(repayment_schedule_id).first()

            # get the LoanPayment from db
            loan_payment = LoanPaymentDelegate().get(payment_id).first()

            # assign the Payment
            repayment_schedule.payment = loan_payment

            # save it
            repayment_schedule.save()

            # reload and return the appropriate version
            return self.get(repayment_schedule_id)
        except RepaymentSchedule.DoesNotExist:
            raise Exceptions.ProcessingError(
                err_msg
                + " : RepaymentSchedule with id "
                + str(repayment_schedule_id)
                + " does not exist."
            )
        except LoanPayment.DoesNotExist:
            raise Exceptions.ProcessingError(
                err_msg
                + " : LoanPayment with id "
                + str(payment_id)
                + " does not exist."
            )
        except Exception:
            return None

    def unassignPayment(self, repayment_schedule_id):
        err_msg = (
            "Failed to unassign element "
            + str(payment_id)
            + " for Payment on RepaymentSchedule"
        )

        try:
            # get the RepaymentSchedule from db
            repayment_schedule = self.get(repayment_schedule_id).first()

            # assign to None for unassignment
            repayment_schedule.loan_payment = None

            # save it
            repayment_schedule.save()

            # reload and return the appropriate version
            return self.get(repayment_schedule_id)
        except RepaymentSchedule.DoesNotExist:
            raise Exceptions.ProcessingError(
                err_msg
                + " : RepaymentSchedule with id "
                + str(repayment_schedule_id)
                + " does not exist."
            )
        except Exception:
            return None
