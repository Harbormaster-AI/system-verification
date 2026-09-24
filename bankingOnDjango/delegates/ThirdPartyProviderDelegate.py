from django.core import exceptions
from django.core import serializers
from django.db import models
from django.db import utils

from bankingOnDjango.models.ThirdPartyProvider import ThirdPartyProvider
from bankingOnDjango.models.Bank import Bank
from bankingOnDjango.models.Consent import Consent
from bankingOnDjango.exceptions import Exceptions

# ======================================================================
#
# Encapsulates data for model ThirdPartyProvider
#
# @author Harbormaster Dev Team
#
# ======================================================================


# ======================================================================
# Class ThirdPartyProviderDelegate Declaration
# ======================================================================
class ThirdPartyProviderDelegate:

    # ======================================================================
    # Function Declarations
    # ======================================================================

    def get(self, third_party_provider_id):
        err_msg = "Failed to get ThirdPartyProvider from db using id " + str(
            third_party_provider_id
        )
        try:
            third_party_provider = ThirdPartyProvider.objects.filter(
                id=third_party_provider_id
            )
            return third_party_provider.first()
        except ThirdPartyProvider.DoesNotExist:
            raise Exceptions.ProcessingError(
                "ThirdPartyProvider with id "
                + str(third_party_provider_id)
                + " does not exist."
            )
        except utils.Exceptions.DatabaseError:
            raise Exceptions.StorageReadError()
        except Exception:
            raise Exceptions.GeneralError(err_msg)

    def createFromJson(self, third_party_provider):
        for model in serializers.deserialize("json", third_party_provider):
            model.save()
            return model

    def create(self, third_party_provider):
        third_party_provider.save()
        return third_party_provider

    def saveFromJson(self, third_party_provider):
        for model in serializers.deserialize("json", third_party_provider):
            model.save()
            return third_party_provider

    def save(self, third_party_provider):
        third_party_provider.save()
        return third_party_provider

    def delete(self, third_party_provider_id):
        err_msg = "Failed to delete ThirdPartyProvider from db using id " + str(
            third_party_provider_id
        )

        try:
            third_party_provider = ThirdPartyProvider.objects.get(
                id=third_party_provider_id
            )
            third_party_provider.delete()
            return True
        except ThirdPartyProvider.DoesNotExist:
            raise Exceptions.ProcessingError(
                "ThirdPartyProvider with id "
                + str(third_party_provider_id)
                + " does not exist."
            )
        except utils.Exceptions.DatabaseError:
            raise Exceptions.StorageReadError()
        except Exception:
            raise Exceptions.GeneralError(err_msg)

    def getAll(self):
        try:
            all = ThirdPartyProvider.objects.all()
            return all
        except utils.Exceptions.DatabaseError:
            raise Exceptions.StorageReadError(
                "Failed to get all ThirdPartyProvider from db"
            )
        except Exception:
            return None

    def assignBank(self, third_party_provider_id, bankId):
        # lazy importing avoids circular dependencies
        from bankingOnDjango.delegates.BankDelegate import BankDelegate

        err_msg = (
            "Failed to assign element "
            + str(bankId)
            + " for Bank on ThirdPartyProvider"
        )

        try:
            # get the ThirdPartyProvider from db
            third_party_provider = self.get(third_party_provider_id).first()

            # get the Bank from db
            bank = BankDelegate().get(bankId).first()

            # assign the Bank
            third_party_provider.bank = bank

            # save it
            third_party_provider.save()

            # reload and return the appropriate version
            return self.get(third_party_provider_id)
        except ThirdPartyProvider.DoesNotExist:
            raise Exceptions.ProcessingError(
                err_msg
                + " : ThirdPartyProvider with id "
                + str(third_party_provider_id)
                + " does not exist."
            )
        except Bank.DoesNotExist:
            raise Exceptions.ProcessingError(
                err_msg + " : Bank with id " + str(bankId) + " does not exist."
            )
        except Exception:
            return None

    def unassignBank(self, third_party_provider_id):
        err_msg = (
            "Failed to unassign element "
            + str(bankId)
            + " for Bank on ThirdPartyProvider"
        )

        try:
            # get the ThirdPartyProvider from db
            third_party_provider = self.get(third_party_provider_id).first()

            # assign to None for unassignment
            third_party_provider.bank = None

            # save it
            third_party_provider.save()

            # reload and return the appropriate version
            return self.get(third_party_provider_id)
        except ThirdPartyProvider.DoesNotExist:
            raise Exceptions.ProcessingError(
                err_msg
                + " : ThirdPartyProvider with id "
                + str(third_party_provider_id)
                + " does not exist."
            )
        except Exception:
            return None

    def addConsents(self, third_party_provider_id, consentsIds):
        # lazy importing avoids circular dependencies
        from bankingOnDjango.delegates.ConsentDelegate import ConsentDelegate

        err_msg = (
            "Failed to add elements "
            + str(consentsIds)
            + " for Consents on ThirdPartyProvider"
        )

        try:
            # get the ThirdPartyProvider
            third_party_provider = self.get(third_party_provider_id).first()

            # iterate over ids
            for id in consentsIds:
                # read the Consent
                consent = ConsentDelegate().get(id).first()
                # add the Consent
                third_party_provider.consents.add(consent)

            # save it
            third_party_provider.save()

            # reload and return the appropriate version
            return self.get(third_party_provider_id)
        except ThirdPartyProvider.DoesNotExist:
            raise Exceptions.ProcessingError(
                err_msg
                + " : ThirdPartyProvider with id "
                + str(third_party_provider_id)
                + " does not exist."
            )
        except Consent.DoesNotExist:
            raise Exceptions.ProcessingError(err_msg + " : Consent does not exist.")
        except Exception:
            raise Exceptions.ProcessingError(err_msg)

    def removeConsents(self, third_party_provider_id, consentsIds):
        # lazy importing avoids circular dependencies
        from bankingOnDjango.delegates.ConsentDelegate import ConsentDelegate

        err_msg = (
            "Failed to remove elements "
            + str(consentsIds)
            + " for Consents on ThirdPartyProvider"
        )

        try:
            # get the ThirdPartyProvider
            third_party_provider = self.get(third_party_provider_id).first()

            # iterate over ids
            for id in consentsIds:
                # read the Consent
                consent = ConsentDelegate().get(id).first()
                # add the Consent
                third_party_provider.consents.remove(consent)

            # save it
            third_party_provider.save()

            # reload and return the appropriate version
            return self.get(third_party_provider_id)
        except ThirdPartyProvider.DoesNotExist:
            raise Exceptions.ProcessingError(
                err_msg
                + " : ThirdPartyProvider with id "
                + str(third_party_provider_id)
                + " does not exist."
            )
        except Consent.DoesNotExist:
            raise Exceptions.ProcessingError(err_msg + " : Consent does not exist.")
        except utils.Exceptions.DatabaseError:
            raise StorageWriteError()
        except Exception:
            raise Exceptions.GeneralError(err_msg)
