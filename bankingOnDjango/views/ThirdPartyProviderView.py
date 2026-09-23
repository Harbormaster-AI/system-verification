import json

from django.core import serializers
from django.http import HttpResponse

from bankingOnDjango.delegates.ThirdPartyProviderDelegate import (
    ThirdPartyProviderDelegate,
)

# ======================================================================
#
# Encapsulates data for View ThirdPartyProvider
#
# @author Harbormaster Dev Team
#
# ======================================================================


# ======================================================================
# Class ThirdPartyProviderView function declarations
# ======================================================================
def index(request):
    return HttpResponse("Hello, world. You're at the ThirdPartyProvider index.")


def get(request):
    request_data = json.loads(request.body)
    third_party_provider_id = request_data["id"]
    delegate = ThirdPartyProviderDelegate()
    request_data = delegate.get(third_party_provider_id)
    as_json = serializers.serialize("json", request_data)
    return HttpResponse(as_json, content_type="application/json")


def create(request):
    third_party_provider = json.loads(request.body)
    delegate = ThirdPartyProviderDelegate()
    request_data = delegate.createFromJson(third_party_provider)
    as_json = serializers.serialize("json", request_data)
    return HttpResponse(as_json, content_type="application/json")


def update(request):
    third_party_provider = json.loads(request.body)
    delegate = ThirdPartyProviderDelegate()
    request_data = delegate.save(third_party_provider)
    as_json = serializers.serialize("json", request_data)
    return HttpResponse(as_json, content_type="application/json")


def delete(request):
    request_data = json.loads(request.body)
    third_party_provider_id = request_data["id"]
    delegate = ThirdPartyProviderDelegate()
    request_data = delegate.delete(third_party_provider_id)
    as_json = serializers.serialize("json", request_data)
    return HttpResponse(as_json, content_type="application/json")


def getAll(request):
    delegate = ThirdPartyProviderDelegate()
    request_data = delegate.getAll()
    as_json = serializers.serialize("json", request_data)
    return HttpResponse(as_json, content_type="application/json")

    # ---------------------------------------------------------
    # Single association
    # ---------------------------------------------------------


def assignBank(request):
    request_data = json.loads(request.body)
    parent_id = request_data["parent_id"]
    child_id = request_data["childId"]
    delegate = ThirdPartyProviderDelegate()
    request_data = delegate.assignBank(parent_id, child_id)
    as_json = serializers.serialize("json", request_data)
    return HttpResponse(as_json, content_type="application/json")


def unassignBank(request):
    request_data = json.loads(request.body)
    parent_id = request_data["parent_id"]
    child_id = request_data["childId"]
    delegate = ThirdPartyProviderDelegate()
    request_data = delegate.unassignBank(parent_id, child_id)
    as_json = serializers.serialize("json", request_data)
    return HttpResponse(as_json, content_type="application/json")

    # ---------------------------------------------------------
    # Multiple association
    # ---------------------------------------------------------


def addConsents(request):
    request_data = json.loads(request.body)
    parent_id = request_data["parent_id"]
    child_ids = request_data["child_ids"]
    delegate = ThirdPartyProviderDelegate()
    request_data = delegate.addConsents(parent_id, child_ids)
    as_json = serializers.serialize("json", request_data)
    return HttpResponse(as_json, content_type="application/json")


def removeConsents(request):
    request_data = json.loads(request.body)
    parent_id = request_data["parent_id"]
    child_ids = request_data["child_ids"]
    delegate = ThirdPartyProviderDelegate()
    request_data = delegate.removeConsents(parent_id, child_ids)
    as_json = serializers.serialize("json", request_data)
    return HttpResponse(as_json, content_type="application/json")
