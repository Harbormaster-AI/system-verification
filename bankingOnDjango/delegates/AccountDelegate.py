from django.core import exceptions
from django.core import serializers
from django.db import models
from django.db import utils

from bankingOnDjango.models.Account import Account
from bankingOnDjango.models.Bank import Bank
from bankingOnDjango.models.Branch import Branch
from bankingOnDjango.models.BankingProduct import BankingProduct
from bankingOnDjango.models.Customer import Customer
from bankingOnDjango.models.Transaction import Transaction
from bankingOnDjango.models.AccountStatement import AccountStatement
from bankingOnDjango.models.StandingInstruction import StandingInstruction
from bankingOnDjango.models.FeeCharge import FeeCharge
from bankingOnDjango.exceptions import Exceptions

# ======================================================================
#
# Encapsulates data for model Account
#
# @author Harbormaster Dev Team
#
# ======================================================================


# ======================================================================
# Class AccountDelegate Declaration
# ======================================================================
class AccountDelegate:

    # ======================================================================
    # Function Declarations
    # ======================================================================

    def get(self, account_id):
        try:
            account = Account.objects.filter(id=account_id)
            return account.first()
        except Account.DoesNotExist:
            raise ProcessingError(
                "Account with id " + str(account_id) + " does not exist."
            )
        except utils.DatabaseError:
            raise StorageReadError()
        except Exception:
            raise GeneralError(err_msg)

    def createFromJson(self, account):
        for model in serializers.deserialize("json", account):
            model.save()
            return model

    def create(self, account):
        account.save()
        return account

    def saveFromJson(self, account):
        for model in serializers.deserialize("json", account):
            model.save()
            return account

    def save(self, account):
        account.save()
        return account

    def delete(self, account_id):
        err_msg = "Failed to delete Account from db using id " + str(account_id)

        try:
            account = Account.objects.get(id=account_id)
            account.delete()
            return True
        except Account.DoesNotExist:
            raise ProcessingError(
                "Account with id " + str(account_id) + " does not exist."
            )
        except utils.DatabaseError:
            raise StorageReadError()
        except Exception:
            raise GeneralError(err_msg)

    def getAll(self):
        try:
            all = Account.objects.all()
            return all
        except utils.DatabaseError:
            raise StorageReadError("Failed to get all Account from db")
        except Exception:
            return None

    def assignBank(self, account_id, bankId):
        # lazy importing avoids circular dependencies
        from bankingOnDjango.delegates.BankDelegate import BankDelegate

        err_msg = "Failed to assign element " + str(bankId) + " for Bank on Account"

        try:
            # get the Account from db
            account = self.get(account_id).first()

            # get the Bank from db
            bank = BankDelegate().get(bankId).first()

            # assign the Bank
            account.bank = bank

            # save it
            account.save()

            # reload and return the appropriate version
            return self.get(account_id)
        except Account.DoesNotExist:
            raise ProcessingError(
                err_msg + " : Account with id " + str(account_id) + " does not exist."
            )
        except Bank.DoesNotExist:
            raise ProcessingError(
                err_msg + " : Bank with id " + str(bankId) + " does not exist."
            )
        except Exception:
            return None

    def unassignBank(self, account_id):
        err_msg = "Failed to unassign element " + str(bankId) + " for Bank on Account"

        try:
            # get the Account from db
            account = self.get(account_id).first()

            # assign to None for unassignment
            account.bank = None

            # save it
            account.save()

            # reload and return the appropriate version
            return self.get(account_id)
        except Account.DoesNotExist:
            raise ProcessingError(
                err_msg + " : Account with id " + str(account_id) + " does not exist."
            )
        except Exception:
            return None

    def assignBranch(self, account_id, branchId):
        # lazy importing avoids circular dependencies
        from bankingOnDjango.delegates.BranchDelegate import BranchDelegate

        err_msg = "Failed to assign element " + str(branchId) + " for Branch on Account"

        try:
            # get the Account from db
            account = self.get(account_id).first()

            # get the Branch from db
            branch = BranchDelegate().get(branchId).first()

            # assign the Branch
            account.branch = branch

            # save it
            account.save()

            # reload and return the appropriate version
            return self.get(account_id)
        except Account.DoesNotExist:
            raise ProcessingError(
                err_msg + " : Account with id " + str(account_id) + " does not exist."
            )
        except Branch.DoesNotExist:
            raise ProcessingError(
                err_msg + " : Branch with id " + str(branchId) + " does not exist."
            )
        except Exception:
            return None

    def unassignBranch(self, account_id):
        err_msg = (
            "Failed to unassign element " + str(branchId) + " for Branch on Account"
        )

        try:
            # get the Account from db
            account = self.get(account_id).first()

            # assign to None for unassignment
            account.branch = None

            # save it
            account.save()

            # reload and return the appropriate version
            return self.get(account_id)
        except Account.DoesNotExist:
            raise ProcessingError(
                err_msg + " : Account with id " + str(account_id) + " does not exist."
            )
        except Exception:
            return None

    def assignProduct(self, account_id, productId):
        # lazy importing avoids circular dependencies
        from bankingOnDjango.delegates.BankingProductDelegate import (
            BankingProductDelegate,
        )

        err_msg = (
            "Failed to assign element " + str(productId) + " for Product on Account"
        )

        try:
            # get the Account from db
            account = self.get(account_id).first()

            # get the BankingProduct from db
            bankingProduct = BankingProductDelegate().get(productId).first()

            # assign the Product
            account.product = bankingProduct

            # save it
            account.save()

            # reload and return the appropriate version
            return self.get(account_id)
        except Account.DoesNotExist:
            raise ProcessingError(
                err_msg + " : Account with id " + str(account_id) + " does not exist."
            )
        except BankingProduct.DoesNotExist:
            raise ProcessingError(
                err_msg
                + " : BankingProduct with id "
                + str(productId)
                + " does not exist."
            )
        except Exception:
            return None

    def unassignProduct(self, account_id):
        err_msg = (
            "Failed to unassign element " + str(productId) + " for Product on Account"
        )

        try:
            # get the Account from db
            account = self.get(account_id).first()

            # assign to None for unassignment
            account.bankingProduct = None

            # save it
            account.save()

            # reload and return the appropriate version
            return self.get(account_id)
        except Account.DoesNotExist:
            raise ProcessingError(
                err_msg + " : Account with id " + str(account_id) + " does not exist."
            )
        except Exception:
            return None

    def addOwners(self, account_id, ownersIds):
        # lazy importing avoids circular dependencies
        from bankingOnDjango.delegates.CustomerDelegate import CustomerDelegate

        err_msg = "Failed to add elements " + str(ownersIds) + " for Owners on Account"

        try:
            # get the Account
            account = self.get(account_id).first()

            # iterate over ids
            for id in ownersIds:
                # read the Customer
                customer = CustomerDelegate().get(id).first()
                # add the Customer
                account.owners.add(customer)

            # save it
            account.save()

            # reload and return the appropriate version
            return self.get(account_id)
        except Account.DoesNotExist:
            raise ProcessingError(
                err_msg + " : Account with id " + str(account_id) + " does not exist."
            )
        except Customer.DoesNotExist:
            raise ProcessingError(err_msg + " : Customer does not exist.")
        except Exception:
            raise ProcessingError(err_msg)

    def removeOwners(self, account_id, ownersIds):
        # lazy importing avoids circular dependencies
        from bankingOnDjango.delegates.CustomerDelegate import CustomerDelegate

        err_msg = (
            "Failed to remove elements " + str(ownersIds) + " for Owners on Account"
        )

        try:
            # get the Account
            account = self.get(account_id).first()

            # iterate over ids
            for id in ownersIds:
                # read the Customer
                customer = CustomerDelegate().get(id).first()
                # add the Customer
                account.owners.remove(customer)

            # save it
            account.save()

            # reload and return the appropriate version
            return self.get(account_id)
        except Account.DoesNotExist:
            raise ProcessingError(
                err_msg + " : Account with id " + str(account_id) + " does not exist."
            )
        except Customer.DoesNotExist:
            raise ProcessingError(err_msg + " : Customer does not exist.")
        except utils.DatabaseError:
            raise StorageWriteError()
        except Exception:
            raise GeneralError(err_msg)

    def addTransactions(self, account_id, transactionsIds):
        # lazy importing avoids circular dependencies
        from bankingOnDjango.delegates.TransactionDelegate import TransactionDelegate

        err_msg = (
            "Failed to add elements "
            + str(transactionsIds)
            + " for Transactions on Account"
        )

        try:
            # get the Account
            account = self.get(account_id).first()

            # iterate over ids
            for id in transactionsIds:
                # read the Transaction
                transaction = TransactionDelegate().get(id).first()
                # add the Transaction
                account.transactions.add(transaction)

            # save it
            account.save()

            # reload and return the appropriate version
            return self.get(account_id)
        except Account.DoesNotExist:
            raise ProcessingError(
                err_msg + " : Account with id " + str(account_id) + " does not exist."
            )
        except Transaction.DoesNotExist:
            raise ProcessingError(err_msg + " : Transaction does not exist.")
        except Exception:
            raise ProcessingError(err_msg)

    def removeTransactions(self, account_id, transactionsIds):
        # lazy importing avoids circular dependencies
        from bankingOnDjango.delegates.TransactionDelegate import TransactionDelegate

        err_msg = (
            "Failed to remove elements "
            + str(transactionsIds)
            + " for Transactions on Account"
        )

        try:
            # get the Account
            account = self.get(account_id).first()

            # iterate over ids
            for id in transactionsIds:
                # read the Transaction
                transaction = TransactionDelegate().get(id).first()
                # add the Transaction
                account.transactions.remove(transaction)

            # save it
            account.save()

            # reload and return the appropriate version
            return self.get(account_id)
        except Account.DoesNotExist:
            raise ProcessingError(
                err_msg + " : Account with id " + str(account_id) + " does not exist."
            )
        except Transaction.DoesNotExist:
            raise ProcessingError(err_msg + " : Transaction does not exist.")
        except utils.DatabaseError:
            raise StorageWriteError()
        except Exception:
            raise GeneralError(err_msg)

    def addStatements(self, account_id, statementsIds):
        # lazy importing avoids circular dependencies
        from bankingOnDjango.delegates.AccountStatementDelegate import (
            AccountStatementDelegate,
        )

        err_msg = (
            "Failed to add elements "
            + str(statementsIds)
            + " for Statements on Account"
        )

        try:
            # get the Account
            account = self.get(account_id).first()

            # iterate over ids
            for id in statementsIds:
                # read the AccountStatement
                accountStatement = AccountStatementDelegate().get(id).first()
                # add the AccountStatement
                account.statements.add(accountStatement)

            # save it
            account.save()

            # reload and return the appropriate version
            return self.get(account_id)
        except Account.DoesNotExist:
            raise ProcessingError(
                err_msg + " : Account with id " + str(account_id) + " does not exist."
            )
        except AccountStatement.DoesNotExist:
            raise ProcessingError(err_msg + " : AccountStatement does not exist.")
        except Exception:
            raise ProcessingError(err_msg)

    def removeStatements(self, account_id, statementsIds):
        # lazy importing avoids circular dependencies
        from bankingOnDjango.delegates.AccountStatementDelegate import (
            AccountStatementDelegate,
        )

        err_msg = (
            "Failed to remove elements "
            + str(statementsIds)
            + " for Statements on Account"
        )

        try:
            # get the Account
            account = self.get(account_id).first()

            # iterate over ids
            for id in statementsIds:
                # read the AccountStatement
                accountStatement = AccountStatementDelegate().get(id).first()
                # add the AccountStatement
                account.statements.remove(accountStatement)

            # save it
            account.save()

            # reload and return the appropriate version
            return self.get(account_id)
        except Account.DoesNotExist:
            raise ProcessingError(
                err_msg + " : Account with id " + str(account_id) + " does not exist."
            )
        except AccountStatement.DoesNotExist:
            raise ProcessingError(err_msg + " : AccountStatement does not exist.")
        except utils.DatabaseError:
            raise StorageWriteError()
        except Exception:
            raise GeneralError(err_msg)

    def addStandingInstructions(self, account_id, standingInstructionsIds):
        # lazy importing avoids circular dependencies
        from bankingOnDjango.delegates.StandingInstructionDelegate import (
            StandingInstructionDelegate,
        )

        err_msg = (
            "Failed to add elements "
            + str(standingInstructionsIds)
            + " for StandingInstructions on Account"
        )

        try:
            # get the Account
            account = self.get(account_id).first()

            # iterate over ids
            for id in standingInstructionsIds:
                # read the StandingInstruction
                standingInstruction = StandingInstructionDelegate().get(id).first()
                # add the StandingInstruction
                account.standingInstructions.add(standingInstruction)

            # save it
            account.save()

            # reload and return the appropriate version
            return self.get(account_id)
        except Account.DoesNotExist:
            raise ProcessingError(
                err_msg + " : Account with id " + str(account_id) + " does not exist."
            )
        except StandingInstruction.DoesNotExist:
            raise ProcessingError(err_msg + " : StandingInstruction does not exist.")
        except Exception:
            raise ProcessingError(err_msg)

    def removeStandingInstructions(self, account_id, standingInstructionsIds):
        # lazy importing avoids circular dependencies
        from bankingOnDjango.delegates.StandingInstructionDelegate import (
            StandingInstructionDelegate,
        )

        err_msg = (
            "Failed to remove elements "
            + str(standingInstructionsIds)
            + " for StandingInstructions on Account"
        )

        try:
            # get the Account
            account = self.get(account_id).first()

            # iterate over ids
            for id in standingInstructionsIds:
                # read the StandingInstruction
                standingInstruction = StandingInstructionDelegate().get(id).first()
                # add the StandingInstruction
                account.standingInstructions.remove(standingInstruction)

            # save it
            account.save()

            # reload and return the appropriate version
            return self.get(account_id)
        except Account.DoesNotExist:
            raise ProcessingError(
                err_msg + " : Account with id " + str(account_id) + " does not exist."
            )
        except StandingInstruction.DoesNotExist:
            raise ProcessingError(err_msg + " : StandingInstruction does not exist.")
        except utils.DatabaseError:
            raise StorageWriteError()
        except Exception:
            raise GeneralError(err_msg)

    def addFeeCharges(self, account_id, feeChargesIds):
        # lazy importing avoids circular dependencies
        from bankingOnDjango.delegates.FeeChargeDelegate import FeeChargeDelegate

        err_msg = (
            "Failed to add elements "
            + str(feeChargesIds)
            + " for FeeCharges on Account"
        )

        try:
            # get the Account
            account = self.get(account_id).first()

            # iterate over ids
            for id in feeChargesIds:
                # read the FeeCharge
                feeCharge = FeeChargeDelegate().get(id).first()
                # add the FeeCharge
                account.feeCharges.add(feeCharge)

            # save it
            account.save()

            # reload and return the appropriate version
            return self.get(account_id)
        except Account.DoesNotExist:
            raise ProcessingError(
                err_msg + " : Account with id " + str(account_id) + " does not exist."
            )
        except FeeCharge.DoesNotExist:
            raise ProcessingError(err_msg + " : FeeCharge does not exist.")
        except Exception:
            raise ProcessingError(err_msg)

    def removeFeeCharges(self, account_id, feeChargesIds):
        # lazy importing avoids circular dependencies
        from bankingOnDjango.delegates.FeeChargeDelegate import FeeChargeDelegate

        err_msg = (
            "Failed to remove elements "
            + str(feeChargesIds)
            + " for FeeCharges on Account"
        )

        try:
            # get the Account
            account = self.get(account_id).first()

            # iterate over ids
            for id in feeChargesIds:
                # read the FeeCharge
                feeCharge = FeeChargeDelegate().get(id).first()
                # add the FeeCharge
                account.feeCharges.remove(feeCharge)

            # save it
            account.save()

            # reload and return the appropriate version
            return self.get(account_id)
        except Account.DoesNotExist:
            raise ProcessingError(
                err_msg + " : Account with id " + str(account_id) + " does not exist."
            )
        except FeeCharge.DoesNotExist:
            raise ProcessingError(err_msg + " : FeeCharge does not exist.")
        except utils.DatabaseError:
            raise StorageWriteError()
        except Exception:
            raise GeneralError(err_msg)
