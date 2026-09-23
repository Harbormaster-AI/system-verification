import json

from django.core import serializers
from django.shortcuts import render
from django.http import HttpResponse

from bankingOnDjango.delegates.IdentityDocumentDelegate import IdentityDocumentDelegate

# ======================================================================
#
# Encapsulates data for View IdentityDocument
#
# @author Harbormaster Dev Team
#
# ======================================================================


# ======================================================================
# Class IdentityDocumentView function declarations
# ======================================================================
def index(request):
    return HttpResponse("Hello, world. You're at the IdentityDocument index.")


def get(request):
    request_data = json.loads(request.body)
    identityDocument_id = request_data["id"]
    delegate = IdentityDocumentDelegate()
    request_data = delegate.get(identityDocument_id)
    as_json = serializers.serialize("json", request_data)
    return HttpResponse(as_json, content_type="application/json")


def create(request):
    identityDocument = json.loads(request.body)
    delegate = IdentityDocumentDelegate()
    request_data = delegate.createFromJson(identityDocument)
    as_json = serializers.serialize("json", request_data)
    return HttpResponse(as_json, content_type="application/json")


def update(request):
    identityDocument = json.loads(request.body)
    delegate = IdentityDocumentDelegate()
    request_data = delegate.save(identityDocument)
    as_json = serializers.serialize("json", request_data)
    return HttpResponse(as_json, content_type="application/json")


def delete(request):
    request_data = json.loads(request.body)
    identityDocument_id = request_data["id"]
    delegate = IdentityDocumentDelegate()
    request_data = delegate.delete(identityDocument_id)
    as_json = serializers.serialize("json", request_data)
    return HttpResponse(as_json, content_type="application/json")


def getAll(request):
    delegate = IdentityDocumentDelegate()
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
    delegate = IdentityDocumentDelegate()
    request_data = delegate.assignKycProfile(parent_id, childId)
    as_json = serializers.serialize("json", request_data)
    return HttpResponse(as_json, content_type="application/json")


def unassignKycProfile(request):
    request_data = json.loads(request.body)
    parent_id = request_data["parent_id"]
    child_id = request_data["childId"]
    delegate = IdentityDocumentDelegate()
    request_data = delegate.unassignKycProfile(parent_id, childId)
    as_json = serializers.serialize("json", request_data)
    return HttpResponse(as_json, content_type="application/json")

    # ---------------------------------------------------------
    # Multiple association
    # ---------------------------------------------------------
