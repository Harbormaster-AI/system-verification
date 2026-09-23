import json

from django.core import serializers
from django.shortcuts import render
from django.http import HttpResponse

from bankingOnDjango.delegates.ConsentDelegate import ConsentDelegate

# ======================================================================
#
# Encapsulates data for View Consent
#
# @author Harbormaster Dev Team
#
# ======================================================================


# ======================================================================
# Class ConsentView function declarations
# ======================================================================
def index(request):
    return HttpResponse("Hello, world. You're at the Consent index.")


def get(request):
    request_data = json.loads(request.body)
    consent_id = request_data["id"]
    delegate = ConsentDelegate()
    request_data = delegate.get(consent_id)
    as_json = serializers.serialize("json", request_data)
    return HttpResponse(as_json, content_type="application/json")


def create(request):
    consent = json.loads(request.body)
    delegate = ConsentDelegate()
    request_data = delegate.createFromJson(consent)
    as_json = serializers.serialize("json", request_data)
    return HttpResponse(as_json, content_type="application/json")


def update(request):
    consent = json.loads(request.body)
    delegate = ConsentDelegate()
    request_data = delegate.save(consent)
    as_json = serializers.serialize("json", request_data)
    return HttpResponse(as_json, content_type="application/json")


def delete(request):
    request_data = json.loads(request.body)
    consent_id = request_data["id"]
    delegate = ConsentDelegate()
    request_data = delegate.delete(consent_id)
    as_json = serializers.serialize("json", request_data)
    return HttpResponse(as_json, content_type="application/json")


def getAll(request):
    delegate = ConsentDelegate()
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
    delegate = ConsentDelegate()
    request_data = delegate.assignCustomer(parent_id, childId)
    as_json = serializers.serialize("json", request_data)
    return HttpResponse(as_json, content_type="application/json")


def unassignCustomer(request):
    request_data = json.loads(request.body)
    parent_id = request_data["parent_id"]
    child_id = request_data["childId"]
    delegate = ConsentDelegate()
    request_data = delegate.unassignCustomer(parent_id, childId)
    as_json = serializers.serialize("json", request_data)
    return HttpResponse(as_json, content_type="application/json")


def assignBank(request):
    request_data = json.loads(request.body)
    parent_id = request_data["parent_id"]
    child_id = request_data["childId"]
    delegate = ConsentDelegate()
    request_data = delegate.assignBank(parent_id, childId)
    as_json = serializers.serialize("json", request_data)
    return HttpResponse(as_json, content_type="application/json")


def unassignBank(request):
    request_data = json.loads(request.body)
    parent_id = request_data["parent_id"]
    child_id = request_data["childId"]
    delegate = ConsentDelegate()
    request_data = delegate.unassignBank(parent_id, childId)
    as_json = serializers.serialize("json", request_data)
    return HttpResponse(as_json, content_type="application/json")


def assignThirdPartyProvider(request):
    request_data = json.loads(request.body)
    parent_id = request_data["parent_id"]
    child_id = request_data["childId"]
    delegate = ConsentDelegate()
    request_data = delegate.assignThirdPartyProvider(parent_id, childId)
    as_json = serializers.serialize("json", request_data)
    return HttpResponse(as_json, content_type="application/json")


def unassignThirdPartyProvider(request):
    request_data = json.loads(request.body)
    parent_id = request_data["parent_id"]
    child_id = request_data["childId"]
    delegate = ConsentDelegate()
    request_data = delegate.unassignThirdPartyProvider(parent_id, childId)
    as_json = serializers.serialize("json", request_data)
    return HttpResponse(as_json, content_type="application/json")

    # ---------------------------------------------------------
    # Multiple association
    # ---------------------------------------------------------


def addAuthorizedAccounts(request):
    request_data = json.loads(request.body)
    parent_id = request_data["parent_id"]
    child_ids = request_data["child_ids"]
    delegate = ConsentDelegate()
    request_data = delegate.addAuthorizedAccounts(parent_id, child_ids)
    as_json = serializers.serialize("json", request_data)
    return HttpResponse(as_json, content_type="application/json")


def removeAuthorizedAccounts(request):
    request_data = json.loads(request.body)
    parent_id = request_data["parent_id"]
    child_ids = request_data["child_ids"]
    delegate = ConsentDelegate()
    request_data = delegate.removeAuthorizedAccounts(parent_id, child_ids)
    as_json = serializers.serialize("json", request_data)
    return HttpResponse(as_json, content_type="application/json")
