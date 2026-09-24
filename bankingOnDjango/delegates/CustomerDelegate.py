from django.core import serializers
from django.db import utils

from bankingOnDjango.models.Customer import Customer
from bankingOnDjango.models.Bank import Bank
from bankingOnDjango.models.Account import Account
from bankingOnDjango.models.LoanAccount import LoanAccount
from bankingOnDjango.models.PaymentCard import PaymentCard
from bankingOnDjango.models.ExternalAccount import ExternalAccount
from bankingOnDjango.models.FundsTransfer import FundsTransfer
from bankingOnDjango.models.Dispute import Dispute
from bankingOnDjango.models.KycProfile import KycProfile
from bankingOnDjango.models.Consent import Consent
from bankingOnDjango.exceptions import Exceptions

# ======================================================================
#
# Encapsulates data for model Customer
#
# @author Harbormaster Dev Team
#
# ======================================================================


# ======================================================================
# Class CustomerDelegate Declaration
# ======================================================================
class CustomerDelegate:

    # ======================================================================
    # Function Declarations
    # ======================================================================

    def get(self, customer_id):
        err_msg = "Failed to get Customer from db using id " + str(customer_id)
        try:
            customer = Customer.objects.filter(id=customer_id)
            return customer.first()
        except Customer.DoesNotExist:
            raise Exceptions.ProcessingError(
                "Customer with id " + str(customer_id) + " does not exist."
            )
        except utils.Exceptions.DatabaseError:
            raise Exceptions.StorageReadError()
        except Exception:
            raise Exceptions.GeneralError(err_msg)

    def createFromJson(self, customer):
        for model in serializers.deserialize("json", customer):
            model.save()
            return model

    def create(self, customer):
        customer.save()
        return customer

    def saveFromJson(self, customer):
        for model in serializers.deserialize("json", customer):
            model.save()
            return customer

    def save(self, customer):
        customer.save()
        return customer

    def delete(self, customer_id):
        err_msg = "Failed to delete Customer from db using id " + str(customer_id)

        try:
            customer = Customer.objects.get(id=customer_id)
            customer.delete()
            return True
        except Customer.DoesNotExist:
            raise Exceptions.ProcessingError(
                "Customer with id " + str(customer_id) + " does not exist."
            )
        except utils.Exceptions.DatabaseError:
            raise Exceptions.StorageReadError()
        except Exception:
            raise Exceptions.GeneralError(err_msg)

    def getAll(self):
        try:
            all = Customer.objects.all()
            return all
        except utils.Exceptions.DatabaseError:
            raise Exceptions.StorageReadError("Failed to get all Customer from db")
        except Exception:
            return None

    def assignBank(self, customer_id, bank_id):
        # lazy importing avoids circular dependencies
        from bankingOnDjango.delegates.BankDelegate import BankDelegate

        err_msg = "Failed to assign element " + str(bank_id) + " for Bank on Customer"

        try:
            # get the Customer from db
            customer = self.get(customer_id).first()

            # get the Bank from db
            bank = BankDelegate().get(bank_id).first()

            # assign the Bank
            customer.bank = bank

            # save it
            customer.save()

            # reload and return the appropriate version
            return self.get(customer_id)
        except Customer.DoesNotExist:
            raise Exceptions.ProcessingError(
                err_msg + " : Customer with id " + str(customer_id) + " does not exist."
            )
        except Bank.DoesNotExist:
            raise Exceptions.ProcessingError(
                err_msg + " : Bank with id " + str(bank_id) + " does not exist."
            )
        except Exception:
            return None

    def unassignBank(self, customer_id):
        err_msg = (
            "Failed to unassign element " + str(customer_id) + " for Bank on Customer"
        )

        try:
            # get the Customer from db
            customer = self.get(customer_id).first()

            # assign to None for unassignment
            customer.bank = None

            # save it
            customer.save()

            # reload and return the appropriate version
            return self.get(customer_id)
        except Customer.DoesNotExist:
            raise Exceptions.ProcessingError(
                err_msg + " : Customer with id " + str(customer_id) + " does not exist."
            )
        except Exception:
            return None

    def addAccounts(self, customer_id, accounts_ids):
        # lazy importing avoids circular dependencies
        from bankingOnDjango.delegates.AccountDelegate import AccountDelegate

        err_msg = (
            "Failed to add elements " + str(accounts_ids) + " for Accounts on Customer"
        )

        try:
            # get the Customer
            customer = self.get(customer_id).first()

            # add the children by id
            customer.accounts.add(accounts_ids)

            # save it
            customer.save()

            # reload and return the appropriate version
            return self.get(customer_id)
        except Customer.DoesNotExist:
            raise Exceptions.ProcessingError(
                err_msg + " : Customer with id " + str(customer_id) + " does not exist."
            )
        except Account.DoesNotExist:
            raise Exceptions.ProcessingError(err_msg + " : Account does not exist.")
        except Exception:
            raise Exceptions.ProcessingError(err_msg)

    def removeAccounts(self, customer_id, accounts_ids):

        err_msg = (
            "Failed to remove elements "
            + str(accounts_ids)
            + " for Accounts on Customer"
        )

        # lazy importing avoids circular dependenciesId
        try:
            # remove the children by id
            customer.accounts.remove(accounts_ids)

            # save it
            customer.save()

            # reload and return the appropriate version
            return self.get(customer_id)
        except Customer.DoesNotExist:
            raise Exceptions.ProcessingError(
                "Customer with id " + str(customer_id) + " does not exist."
            )
        except Account.DoesNotExist:
            raise Exceptions.ProcessingError(
                "Account with id " + str(accounts_id) + " does not exist."
            )
        except utils.Exceptions.DatabaseError:
            raise Exceptions.StorageWriteError()
        except Exception:
            raise Exceptions.GeneralError(err_msg)

    def addLoanAccounts(self, customer_id, loan_accounts_ids):
        # lazy importing avoids circular dependencies
        from bankingOnDjango.delegates.LoanAccountDelegate import LoanAccountDelegate

        err_msg = (
            "Failed to add elements "
            + str(loan_accounts_ids)
            + " for LoanAccounts on Customer"
        )

        try:
            # get the Customer
            customer = self.get(customer_id).first()

            # add the children by id
            customer.loan_accounts.add(loan_accounts_ids)

            # save it
            customer.save()

            # reload and return the appropriate version
            return self.get(customer_id)
        except Customer.DoesNotExist:
            raise Exceptions.ProcessingError(
                err_msg + " : Customer with id " + str(customer_id) + " does not exist."
            )
        except LoanAccount.DoesNotExist:
            raise Exceptions.ProcessingError(err_msg + " : LoanAccount does not exist.")
        except Exception:
            raise Exceptions.ProcessingError(err_msg)

    def removeLoanAccounts(self, customer_id, loan_accounts_ids):

        err_msg = (
            "Failed to remove elements "
            + str(loan_accounts_ids)
            + " for LoanAccounts on Customer"
        )

        # lazy importing avoids circular dependenciesId
        try:
            # remove the children by id
            customer.loan_accounts.remove(loan_accounts_ids)

            # save it
            customer.save()

            # reload and return the appropriate version
            return self.get(customer_id)
        except Customer.DoesNotExist:
            raise Exceptions.ProcessingError(
                "Customer with id " + str(customer_id) + " does not exist."
            )
        except LoanAccount.DoesNotExist:
            raise Exceptions.ProcessingError(
                "LoanAccount with id " + str(loan_accounts_id) + " does not exist."
            )
        except utils.Exceptions.DatabaseError:
            raise Exceptions.StorageWriteError()
        except Exception:
            raise Exceptions.GeneralError(err_msg)

    def addPaymentCards(self, customer_id, payment_cards_ids):
        # lazy importing avoids circular dependencies
        from bankingOnDjango.delegates.PaymentCardDelegate import PaymentCardDelegate

        err_msg = (
            "Failed to add elements "
            + str(payment_cards_ids)
            + " for PaymentCards on Customer"
        )

        try:
            # get the Customer
            customer = self.get(customer_id).first()

            # add the children by id
            customer.payment_cards.add(payment_cards_ids)

            # save it
            customer.save()

            # reload and return the appropriate version
            return self.get(customer_id)
        except Customer.DoesNotExist:
            raise Exceptions.ProcessingError(
                err_msg + " : Customer with id " + str(customer_id) + " does not exist."
            )
        except PaymentCard.DoesNotExist:
            raise Exceptions.ProcessingError(err_msg + " : PaymentCard does not exist.")
        except Exception:
            raise Exceptions.ProcessingError(err_msg)

    def removePaymentCards(self, customer_id, payment_cards_ids):

        err_msg = (
            "Failed to remove elements "
            + str(payment_cards_ids)
            + " for PaymentCards on Customer"
        )

        # lazy importing avoids circular dependenciesId
        try:
            # remove the children by id
            customer.payment_cards.remove(payment_cards_ids)

            # save it
            customer.save()

            # reload and return the appropriate version
            return self.get(customer_id)
        except Customer.DoesNotExist:
            raise Exceptions.ProcessingError(
                "Customer with id " + str(customer_id) + " does not exist."
            )
        except PaymentCard.DoesNotExist:
            raise Exceptions.ProcessingError(
                "PaymentCard with id " + str(payment_cards_id) + " does not exist."
            )
        except utils.Exceptions.DatabaseError:
            raise Exceptions.StorageWriteError()
        except Exception:
            raise Exceptions.GeneralError(err_msg)

    def addExternalAccounts(self, customer_id, external_accounts_ids):
        # lazy importing avoids circular dependencies
        from bankingOnDjango.delegates.ExternalAccountDelegate import (
            ExternalAccountDelegate,
        )

        err_msg = (
            "Failed to add elements "
            + str(external_accounts_ids)
            + " for ExternalAccounts on Customer"
        )

        try:
            # get the Customer
            customer = self.get(customer_id).first()

            # add the children by id
            customer.external_accounts.add(external_accounts_ids)

            # save it
            customer.save()

            # reload and return the appropriate version
            return self.get(customer_id)
        except Customer.DoesNotExist:
            raise Exceptions.ProcessingError(
                err_msg + " : Customer with id " + str(customer_id) + " does not exist."
            )
        except ExternalAccount.DoesNotExist:
            raise Exceptions.ProcessingError(
                err_msg + " : ExternalAccount does not exist."
            )
        except Exception:
            raise Exceptions.ProcessingError(err_msg)

    def removeExternalAccounts(self, customer_id, external_accounts_ids):

        err_msg = (
            "Failed to remove elements "
            + str(external_accounts_ids)
            + " for ExternalAccounts on Customer"
        )

        # lazy importing avoids circular dependenciesId
        try:
            # remove the children by id
            customer.external_accounts.remove(external_accounts_ids)

            # save it
            customer.save()

            # reload and return the appropriate version
            return self.get(customer_id)
        except Customer.DoesNotExist:
            raise Exceptions.ProcessingError(
                "Customer with id " + str(customer_id) + " does not exist."
            )
        except ExternalAccount.DoesNotExist:
            raise Exceptions.ProcessingError(
                "ExternalAccount with id "
                + str(external_accounts_id)
                + " does not exist."
            )
        except utils.Exceptions.DatabaseError:
            raise Exceptions.StorageWriteError()
        except Exception:
            raise Exceptions.GeneralError(err_msg)

    def addFundsTransfers(self, customer_id, funds_transfers_ids):
        # lazy importing avoids circular dependencies
        from bankingOnDjango.delegates.FundsTransferDelegate import (
            FundsTransferDelegate,
        )

        err_msg = (
            "Failed to add elements "
            + str(funds_transfers_ids)
            + " for FundsTransfers on Customer"
        )

        try:
            # get the Customer
            customer = self.get(customer_id).first()

            # add the children by id
            customer.funds_transfers.add(funds_transfers_ids)

            # save it
            customer.save()

            # reload and return the appropriate version
            return self.get(customer_id)
        except Customer.DoesNotExist:
            raise Exceptions.ProcessingError(
                err_msg + " : Customer with id " + str(customer_id) + " does not exist."
            )
        except FundsTransfer.DoesNotExist:
            raise Exceptions.ProcessingError(
                err_msg + " : FundsTransfer does not exist."
            )
        except Exception:
            raise Exceptions.ProcessingError(err_msg)

    def removeFundsTransfers(self, customer_id, funds_transfers_ids):

        err_msg = (
            "Failed to remove elements "
            + str(funds_transfers_ids)
            + " for FundsTransfers on Customer"
        )

        # lazy importing avoids circular dependenciesId
        try:
            # remove the children by id
            customer.funds_transfers.remove(funds_transfers_ids)

            # save it
            customer.save()

            # reload and return the appropriate version
            return self.get(customer_id)
        except Customer.DoesNotExist:
            raise Exceptions.ProcessingError(
                "Customer with id " + str(customer_id) + " does not exist."
            )
        except FundsTransfer.DoesNotExist:
            raise Exceptions.ProcessingError(
                "FundsTransfer with id " + str(funds_transfers_id) + " does not exist."
            )
        except utils.Exceptions.DatabaseError:
            raise Exceptions.StorageWriteError()
        except Exception:
            raise Exceptions.GeneralError(err_msg)

    def addDisputes(self, customer_id, disputes_ids):
        # lazy importing avoids circular dependencies
        from bankingOnDjango.delegates.DisputeDelegate import DisputeDelegate

        err_msg = (
            "Failed to add elements " + str(disputes_ids) + " for Disputes on Customer"
        )

        try:
            # get the Customer
            customer = self.get(customer_id).first()

            # add the children by id
            customer.disputes.add(disputes_ids)

            # save it
            customer.save()

            # reload and return the appropriate version
            return self.get(customer_id)
        except Customer.DoesNotExist:
            raise Exceptions.ProcessingError(
                err_msg + " : Customer with id " + str(customer_id) + " does not exist."
            )
        except Dispute.DoesNotExist:
            raise Exceptions.ProcessingError(err_msg + " : Dispute does not exist.")
        except Exception:
            raise Exceptions.ProcessingError(err_msg)

    def removeDisputes(self, customer_id, disputes_ids):

        err_msg = (
            "Failed to remove elements "
            + str(disputes_ids)
            + " for Disputes on Customer"
        )

        # lazy importing avoids circular dependenciesId
        try:
            # remove the children by id
            customer.disputes.remove(disputes_ids)

            # save it
            customer.save()

            # reload and return the appropriate version
            return self.get(customer_id)
        except Customer.DoesNotExist:
            raise Exceptions.ProcessingError(
                "Customer with id " + str(customer_id) + " does not exist."
            )
        except Dispute.DoesNotExist:
            raise Exceptions.ProcessingError(
                "Dispute with id " + str(disputes_id) + " does not exist."
            )
        except utils.Exceptions.DatabaseError:
            raise Exceptions.StorageWriteError()
        except Exception:
            raise Exceptions.GeneralError(err_msg)

    def addKycProfiles(self, customer_id, kyc_profiles_ids):
        # lazy importing avoids circular dependencies
        from bankingOnDjango.delegates.KycProfileDelegate import KycProfileDelegate

        err_msg = (
            "Failed to add elements "
            + str(kyc_profiles_ids)
            + " for KycProfiles on Customer"
        )

        try:
            # get the Customer
            customer = self.get(customer_id).first()

            # add the children by id
            customer.kyc_profiles.add(kyc_profiles_ids)

            # save it
            customer.save()

            # reload and return the appropriate version
            return self.get(customer_id)
        except Customer.DoesNotExist:
            raise Exceptions.ProcessingError(
                err_msg + " : Customer with id " + str(customer_id) + " does not exist."
            )
        except KycProfile.DoesNotExist:
            raise Exceptions.ProcessingError(err_msg + " : KycProfile does not exist.")
        except Exception:
            raise Exceptions.ProcessingError(err_msg)

    def removeKycProfiles(self, customer_id, kyc_profiles_ids):

        err_msg = (
            "Failed to remove elements "
            + str(kyc_profiles_ids)
            + " for KycProfiles on Customer"
        )

        # lazy importing avoids circular dependenciesId
        try:
            # remove the children by id
            customer.kyc_profiles.remove(kyc_profiles_ids)

            # save it
            customer.save()

            # reload and return the appropriate version
            return self.get(customer_id)
        except Customer.DoesNotExist:
            raise Exceptions.ProcessingError(
                "Customer with id " + str(customer_id) + " does not exist."
            )
        except KycProfile.DoesNotExist:
            raise Exceptions.ProcessingError(
                "KycProfile with id " + str(kyc_profiles_id) + " does not exist."
            )
        except utils.Exceptions.DatabaseError:
            raise Exceptions.StorageWriteError()
        except Exception:
            raise Exceptions.GeneralError(err_msg)

    def addConsents(self, customer_id, consents_ids):
        # lazy importing avoids circular dependencies
        from bankingOnDjango.delegates.ConsentDelegate import ConsentDelegate

        err_msg = (
            "Failed to add elements " + str(consents_ids) + " for Consents on Customer"
        )

        try:
            # get the Customer
            customer = self.get(customer_id).first()

            # add the children by id
            customer.consents.add(consents_ids)

            # save it
            customer.save()

            # reload and return the appropriate version
            return self.get(customer_id)
        except Customer.DoesNotExist:
            raise Exceptions.ProcessingError(
                err_msg + " : Customer with id " + str(customer_id) + " does not exist."
            )
        except Consent.DoesNotExist:
            raise Exceptions.ProcessingError(err_msg + " : Consent does not exist.")
        except Exception:
            raise Exceptions.ProcessingError(err_msg)

    def removeConsents(self, customer_id, consents_ids):

        err_msg = (
            "Failed to remove elements "
            + str(consents_ids)
            + " for Consents on Customer"
        )

        # lazy importing avoids circular dependenciesId
        try:
            # remove the children by id
            customer.consents.remove(consents_ids)

            # save it
            customer.save()

            # reload and return the appropriate version
            return self.get(customer_id)
        except Customer.DoesNotExist:
            raise Exceptions.ProcessingError(
                "Customer with id " + str(customer_id) + " does not exist."
            )
        except Consent.DoesNotExist:
            raise Exceptions.ProcessingError(
                "Consent with id " + str(consents_id) + " does not exist."
            )
        except utils.Exceptions.DatabaseError:
            raise Exceptions.StorageWriteError()
        except Exception:
            raise Exceptions.GeneralError(err_msg)
