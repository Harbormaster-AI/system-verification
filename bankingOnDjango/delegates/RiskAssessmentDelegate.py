from django.core import serializers
from django.db import models
from django.db import utils

from bankingOnDjango.models.RiskAssessment import RiskAssessment
from bankingOnDjango.models.KycProfile import KycProfile
from bankingOnDjango.exceptions import Exceptions

# ======================================================================
#
# Encapsulates data for model RiskAssessment
#
# @author Harbormaster Dev Team
#
# ======================================================================


# ======================================================================
# Class RiskAssessmentDelegate Declaration
# ======================================================================
class RiskAssessmentDelegate:

    # ======================================================================
    # Function Declarations
    # ======================================================================

    def get(self, risk_assessment_id):
        err_msg = "Failed to get RiskAssessment from db using id " + str(
            risk_assessment_id
        )
        try:
            risk_assessment = RiskAssessment.objects.filter(id=risk_assessment_id)
            return risk_assessment.first()
        except RiskAssessment.DoesNotExist:
            raise Exceptions.ProcessingError(
                "RiskAssessment with id " + str(risk_assessment_id) + " does not exist."
            )
        except utils.Exceptions.DatabaseError:
            raise Exceptions.StorageReadError()
        except Exception:
            raise Exceptions.GeneralError(err_msg)

    def createFromJson(self, risk_assessment):
        for model in serializers.deserialize("json", risk_assessment):
            model.save()
            return model

    def create(self, risk_assessment):
        risk_assessment.save()
        return risk_assessment

    def saveFromJson(self, risk_assessment):
        for model in serializers.deserialize("json", risk_assessment):
            model.save()
            return risk_assessment

    def save(self, risk_assessment):
        risk_assessment.save()
        return risk_assessment

    def delete(self, risk_assessment_id):
        err_msg = "Failed to delete RiskAssessment from db using id " + str(
            risk_assessment_id
        )

        try:
            risk_assessment = RiskAssessment.objects.get(id=risk_assessment_id)
            risk_assessment.delete()
            return True
        except RiskAssessment.DoesNotExist:
            raise Exceptions.ProcessingError(
                "RiskAssessment with id " + str(risk_assessment_id) + " does not exist."
            )
        except utils.Exceptions.DatabaseError:
            raise Exceptions.StorageReadError()
        except Exception:
            raise Exceptions.GeneralError(err_msg)

    def getAll(self):
        try:
            all = RiskAssessment.objects.all()
            return all
        except utils.Exceptions.DatabaseError:
            raise Exceptions.StorageReadError(
                "Failed to get all RiskAssessment from db"
            )
        except Exception:
            return None

    def assignKycProfile(self, risk_assessment_id, kyc_profile_id):
        # lazy importing avoids circular dependencies
        from bankingOnDjango.delegates.KycProfileDelegate import KycProfileDelegate

        err_msg = (
            "Failed to assign element "
            + str(kyc_profile_id)
            + " for KycProfile on RiskAssessment"
        )

        try:
            # get the RiskAssessment from db
            risk_assessment = self.get(risk_assessment_id).first()

            # get the KycProfile from db
            kyc_profile = KycProfileDelegate().get(kyc_profile_id).first()

            # assign the KycProfile
            risk_assessment.kyc_profile = kyc_profile

            # save it
            risk_assessment.save()

            # reload and return the appropriate version
            return self.get(risk_assessment_id)
        except RiskAssessment.DoesNotExist:
            raise Exceptions.ProcessingError(
                err_msg
                + " : RiskAssessment with id "
                + str(risk_assessment_id)
                + " does not exist."
            )
        except KycProfile.DoesNotExist:
            raise Exceptions.ProcessingError(
                err_msg
                + " : KycProfile with id "
                + str(kyc_profile_id)
                + " does not exist."
            )
        except Exception:
            return None

    def unassignKycProfile(self, risk_assessment_id):
        err_msg = (
            "Failed to unassign element "
            + str(kyc_profile_id)
            + " for KycProfile on RiskAssessment"
        )

        try:
            # get the RiskAssessment from db
            risk_assessment = self.get(risk_assessment_id).first()

            # assign to None for unassignment
            risk_assessment.kyc_profile = None

            # save it
            risk_assessment.save()

            # reload and return the appropriate version
            return self.get(risk_assessment_id)
        except RiskAssessment.DoesNotExist:
            raise Exceptions.ProcessingError(
                err_msg
                + " : RiskAssessment with id "
                + str(risk_assessment_id)
                + " does not exist."
            )
        except Exception:
            return None
