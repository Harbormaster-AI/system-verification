from django.core import serializers
from django.db import models
from django.db import utils

from bankingOnDjango.models.Branch import Branch
from bankingOnDjango.models.Bank import Bank
from bankingOnDjango.models.Account import Account
from bankingOnDjango.models.LoanAccount import LoanAccount
from bankingOnDjango.models.ATM import ATM
from bankingOnDjango.exceptions import Exceptions

# ======================================================================
#
# Encapsulates data for model Branch
#
# @author Harbormaster Dev Team
#
# ======================================================================


# ======================================================================
# Class BranchDelegate Declaration
# ======================================================================
class BranchDelegate:

    # ======================================================================
    # Function Declarations
    # ======================================================================

    def get(self, branch_id):
        err_msg = "Failed to get Branch from db using id " + str(branch_id)
        try:
            branch = Branch.objects.filter(id=branch_id)
            return branch.first()
        except Branch.DoesNotExist:
            raise Exceptions.ProcessingError(
                "Branch with id " + str(branch_id) + " does not exist."
            )
        except utils.Exceptions.DatabaseError:
            raise Exceptions.StorageReadError()
        except Exception:
            raise Exceptions.GeneralError(err_msg)

    def createFromJson(self, branch):
        for model in serializers.deserialize("json", branch):
            model.save()
            return model

    def create(self, branch):
        branch.save()
        return branch

    def saveFromJson(self, branch):
        for model in serializers.deserialize("json", branch):
            model.save()
            return branch

    def save(self, branch):
        branch.save()
        return branch

    def delete(self, branch_id):
        err_msg = "Failed to delete Branch from db using id " + str(branch_id)

        try:
            branch = Branch.objects.get(id=branch_id)
            branch.delete()
            return True
        except Branch.DoesNotExist:
            raise Exceptions.ProcessingError(
                "Branch with id " + str(branch_id) + " does not exist."
            )
        except utils.Exceptions.DatabaseError:
            raise Exceptions.StorageReadError()
        except Exception:
            raise Exceptions.GeneralError(err_msg)

    def getAll(self):
        try:
            all = Branch.objects.all()
            return all
        except utils.Exceptions.DatabaseError:
            raise Exceptions.StorageReadError("Failed to get all Branch from db")
        except Exception:
            return None

    def assignBank(self, branch_id, bank_id):
        # lazy importing avoids circular dependencies
        from bankingOnDjango.delegates.BankDelegate import BankDelegate

        err_msg = "Failed to assign element " + str(bank_id) + " for Bank on Branch"

        try:
            # get the Branch from db
            branch = self.get(branch_id).first()

            # get the Bank from db
            bank = BankDelegate().get(bank_id).first()

            # assign the Bank
            branch.bank = bank

            # save it
            branch.save()

            # reload and return the appropriate version
            return self.get(branch_id)
        except Branch.DoesNotExist:
            raise Exceptions.ProcessingError(
                err_msg + " : Branch with id " + str(branch_id) + " does not exist."
            )
        except Bank.DoesNotExist:
            raise Exceptions.ProcessingError(
                err_msg + " : Bank with id " + str(bank_id) + " does not exist."
            )
        except Exception:
            return None

    def unassignBank(self, branch_id):
        err_msg = "Failed to unassign element " + str(branch_id) + " for Bank on Branch"

        try:
            # get the Branch from db
            branch = self.get(branch_id).first()

            # assign to None for unassignment
            branch.bank = None

            # save it
            branch.save()

            # reload and return the appropriate version
            return self.get(branch_id)
        except Branch.DoesNotExist:
            raise Exceptions.ProcessingError(
                err_msg + " : Branch with id " + str(branch_id) + " does not exist."
            )
        except Exception:
            return None

    def addAccounts(self, branch_id, accounts_ids):
        # lazy importing avoids circular dependencies
        from bankingOnDjango.delegates.AccountDelegate import AccountDelegate

        err_msg = (
            "Failed to add elements " + str(accounts_ids) + " for Accounts on Branch"
        )

        try:
            # get the Branch
            branch = self.get(branch_id).first()

            # iterate over ids
            for id in accounts_ids:
                # read the Account
                account = AccountDelegate().get(id).first()
                # add the Account
                branch.accounts.add(account)

            # save it
            branch.save()

            # reload and return the appropriate version
            return self.get(branch_id)
        except Branch.DoesNotExist:
            raise Exceptions.ProcessingError(
                err_msg + " : Branch with id " + str(branch_id) + " does not exist."
            )
        except Account.DoesNotExist:
            raise Exceptions.ProcessingError(err_msg + " : Account does not exist.")
        except Exception:
            raise Exceptions.ProcessingError(err_msg)

    def removeAccounts(self, branch_id, accounts_ids):
        # lazy importing avoids circular dependenciesId
        try:
            # reload and return the appropriate version
            return self.get(branch_id)
        except Branch.DoesNotExist:
            raise Exceptions.ProcessingError(
                "Branch with id " + str(branch_id) + " does not exist."
            )
        except Account.DoesNotExist:
            raise Exceptions.ProcessingError(
                "Account with id " + str(accounts_id) + " does not exist."
            )
        except utils.Exceptions.DatabaseError:
            raise Exceptions.StorageWriteError()
        except Exception:
            raise Exceptions.GeneralError(err_msg)

    def addLoanAccounts(self, branch_id, loan_accounts_ids):
        # lazy importing avoids circular dependencies
        from bankingOnDjango.delegates.LoanAccountDelegate import LoanAccountDelegate

        err_msg = (
            "Failed to add elements "
            + str(loan_accounts_ids)
            + " for LoanAccounts on Branch"
        )

        try:
            # get the Branch
            branch = self.get(branch_id).first()

            # iterate over ids
            for id in loan_accounts_ids:
                # read the LoanAccount
                loan_account = LoanAccountDelegate().get(id).first()
                # add the LoanAccount
                branch.loan_accounts.add(loan_account)

            # save it
            branch.save()

            # reload and return the appropriate version
            return self.get(branch_id)
        except Branch.DoesNotExist:
            raise Exceptions.ProcessingError(
                err_msg + " : Branch with id " + str(branch_id) + " does not exist."
            )
        except LoanAccount.DoesNotExist:
            raise Exceptions.ProcessingError(err_msg + " : LoanAccount does not exist.")
        except Exception:
            raise Exceptions.ProcessingError(err_msg)

    def removeLoanAccounts(self, branch_id, loan_accounts_ids):
        # lazy importing avoids circular dependenciesId
        try:
            # reload and return the appropriate version
            return self.get(branch_id)
        except Branch.DoesNotExist:
            raise Exceptions.ProcessingError(
                "Branch with id " + str(branch_id) + " does not exist."
            )
        except LoanAccount.DoesNotExist:
            raise Exceptions.ProcessingError(
                "LoanAccount with id " + str(loan_accounts_id) + " does not exist."
            )
        except utils.Exceptions.DatabaseError:
            raise Exceptions.StorageWriteError()
        except Exception:
            raise Exceptions.GeneralError(err_msg)

    def addAtms(self, branch_id, atms_ids):
        # lazy importing avoids circular dependencies
        from bankingOnDjango.delegates.ATMDelegate import ATMDelegate

        err_msg = "Failed to add elements " + str(atms_ids) + " for Atms on Branch"

        try:
            # get the Branch
            branch = self.get(branch_id).first()

            # iterate over ids
            for id in atms_ids:
                # read the ATM
                a_t_m = ATMDelegate().get(id).first()
                # add the ATM
                branch.atms.add(a_t_m)

            # save it
            branch.save()

            # reload and return the appropriate version
            return self.get(branch_id)
        except Branch.DoesNotExist:
            raise Exceptions.ProcessingError(
                err_msg + " : Branch with id " + str(branch_id) + " does not exist."
            )
        except ATM.DoesNotExist:
            raise Exceptions.ProcessingError(err_msg + " : ATM does not exist.")
        except Exception:
            raise Exceptions.ProcessingError(err_msg)

    def removeAtms(self, branch_id, atms_ids):
        # lazy importing avoids circular dependenciesId
        try:
            # reload and return the appropriate version
            return self.get(branch_id)
        except Branch.DoesNotExist:
            raise Exceptions.ProcessingError(
                "Branch with id " + str(branch_id) + " does not exist."
            )
        except ATM.DoesNotExist:
            raise Exceptions.ProcessingError(
                "ATM with id " + str(atms_id) + " does not exist."
            )
        except utils.Exceptions.DatabaseError:
            raise Exceptions.StorageWriteError()
        except Exception:
            raise Exceptions.GeneralError(err_msg)
