from django.core import exceptions
from django.core import serializers
from django.db import models
from django.db import utils

from bankingOnDjango.models.IdentityDocument import IdentityDocument
from bankingOnDjango.models.KycProfile import KycProfile
from bankingOnDjango.exceptions import Exceptions

# ======================================================================
#
# Encapsulates data for model IdentityDocument
#
# @author Harbormaster Dev Team
#
# ======================================================================


# ======================================================================
# Class IdentityDocumentDelegate Declaration
# ======================================================================
class IdentityDocumentDelegate:

    # ======================================================================
    # Function Declarations
    # ======================================================================

    def get(self, identity_document_id):
        err_msg = "Failed to get IdentityDocument from db using id " + str(
            identity_document_id
        )
        try:
            identity_document = IdentityDocument.objects.filter(id=identity_document_id)
            return identity_document.first()
        except IdentityDocument.DoesNotExist:
            raise Exceptions.ProcessingError(
                "IdentityDocument with id "
                + str(identity_document_id)
                + " does not exist."
            )
        except utils.Exceptions.DatabaseError:
            raise Exceptions.StorageReadError()
        except Exception:
            raise Exceptions.GeneralError(err_msg)

    def createFromJson(self, identity_document):
        for model in serializers.deserialize("json", identity_document):
            model.save()
            return model

    def create(self, identity_document):
        identity_document.save()
        return identity_document

    def saveFromJson(self, identity_document):
        for model in serializers.deserialize("json", identity_document):
            model.save()
            return identity_document

    def save(self, identity_document):
        identity_document.save()
        return identity_document

    def delete(self, identity_document_id):
        err_msg = "Failed to delete IdentityDocument from db using id " + str(
            identity_document_id
        )

        try:
            identity_document = IdentityDocument.objects.get(id=identity_document_id)
            identity_document.delete()
            return True
        except IdentityDocument.DoesNotExist:
            raise Exceptions.ProcessingError(
                "IdentityDocument with id "
                + str(identity_document_id)
                + " does not exist."
            )
        except utils.Exceptions.DatabaseError:
            raise Exceptions.StorageReadError()
        except Exception:
            raise Exceptions.GeneralError(err_msg)

    def getAll(self):
        try:
            all = IdentityDocument.objects.all()
            return all
        except utils.Exceptions.DatabaseError:
            raise Exceptions.StorageReadError(
                "Failed to get all IdentityDocument from db"
            )
        except Exception:
            return None

    def assignKycProfile(self, identity_document_id, kycProfileId):
        # lazy importing avoids circular dependencies
        from bankingOnDjango.delegates.KycProfileDelegate import KycProfileDelegate

        err_msg = (
            "Failed to assign element "
            + str(kycProfileId)
            + " for KycProfile on IdentityDocument"
        )

        try:
            # get the IdentityDocument from db
            identity_document = self.get(identity_document_id).first()

            # get the KycProfile from db
            kycProfile = KycProfileDelegate().get(kycProfileId).first()

            # assign the KycProfile
            identity_document.kycProfile = kycProfile

            # save it
            identity_document.save()

            # reload and return the appropriate version
            return self.get(identity_document_id)
        except IdentityDocument.DoesNotExist:
            raise Exceptions.ProcessingError(
                err_msg
                + " : IdentityDocument with id "
                + str(identity_document_id)
                + " does not exist."
            )
        except KycProfile.DoesNotExist:
            raise Exceptions.ProcessingError(
                err_msg
                + " : KycProfile with id "
                + str(kycProfileId)
                + " does not exist."
            )
        except Exception:
            return None

    def unassignKycProfile(self, identity_document_id):
        err_msg = (
            "Failed to unassign element "
            + str(kycProfileId)
            + " for KycProfile on IdentityDocument"
        )

        try:
            # get the IdentityDocument from db
            identity_document = self.get(identity_document_id).first()

            # assign to None for unassignment
            identity_document.kycProfile = None

            # save it
            identity_document.save()

            # reload and return the appropriate version
            return self.get(identity_document_id)
        except IdentityDocument.DoesNotExist:
            raise Exceptions.ProcessingError(
                err_msg
                + " : IdentityDocument with id "
                + str(identity_document_id)
                + " does not exist."
            )
        except Exception:
            return None
