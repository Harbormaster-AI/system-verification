import json

from django.core import serializers
from django.shortcuts import render
from django.http import HttpResponse

from bankingOnDjango.delegates.DisputeDelegate import DisputeDelegate

# ======================================================================
#
# Encapsulates data for View Dispute
#
# @author Harbormaster Dev Team
#
# ======================================================================


# ======================================================================
# Class DisputeView function declarations
# ======================================================================
def index(request):
    return HttpResponse("Hello, world. You're at the Dispute index.")


def get(request):
    request_data = json.loads(request.body)
    dispute_id = request_data["id"]
    delegate = DisputeDelegate()
    request_data = delegate.get(dispute_id)
    as_json = serializers.serialize("json", request_data)
    return HttpResponse(as_json, content_type="application/json")


def create(request):
    dispute = json.loads(request.body)
    delegate = DisputeDelegate()
    request_data = delegate.createFromJson(dispute)
    as_json = serializers.serialize("json", request_data)
    return HttpResponse(as_json, content_type="application/json")


def update(request):
    dispute = json.loads(request.body)
    delegate = DisputeDelegate()
    request_data = delegate.save(dispute)
    as_json = serializers.serialize("json", request_data)
    return HttpResponse(as_json, content_type="application/json")


def delete(request):
    request_data = json.loads(request.body)
    dispute_id = request_data["id"]
    delegate = DisputeDelegate()
    request_data = delegate.delete(dispute_id)
    as_json = serializers.serialize("json", request_data)
    return HttpResponse(as_json, content_type="application/json")


def getAll(request):
    delegate = DisputeDelegate()
    request_data = delegate.getAll()
    as_json = serializers.serialize("json", request_data)
    return HttpResponse(as_json, content_type="application/json")

    # ---------------------------------------------------------
    # Single association
    # ---------------------------------------------------------


def assignTransaction(request):
    request_data = json.loads(request.body)
    parent_id = request_data["parent_id"]
    child_id = request_data["childId"]
    delegate = DisputeDelegate()
    request_data = delegate.assignTransaction(parent_id, childId)
    as_json = serializers.serialize("json", request_data)
    return HttpResponse(as_json, content_type="application/json")


def unassignTransaction(request):
    request_data = json.loads(request.body)
    parent_id = request_data["parent_id"]
    child_id = request_data["childId"]
    delegate = DisputeDelegate()
    request_data = delegate.unassignTransaction(parent_id, childId)
    as_json = serializers.serialize("json", request_data)
    return HttpResponse(as_json, content_type="application/json")


def assignCustomer(request):
    request_data = json.loads(request.body)
    parent_id = request_data["parent_id"]
    child_id = request_data["childId"]
    delegate = DisputeDelegate()
    request_data = delegate.assignCustomer(parent_id, childId)
    as_json = serializers.serialize("json", request_data)
    return HttpResponse(as_json, content_type="application/json")


def unassignCustomer(request):
    request_data = json.loads(request.body)
    parent_id = request_data["parent_id"]
    child_id = request_data["childId"]
    delegate = DisputeDelegate()
    request_data = delegate.unassignCustomer(parent_id, childId)
    as_json = serializers.serialize("json", request_data)
    return HttpResponse(as_json, content_type="application/json")


def assignAccount(request):
    request_data = json.loads(request.body)
    parent_id = request_data["parent_id"]
    child_id = request_data["childId"]
    delegate = DisputeDelegate()
    request_data = delegate.assignAccount(parent_id, childId)
    as_json = serializers.serialize("json", request_data)
    return HttpResponse(as_json, content_type="application/json")


def unassignAccount(request):
    request_data = json.loads(request.body)
    parent_id = request_data["parent_id"]
    child_id = request_data["childId"]
    delegate = DisputeDelegate()
    request_data = delegate.unassignAccount(parent_id, childId)
    as_json = serializers.serialize("json", request_data)
    return HttpResponse(as_json, content_type="application/json")


def assignPaymentCard(request):
    request_data = json.loads(request.body)
    parent_id = request_data["parent_id"]
    child_id = request_data["childId"]
    delegate = DisputeDelegate()
    request_data = delegate.assignPaymentCard(parent_id, childId)
    as_json = serializers.serialize("json", request_data)
    return HttpResponse(as_json, content_type="application/json")


def unassignPaymentCard(request):
    request_data = json.loads(request.body)
    parent_id = request_data["parent_id"]
    child_id = request_data["childId"]
    delegate = DisputeDelegate()
    request_data = delegate.unassignPaymentCard(parent_id, childId)
    as_json = serializers.serialize("json", request_data)
    return HttpResponse(as_json, content_type="application/json")

    # ---------------------------------------------------------
    # Multiple association
    # ---------------------------------------------------------
