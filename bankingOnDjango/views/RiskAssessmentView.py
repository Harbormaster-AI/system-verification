import json

from django.core import serializers

from django.http import HttpResponse

from bankingOnDjango.delegates.RiskAssessmentDelegate import RiskAssessmentDelegate

# ======================================================================
#
# Encapsulates data for View RiskAssessment
#
# @author Harbormaster Dev Team
#
# ======================================================================


# ======================================================================
# Class RiskAssessmentView function declarations
# ======================================================================
def index(request):
    return HttpResponse("Hello, world. You're at the RiskAssessment index.")


def get(request):
    request_data = json.loads(request.body)
    risk_assessment_id = request_data["id"]
    delegate = RiskAssessmentDelegate()
    request_data = delegate.get(risk_assessment_id)
    as_json = serializers.serialize("json", request_data)
    return HttpResponse(as_json, content_type="application/json")


def create(request):
    risk_assessment = json.loads(request.body)
    delegate = RiskAssessmentDelegate()
    request_data = delegate.createFromJson(risk_assessment)
    as_json = serializers.serialize("json", request_data)
    return HttpResponse(as_json, content_type="application/json")


def update(request):
    risk_assessment = json.loads(request.body)
    delegate = RiskAssessmentDelegate()
    request_data = delegate.save(risk_assessment)
    as_json = serializers.serialize("json", request_data)
    return HttpResponse(as_json, content_type="application/json")


def delete(request):
    request_data = json.loads(request.body)
    risk_assessment_id = request_data["id"]
    delegate = RiskAssessmentDelegate()
    request_data = delegate.delete(risk_assessment_id)
    as_json = serializers.serialize("json", request_data)
    return HttpResponse(as_json, content_type="application/json")


def getAll(request):
    delegate = RiskAssessmentDelegate()
    request_data = delegate.getAll()
    as_json = serializers.serialize("json", request_data)
    return HttpResponse(as_json, content_type="application/json")

    # ---------------------------------------------------------
    # Single association
    # ---------------------------------------------------------


def assignKycProfile(request):
    request_data = json.loads(request.body)
    parent_id = request_data["parent_id"]
    child_id = request_data["childId"]
    delegate = RiskAssessmentDelegate()
    request_data = delegate.assignKycProfile(parent_id, child_id)
    as_json = serializers.serialize("json", request_data)
    return HttpResponse(as_json, content_type="application/json")


def unassignKycProfile(request):
    request_data = json.loads(request.body)
    parent_id = request_data["parent_id"]
    child_id = request_data["childId"]
    delegate = RiskAssessmentDelegate()
    request_data = delegate.unassignKycProfile(parent_id, child_id)
    as_json = serializers.serialize("json", request_data)
    return HttpResponse(as_json, content_type="application/json")

    # ---------------------------------------------------------
    # Multiple association
    # ---------------------------------------------------------
