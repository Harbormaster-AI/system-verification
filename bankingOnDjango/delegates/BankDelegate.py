from django.core import serializers
from django.db import utils

from bankingOnDjango.models.Bank import Bank
from bankingOnDjango.models.Branch import Branch
from bankingOnDjango.models.BankingProduct import BankingProduct
from bankingOnDjango.models.Customer import Customer
from bankingOnDjango.models.Account import Account
from bankingOnDjango.models.PaymentCard import PaymentCard
from bankingOnDjango.models.LoanAccount import LoanAccount
from bankingOnDjango.models.ExchangeRate import ExchangeRate
from bankingOnDjango.models.Consent import Consent
from bankingOnDjango.models.ThirdPartyProvider import ThirdPartyProvider
from bankingOnDjango.exceptions import Exceptions

# ======================================================================
#
# Encapsulates data for model Bank
#
# @author Harbormaster Dev Team
#
# ======================================================================


# ======================================================================
# Class BankDelegate Declaration
# ======================================================================
class BankDelegate:

    # ======================================================================
    # Function Declarations
    # ======================================================================

    def get(self, bank_id):
        err_msg = "Failed to get Bank from db using id " + str(bank_id)
        try:
            bank = Bank.objects.filter(id=bank_id)
            return bank.first()
        except Bank.DoesNotExist:
            raise Exceptions.ProcessingError(
                "Bank with id " + str(bank_id) + " does not exist."
            )
        except utils.Exceptions.DatabaseError:
            raise Exceptions.StorageReadError()
        except Exception:
            raise Exceptions.GeneralError(err_msg)

    def createFromJson(self, bank):
        for model in serializers.deserialize("json", bank):
            model.save()
            return model

    def create(self, bank):
        bank.save()
        return bank

    def saveFromJson(self, bank):
        for model in serializers.deserialize("json", bank):
            model.save()
            return bank

    def save(self, bank):
        bank.save()
        return bank

    def delete(self, bank_id):
        err_msg = "Failed to delete Bank from db using id " + str(bank_id)

        try:
            bank = Bank.objects.get(id=bank_id)
            bank.delete()
            return True
        except Bank.DoesNotExist:
            raise Exceptions.ProcessingError(
                "Bank with id " + str(bank_id) + " does not exist."
            )
        except utils.Exceptions.DatabaseError:
            raise Exceptions.StorageReadError()
        except Exception:
            raise Exceptions.GeneralError(err_msg)

    def getAll(self):
        try:
            all = Bank.objects.all()
            return all
        except utils.Exceptions.DatabaseError:
            raise Exceptions.StorageReadError("Failed to get all Bank from db")
        except Exception:
            return None

    def addBranches(self, bank_id, branches_ids):
        # lazy importing avoids circular dependencies
        from bankingOnDjango.delegates.BranchDelegate import BranchDelegate

        err_msg = (
            "Failed to add elements " + str(branches_ids) + " for Branches on Bank"
        )

        try:
            # get the Bank
            bank = self.get(bank_id).first()

            # add the children ids
            bank.branches.add(branches_ids)

            # save it
            bank.save()

            # reload and return the appropriate version
            return self.get(bank_id)
        except Bank.DoesNotExist:
            raise Exceptions.ProcessingError(
                err_msg + " : Bank with id " + str(bank_id) + " does not exist."
            )
        except Branch.DoesNotExist:
            raise Exceptions.ProcessingError(err_msg + " : Branch does not exist.")
        except Exception:
            raise Exceptions.ProcessingError(err_msg)

    def removeBranches(self, bank_id, branches_ids):

        err_msg = (
            "Failed to remove elements " + str(branches_ids) + " for Branches on Bank"
        )

        # lazy importing avoids circular dependenciesId
        try:
            bank.branches.remove(branches_ids)

            # save it
            bank.save()

            # reload and return the appropriate version
            return self.get(bank_id)
        except Bank.DoesNotExist:
            raise Exceptions.ProcessingError(
                "Bank with id " + str(bank_id) + " does not exist."
            )
        except Branch.DoesNotExist:
            raise Exceptions.ProcessingError(
                "Branch with id " + str(branches_id) + " does not exist."
            )
        except utils.Exceptions.DatabaseError:
            raise Exceptions.StorageWriteError()
        except Exception:
            raise Exceptions.GeneralError(err_msg)

    def addProducts(self, bank_id, products_ids):
        # lazy importing avoids circular dependencies
        from bankingOnDjango.delegates.BankingProductDelegate import (
            BankingProductDelegate,
        )

        err_msg = (
            "Failed to add elements " + str(products_ids) + " for Products on Bank"
        )

        try:
            # get the Bank
            bank = self.get(bank_id).first()

            # add the children ids
            bank.products.add(products_ids)

            # save it
            bank.save()

            # reload and return the appropriate version
            return self.get(bank_id)
        except Bank.DoesNotExist:
            raise Exceptions.ProcessingError(
                err_msg + " : Bank with id " + str(bank_id) + " does not exist."
            )
        except BankingProduct.DoesNotExist:
            raise Exceptions.ProcessingError(
                err_msg + " : BankingProduct does not exist."
            )
        except Exception:
            raise Exceptions.ProcessingError(err_msg)

    def removeProducts(self, bank_id, products_ids):

        err_msg = (
            "Failed to remove elements " + str(products_ids) + " for Products on Bank"
        )

        # lazy importing avoids circular dependenciesId
        try:
            bank.products.remove(products_ids)

            # save it
            bank.save()

            # reload and return the appropriate version
            return self.get(bank_id)
        except Bank.DoesNotExist:
            raise Exceptions.ProcessingError(
                "Bank with id " + str(bank_id) + " does not exist."
            )
        except BankingProduct.DoesNotExist:
            raise Exceptions.ProcessingError(
                "BankingProduct with id " + str(products_id) + " does not exist."
            )
        except utils.Exceptions.DatabaseError:
            raise Exceptions.StorageWriteError()
        except Exception:
            raise Exceptions.GeneralError(err_msg)

    def addCustomers(self, bank_id, customers_ids):
        # lazy importing avoids circular dependencies
        from bankingOnDjango.delegates.CustomerDelegate import CustomerDelegate

        err_msg = (
            "Failed to add elements " + str(customers_ids) + " for Customers on Bank"
        )

        try:
            # get the Bank
            bank = self.get(bank_id).first()

            # add the children ids
            bank.customers.add(customers_ids)

            # save it
            bank.save()

            # reload and return the appropriate version
            return self.get(bank_id)
        except Bank.DoesNotExist:
            raise Exceptions.ProcessingError(
                err_msg + " : Bank with id " + str(bank_id) + " does not exist."
            )
        except Customer.DoesNotExist:
            raise Exceptions.ProcessingError(err_msg + " : Customer does not exist.")
        except Exception:
            raise Exceptions.ProcessingError(err_msg)

    def removeCustomers(self, bank_id, customers_ids):

        err_msg = (
            "Failed to remove elements " + str(customers_ids) + " for Customers on Bank"
        )

        # lazy importing avoids circular dependenciesId
        try:
            bank.customers.remove(customers_ids)

            # save it
            bank.save()

            # reload and return the appropriate version
            return self.get(bank_id)
        except Bank.DoesNotExist:
            raise Exceptions.ProcessingError(
                "Bank with id " + str(bank_id) + " does not exist."
            )
        except Customer.DoesNotExist:
            raise Exceptions.ProcessingError(
                "Customer with id " + str(customers_id) + " does not exist."
            )
        except utils.Exceptions.DatabaseError:
            raise Exceptions.StorageWriteError()
        except Exception:
            raise Exceptions.GeneralError(err_msg)

    def addAccounts(self, bank_id, accounts_ids):
        # lazy importing avoids circular dependencies
        from bankingOnDjango.delegates.AccountDelegate import AccountDelegate

        err_msg = (
            "Failed to add elements " + str(accounts_ids) + " for Accounts on Bank"
        )

        try:
            # get the Bank
            bank = self.get(bank_id).first()

            # add the children ids
            bank.accounts.add(accounts_ids)

            # save it
            bank.save()

            # reload and return the appropriate version
            return self.get(bank_id)
        except Bank.DoesNotExist:
            raise Exceptions.ProcessingError(
                err_msg + " : Bank with id " + str(bank_id) + " does not exist."
            )
        except Account.DoesNotExist:
            raise Exceptions.ProcessingError(err_msg + " : Account does not exist.")
        except Exception:
            raise Exceptions.ProcessingError(err_msg)

    def removeAccounts(self, bank_id, accounts_ids):

        err_msg = (
            "Failed to remove elements " + str(accounts_ids) + " for Accounts on Bank"
        )

        # lazy importing avoids circular dependenciesId
        try:
            bank.accounts.remove(accounts_ids)

            # save it
            bank.save()

            # reload and return the appropriate version
            return self.get(bank_id)
        except Bank.DoesNotExist:
            raise Exceptions.ProcessingError(
                "Bank with id " + str(bank_id) + " does not exist."
            )
        except Account.DoesNotExist:
            raise Exceptions.ProcessingError(
                "Account with id " + str(accounts_id) + " does not exist."
            )
        except utils.Exceptions.DatabaseError:
            raise Exceptions.StorageWriteError()
        except Exception:
            raise Exceptions.GeneralError(err_msg)

    def addPaymentCards(self, bank_id, payment_cards_ids):
        # lazy importing avoids circular dependencies
        from bankingOnDjango.delegates.PaymentCardDelegate import PaymentCardDelegate

        err_msg = (
            "Failed to add elements "
            + str(payment_cards_ids)
            + " for PaymentCards on Bank"
        )

        try:
            # get the Bank
            bank = self.get(bank_id).first()

            # add the children ids
            bank.payment_cards.add(payment_cards_ids)

            # save it
            bank.save()

            # reload and return the appropriate version
            return self.get(bank_id)
        except Bank.DoesNotExist:
            raise Exceptions.ProcessingError(
                err_msg + " : Bank with id " + str(bank_id) + " does not exist."
            )
        except PaymentCard.DoesNotExist:
            raise Exceptions.ProcessingError(err_msg + " : PaymentCard does not exist.")
        except Exception:
            raise Exceptions.ProcessingError(err_msg)

    def removePaymentCards(self, bank_id, payment_cards_ids):

        err_msg = (
            "Failed to remove elements "
            + str(payment_cards_ids)
            + " for PaymentCards on Bank"
        )

        # lazy importing avoids circular dependenciesId
        try:
            bank.payment_cards.remove(payment_cards_ids)

            # save it
            bank.save()

            # reload and return the appropriate version
            return self.get(bank_id)
        except Bank.DoesNotExist:
            raise Exceptions.ProcessingError(
                "Bank with id " + str(bank_id) + " does not exist."
            )
        except PaymentCard.DoesNotExist:
            raise Exceptions.ProcessingError(
                "PaymentCard with id " + str(payment_cards_id) + " does not exist."
            )
        except utils.Exceptions.DatabaseError:
            raise Exceptions.StorageWriteError()
        except Exception:
            raise Exceptions.GeneralError(err_msg)

    def addLoanAccounts(self, bank_id, loan_accounts_ids):
        # lazy importing avoids circular dependencies
        from bankingOnDjango.delegates.LoanAccountDelegate import LoanAccountDelegate

        err_msg = (
            "Failed to add elements "
            + str(loan_accounts_ids)
            + " for LoanAccounts on Bank"
        )

        try:
            # get the Bank
            bank = self.get(bank_id).first()

            # add the children ids
            bank.loan_accounts.add(loan_accounts_ids)

            # save it
            bank.save()

            # reload and return the appropriate version
            return self.get(bank_id)
        except Bank.DoesNotExist:
            raise Exceptions.ProcessingError(
                err_msg + " : Bank with id " + str(bank_id) + " does not exist."
            )
        except LoanAccount.DoesNotExist:
            raise Exceptions.ProcessingError(err_msg + " : LoanAccount does not exist.")
        except Exception:
            raise Exceptions.ProcessingError(err_msg)

    def removeLoanAccounts(self, bank_id, loan_accounts_ids):

        err_msg = (
            "Failed to remove elements "
            + str(loan_accounts_ids)
            + " for LoanAccounts on Bank"
        )

        # lazy importing avoids circular dependenciesId
        try:
            bank.loan_accounts.remove(loan_accounts_ids)

            # save it
            bank.save()

            # reload and return the appropriate version
            return self.get(bank_id)
        except Bank.DoesNotExist:
            raise Exceptions.ProcessingError(
                "Bank with id " + str(bank_id) + " does not exist."
            )
        except LoanAccount.DoesNotExist:
            raise Exceptions.ProcessingError(
                "LoanAccount with id " + str(loan_accounts_id) + " does not exist."
            )
        except utils.Exceptions.DatabaseError:
            raise Exceptions.StorageWriteError()
        except Exception:
            raise Exceptions.GeneralError(err_msg)

    def addExchangeRates(self, bank_id, exchange_rates_ids):
        # lazy importing avoids circular dependencies
        from bankingOnDjango.delegates.ExchangeRateDelegate import ExchangeRateDelegate

        err_msg = (
            "Failed to add elements "
            + str(exchange_rates_ids)
            + " for ExchangeRates on Bank"
        )

        try:
            # get the Bank
            bank = self.get(bank_id).first()

            # add the children ids
            bank.exchange_rates.add(exchange_rates_ids)

            # save it
            bank.save()

            # reload and return the appropriate version
            return self.get(bank_id)
        except Bank.DoesNotExist:
            raise Exceptions.ProcessingError(
                err_msg + " : Bank with id " + str(bank_id) + " does not exist."
            )
        except ExchangeRate.DoesNotExist:
            raise Exceptions.ProcessingError(
                err_msg + " : ExchangeRate does not exist."
            )
        except Exception:
            raise Exceptions.ProcessingError(err_msg)

    def removeExchangeRates(self, bank_id, exchange_rates_ids):

        err_msg = (
            "Failed to remove elements "
            + str(exchange_rates_ids)
            + " for ExchangeRates on Bank"
        )

        # lazy importing avoids circular dependenciesId
        try:
            bank.exchange_rates.remove(exchange_rates_ids)

            # save it
            bank.save()

            # reload and return the appropriate version
            return self.get(bank_id)
        except Bank.DoesNotExist:
            raise Exceptions.ProcessingError(
                "Bank with id " + str(bank_id) + " does not exist."
            )
        except ExchangeRate.DoesNotExist:
            raise Exceptions.ProcessingError(
                "ExchangeRate with id " + str(exchange_rates_id) + " does not exist."
            )
        except utils.Exceptions.DatabaseError:
            raise Exceptions.StorageWriteError()
        except Exception:
            raise Exceptions.GeneralError(err_msg)

    def addConsents(self, bank_id, consents_ids):
        # lazy importing avoids circular dependencies
        from bankingOnDjango.delegates.ConsentDelegate import ConsentDelegate

        err_msg = (
            "Failed to add elements " + str(consents_ids) + " for Consents on Bank"
        )

        try:
            # get the Bank
            bank = self.get(bank_id).first()

            # add the children ids
            bank.consents.add(consents_ids)

            # save it
            bank.save()

            # reload and return the appropriate version
            return self.get(bank_id)
        except Bank.DoesNotExist:
            raise Exceptions.ProcessingError(
                err_msg + " : Bank with id " + str(bank_id) + " does not exist."
            )
        except Consent.DoesNotExist:
            raise Exceptions.ProcessingError(err_msg + " : Consent does not exist.")
        except Exception:
            raise Exceptions.ProcessingError(err_msg)

    def removeConsents(self, bank_id, consents_ids):

        err_msg = (
            "Failed to remove elements " + str(consents_ids) + " for Consents on Bank"
        )

        # lazy importing avoids circular dependenciesId
        try:
            bank.consents.remove(consents_ids)

            # save it
            bank.save()

            # reload and return the appropriate version
            return self.get(bank_id)
        except Bank.DoesNotExist:
            raise Exceptions.ProcessingError(
                "Bank with id " + str(bank_id) + " does not exist."
            )
        except Consent.DoesNotExist:
            raise Exceptions.ProcessingError(
                "Consent with id " + str(consents_id) + " does not exist."
            )
        except utils.Exceptions.DatabaseError:
            raise Exceptions.StorageWriteError()
        except Exception:
            raise Exceptions.GeneralError(err_msg)

    def addThirdPartyProviders(self, bank_id, third_party_providers_ids):
        # lazy importing avoids circular dependencies
        from bankingOnDjango.delegates.ThirdPartyProviderDelegate import (
            ThirdPartyProviderDelegate,
        )

        err_msg = (
            "Failed to add elements "
            + str(third_party_providers_ids)
            + " for ThirdPartyProviders on Bank"
        )

        try:
            # get the Bank
            bank = self.get(bank_id).first()

            # add the children ids
            bank.third_party_providers.add(third_party_providers_ids)

            # save it
            bank.save()

            # reload and return the appropriate version
            return self.get(bank_id)
        except Bank.DoesNotExist:
            raise Exceptions.ProcessingError(
                err_msg + " : Bank with id " + str(bank_id) + " does not exist."
            )
        except ThirdPartyProvider.DoesNotExist:
            raise Exceptions.ProcessingError(
                err_msg + " : ThirdPartyProvider does not exist."
            )
        except Exception:
            raise Exceptions.ProcessingError(err_msg)

    def removeThirdPartyProviders(self, bank_id, third_party_providers_ids):

        err_msg = (
            "Failed to remove elements "
            + str(third_party_providers_ids)
            + " for ThirdPartyProviders on Bank"
        )

        # lazy importing avoids circular dependenciesId
        try:
            bank.third_party_providers.remove(third_party_providers_ids)

            # save it
            bank.save()

            # reload and return the appropriate version
            return self.get(bank_id)
        except Bank.DoesNotExist:
            raise Exceptions.ProcessingError(
                "Bank with id " + str(bank_id) + " does not exist."
            )
        except ThirdPartyProvider.DoesNotExist:
            raise Exceptions.ProcessingError(
                "ThirdPartyProvider with id "
                + str(third_party_providers_id)
                + " does not exist."
            )
        except utils.Exceptions.DatabaseError:
            raise Exceptions.StorageWriteError()
        except Exception:
            raise Exceptions.GeneralError(err_msg)
