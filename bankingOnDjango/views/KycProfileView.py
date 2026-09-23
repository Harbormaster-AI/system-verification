import json

from django.core import serializers
from django.shortcuts import render
from django.http import HttpResponse

from bankingOnDjango.delegates.KycProfileDelegate import KycProfileDelegate

# ======================================================================
#
# Encapsulates data for View KycProfile
#
# @author Harbormaster Dev Team
#
# ======================================================================


# ======================================================================
# Class KycProfileView function declarations
# ======================================================================
def index(request):
    return HttpResponse("Hello, world. You're at the KycProfile index.")


def get(request):
    request_data = json.loads(request.body)
    kycProfile_id = request_data["id"]
    delegate = KycProfileDelegate()
    request_data = delegate.get(kycProfile_id)
    as_json = serializers.serialize("json", request_data)
    return HttpResponse(as_json, content_type="application/json")


def create(request):
    kycProfile = json.loads(request.body)
    delegate = KycProfileDelegate()
    request_data = delegate.createFromJson(kycProfile)
    as_json = serializers.serialize("json", request_data)
    return HttpResponse(as_json, content_type="application/json")


def update(request):
    kycProfile = json.loads(request.body)
    delegate = KycProfileDelegate()
    request_data = delegate.save(kycProfile)
    as_json = serializers.serialize("json", request_data)
    return HttpResponse(as_json, content_type="application/json")


def delete(request):
    request_data = json.loads(request.body)
    kycProfile_id = request_data["id"]
    delegate = KycProfileDelegate()
    request_data = delegate.delete(kycProfile_id)
    as_json = serializers.serialize("json", request_data)
    return HttpResponse(as_json, content_type="application/json")


def getAll(request):
    delegate = KycProfileDelegate()
    request_data = delegate.getAll()
    as_json = serializers.serialize("json", request_data)
    return HttpResponse(as_json, content_type="application/json")

    # ---------------------------------------------------------
    # Single association
    # ---------------------------------------------------------


def assignCustomer(request):
    request_data = json.loads(request.body)
    parent_id = request_data["parent_id"]
    child_id = request_data["childId"]
    delegate = KycProfileDelegate()
    request_data = delegate.assignCustomer(parent_id, childId)
    as_json = serializers.serialize("json", request_data)
    return HttpResponse(as_json, content_type="application/json")


def unassignCustomer(request):
    request_data = json.loads(request.body)
    parent_id = request_data["parent_id"]
    child_id = request_data["childId"]
    delegate = KycProfileDelegate()
    request_data = delegate.unassignCustomer(parent_id, childId)
    as_json = serializers.serialize("json", request_data)
    return HttpResponse(as_json, content_type="application/json")

    # ---------------------------------------------------------
    # Multiple association
    # ---------------------------------------------------------


def addIdentityDocuments(request):
    request_data = json.loads(request.body)
    parent_id = request_data["parent_id"]
    child_ids = request_data["child_ids"]
    delegate = KycProfileDelegate()
    request_data = delegate.addIdentityDocuments(parent_id, child_ids)
    as_json = serializers.serialize("json", request_data)
    return HttpResponse(as_json, content_type="application/json")


def removeIdentityDocuments(request):
    request_data = json.loads(request.body)
    parent_id = request_data["parent_id"]
    child_ids = request_data["child_ids"]
    delegate = KycProfileDelegate()
    request_data = delegate.removeIdentityDocuments(parent_id, child_ids)
    as_json = serializers.serialize("json", request_data)
    return HttpResponse(as_json, content_type="application/json")


def addRiskAssessments(request):
    request_data = json.loads(request.body)
    parent_id = request_data["parent_id"]
    child_ids = request_data["child_ids"]
    delegate = KycProfileDelegate()
    request_data = delegate.addRiskAssessments(parent_id, child_ids)
    as_json = serializers.serialize("json", request_data)
    return HttpResponse(as_json, content_type="application/json")


def removeRiskAssessments(request):
    request_data = json.loads(request.body)
    parent_id = request_data["parent_id"]
    child_ids = request_data["child_ids"]
    delegate = KycProfileDelegate()
    request_data = delegate.removeRiskAssessments(parent_id, child_ids)
    as_json = serializers.serialize("json", request_data)
    return HttpResponse(as_json, content_type="application/json")


def addScreenings(request):
    request_data = json.loads(request.body)
    parent_id = request_data["parent_id"]
    child_ids = request_data["child_ids"]
    delegate = KycProfileDelegate()
    request_data = delegate.addScreenings(parent_id, child_ids)
    as_json = serializers.serialize("json", request_data)
    return HttpResponse(as_json, content_type="application/json")


def removeScreenings(request):
    request_data = json.loads(request.body)
    parent_id = request_data["parent_id"]
    child_ids = request_data["child_ids"]
    delegate = KycProfileDelegate()
    request_data = delegate.removeScreenings(parent_id, child_ids)
    as_json = serializers.serialize("json", request_data)
    return HttpResponse(as_json, content_type="application/json")
