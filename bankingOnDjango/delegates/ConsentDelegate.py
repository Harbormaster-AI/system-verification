from django.core import serializers
from django.db import models
from django.db import utils

from bankingOnDjango.models.Consent import Consent
from bankingOnDjango.models.Customer import Customer
from bankingOnDjango.models.Bank import Bank
from bankingOnDjango.models.Account import Account
from bankingOnDjango.models.ThirdPartyProvider import ThirdPartyProvider
from bankingOnDjango.exceptions import Exceptions

# ======================================================================
#
# Encapsulates data for model Consent
#
# @author Harbormaster Dev Team
#
# ======================================================================


# ======================================================================
# Class ConsentDelegate Declaration
# ======================================================================
class ConsentDelegate:

    # ======================================================================
    # Function Declarations
    # ======================================================================

    def get(self, consent_id):
        err_msg = "Failed to get Consent from db using id " + str(consent_id)
        try:
            consent = Consent.objects.filter(id=consent_id)
            return consent.first()
        except Consent.DoesNotExist:
            raise Exceptions.ProcessingError(
                "Consent with id " + str(consent_id) + " does not exist."
            )
        except utils.Exceptions.DatabaseError:
            raise Exceptions.StorageReadError()
        except Exception:
            raise Exceptions.GeneralError(err_msg)

    def createFromJson(self, consent):
        for model in serializers.deserialize("json", consent):
            model.save()
            return model

    def create(self, consent):
        consent.save()
        return consent

    def saveFromJson(self, consent):
        for model in serializers.deserialize("json", consent):
            model.save()
            return consent

    def save(self, consent):
        consent.save()
        return consent

    def delete(self, consent_id):
        err_msg = "Failed to delete Consent from db using id " + str(consent_id)

        try:
            consent = Consent.objects.get(id=consent_id)
            consent.delete()
            return True
        except Consent.DoesNotExist:
            raise Exceptions.ProcessingError(
                "Consent with id " + str(consent_id) + " does not exist."
            )
        except utils.Exceptions.DatabaseError:
            raise Exceptions.StorageReadError()
        except Exception:
            raise Exceptions.GeneralError(err_msg)

    def getAll(self):
        try:
            all = Consent.objects.all()
            return all
        except utils.Exceptions.DatabaseError:
            raise Exceptions.StorageReadError("Failed to get all Consent from db")
        except Exception:
            return None

    def assignCustomer(self, consent_id, customer_id):
        # lazy importing avoids circular dependencies
        from bankingOnDjango.delegates.CustomerDelegate import CustomerDelegate

        err_msg = (
            "Failed to assign element " + str(customer_id) + " for Customer on Consent"
        )

        try:
            # get the Consent from db
            consent = self.get(consent_id).first()

            # get the Customer from db
            customer = CustomerDelegate().get(customer_id).first()

            # assign the Customer
            consent.customer = customer

            # save it
            consent.save()

            # reload and return the appropriate version
            return self.get(consent_id)
        except Consent.DoesNotExist:
            raise Exceptions.ProcessingError(
                err_msg + " : Consent with id " + str(consent_id) + " does not exist."
            )
        except Customer.DoesNotExist:
            raise Exceptions.ProcessingError(
                err_msg + " : Customer with id " + str(customer_id) + " does not exist."
            )
        except Exception:
            return None

    def unassignCustomer(self, consent_id):
        err_msg = (
            "Failed to unassign element "
            + str(customer_id)
            + " for Customer on Consent"
        )

        try:
            # get the Consent from db
            consent = self.get(consent_id).first()

            # assign to None for unassignment
            consent.customer = None

            # save it
            consent.save()

            # reload and return the appropriate version
            return self.get(consent_id)
        except Consent.DoesNotExist:
            raise Exceptions.ProcessingError(
                err_msg + " : Consent with id " + str(consent_id) + " does not exist."
            )
        except Exception:
            return None

    def assignBank(self, consent_id, bank_id):
        # lazy importing avoids circular dependencies
        from bankingOnDjango.delegates.BankDelegate import BankDelegate

        err_msg = "Failed to assign element " + str(bank_id) + " for Bank on Consent"

        try:
            # get the Consent from db
            consent = self.get(consent_id).first()

            # get the Bank from db
            bank = BankDelegate().get(bank_id).first()

            # assign the Bank
            consent.bank = bank

            # save it
            consent.save()

            # reload and return the appropriate version
            return self.get(consent_id)
        except Consent.DoesNotExist:
            raise Exceptions.ProcessingError(
                err_msg + " : Consent with id " + str(consent_id) + " does not exist."
            )
        except Bank.DoesNotExist:
            raise Exceptions.ProcessingError(
                err_msg + " : Bank with id " + str(bank_id) + " does not exist."
            )
        except Exception:
            return None

    def unassignBank(self, consent_id):
        err_msg = "Failed to unassign element " + str(bank_id) + " for Bank on Consent"

        try:
            # get the Consent from db
            consent = self.get(consent_id).first()

            # assign to None for unassignment
            consent.bank = None

            # save it
            consent.save()

            # reload and return the appropriate version
            return self.get(consent_id)
        except Consent.DoesNotExist:
            raise Exceptions.ProcessingError(
                err_msg + " : Consent with id " + str(consent_id) + " does not exist."
            )
        except Exception:
            return None

    def assignThirdPartyProvider(self, consent_id, third_party_provider_id):
        # lazy importing avoids circular dependencies
        from bankingOnDjango.delegates.ThirdPartyProviderDelegate import (
            ThirdPartyProviderDelegate,
        )

        err_msg = (
            "Failed to assign element "
            + str(third_party_provider_id)
            + " for ThirdPartyProvider on Consent"
        )

        try:
            # get the Consent from db
            consent = self.get(consent_id).first()

            # get the ThirdPartyProvider from db
            third_party_provider = (
                ThirdPartyProviderDelegate().get(third_party_provider_id).first()
            )

            # assign the ThirdPartyProvider
            consent.third_party_provider = third_party_provider

            # save it
            consent.save()

            # reload and return the appropriate version
            return self.get(consent_id)
        except Consent.DoesNotExist:
            raise Exceptions.ProcessingError(
                err_msg + " : Consent with id " + str(consent_id) + " does not exist."
            )
        except ThirdPartyProvider.DoesNotExist:
            raise Exceptions.ProcessingError(
                err_msg
                + " : ThirdPartyProvider with id "
                + str(third_party_provider_id)
                + " does not exist."
            )
        except Exception:
            return None

    def unassignThirdPartyProvider(self, consent_id):
        err_msg = (
            "Failed to unassign element "
            + str(third_party_provider_id)
            + " for ThirdPartyProvider on Consent"
        )

        try:
            # get the Consent from db
            consent = self.get(consent_id).first()

            # assign to None for unassignment
            consent.third_party_provider = None

            # save it
            consent.save()

            # reload and return the appropriate version
            return self.get(consent_id)
        except Consent.DoesNotExist:
            raise Exceptions.ProcessingError(
                err_msg + " : Consent with id " + str(consent_id) + " does not exist."
            )
        except Exception:
            return None

    def addAuthorizedAccounts(self, consent_id, authorized_accounts_ids):
        # lazy importing avoids circular dependencies
        from bankingOnDjango.delegates.AccountDelegate import AccountDelegate

        err_msg = (
            "Failed to add elements "
            + str(authorized_accounts_ids)
            + " for AuthorizedAccounts on Consent"
        )

        try:
            # get the Consent
            consent = self.get(consent_id).first()

            # iterate over ids
            for id in authorized_accounts_ids:
                # read the Account
                account = AccountDelegate().get(id).first()
                # add the Account
                consent.authorized_accounts.add(account)

            # save it
            consent.save()

            # reload and return the appropriate version
            return self.get(consent_id)
        except Consent.DoesNotExist:
            raise Exceptions.ProcessingError(
                err_msg + " : Consent with id " + str(consent_id) + " does not exist."
            )
        except Account.DoesNotExist:
            raise Exceptions.ProcessingError(err_msg + " : Account does not exist.")
        except Exception:
            raise Exceptions.ProcessingError(err_msg)

    def removeAuthorizedAccounts(self, consent_id, authorized_accounts_ids):
        # lazy importing avoids circular dependenciesId
        try:
            # reload and return the appropriate version
            return self.get(consent_id)
        except Consent.DoesNotExist:
            raise Exceptions.ProcessingError(
                "Consent with id " + str(consent_id) + " does not exist."
            )
        except Account.DoesNotExist:
            raise Exceptions.ProcessingError(
                "Account with id " + str(authorized_accounts_id) + " does not exist."
            )
        except utils.Exceptions.DatabaseError:
            raise Exceptions.StorageWriteError()
        except Exception:
            raise Exceptions.GeneralError(err_msg)
