import json

from django.core import serializers
from django.shortcuts import render
from django.http import HttpResponse

from bankingOnDjango.delegates.ExternalAccountDelegate import ExternalAccountDelegate

# ======================================================================
#
# Encapsulates data for View ExternalAccount
#
# @author Harbormaster Dev Team
#
# ======================================================================


# ======================================================================
# Class ExternalAccountView function declarations
# ======================================================================
def index(request):
    return HttpResponse("Hello, world. You're at the ExternalAccount index.")


def get(request):
    request_data = json.loads(request.body)
    externalAccount_id = request_data["id"]
    delegate = ExternalAccountDelegate()
    request_data = delegate.get(externalAccount_id)
    as_json = serializers.serialize("json", request_data)
    return HttpResponse(as_json, content_type="application/json")


def create(request):
    externalAccount = json.loads(request.body)
    delegate = ExternalAccountDelegate()
    request_data = delegate.createFromJson(externalAccount)
    as_json = serializers.serialize("json", request_data)
    return HttpResponse(as_json, content_type="application/json")


def update(request):
    externalAccount = json.loads(request.body)
    delegate = ExternalAccountDelegate()
    request_data = delegate.save(externalAccount)
    as_json = serializers.serialize("json", request_data)
    return HttpResponse(as_json, content_type="application/json")


def delete(request):
    request_data = json.loads(request.body)
    externalAccount_id = request_data["id"]
    delegate = ExternalAccountDelegate()
    request_data = delegate.delete(externalAccount_id)
    as_json = serializers.serialize("json", request_data)
    return HttpResponse(as_json, content_type="application/json")


def getAll(request):
    delegate = ExternalAccountDelegate()
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
    delegate = ExternalAccountDelegate()
    request_data = delegate.assignCustomer(parent_id, childId)
    as_json = serializers.serialize("json", request_data)
    return HttpResponse(as_json, content_type="application/json")


def unassignCustomer(request):
    request_data = json.loads(request.body)
    parent_id = request_data["parent_id"]
    child_id = request_data["childId"]
    delegate = ExternalAccountDelegate()
    request_data = delegate.unassignCustomer(parent_id, childId)
    as_json = serializers.serialize("json", request_data)
    return HttpResponse(as_json, content_type="application/json")

    # ---------------------------------------------------------
    # Multiple association
    # ---------------------------------------------------------


def addTransactions(request):
    request_data = json.loads(request.body)
    parent_id = request_data["parent_id"]
    child_ids = request_data["child_ids"]
    delegate = ExternalAccountDelegate()
    request_data = delegate.addTransactions(parent_id, child_ids)
    as_json = serializers.serialize("json", request_data)
    return HttpResponse(as_json, content_type="application/json")


def removeTransactions(request):
    request_data = json.loads(request.body)
    parent_id = request_data["parent_id"]
    child_ids = request_data["child_ids"]
    delegate = ExternalAccountDelegate()
    request_data = delegate.removeTransactions(parent_id, child_ids)
    as_json = serializers.serialize("json", request_data)
    return HttpResponse(as_json, content_type="application/json")
