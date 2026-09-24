import json

from django.core import serializers

from django.http import HttpResponse

from bankingOnDjango.delegates.FeeChargeDelegate import FeeChargeDelegate

# ======================================================================
#
# Encapsulates data for View FeeCharge
#
# @author Harbormaster Dev Team
#
# ======================================================================


# ======================================================================
# Class FeeChargeView function declarations
# ======================================================================
def index(request):
    return HttpResponse("Hello, world. You're at the FeeCharge index.")


def get(request):
    request_data = json.loads(request.body)
    fee_charge_id = request_data["id"]
    delegate = FeeChargeDelegate()
    request_data = delegate.get(fee_charge_id)
    as_json = serializers.serialize("json", request_data)
    return HttpResponse(as_json, content_type="application/json")


def create(request):
    fee_charge = json.loads(request.body)
    delegate = FeeChargeDelegate()
    request_data = delegate.createFromJson(fee_charge)
    as_json = serializers.serialize("json", request_data)
    return HttpResponse(as_json, content_type="application/json")


def update(request):
    fee_charge = json.loads(request.body)
    delegate = FeeChargeDelegate()
    request_data = delegate.save(fee_charge)
    as_json = serializers.serialize("json", request_data)
    return HttpResponse(as_json, content_type="application/json")


def delete(request):
    request_data = json.loads(request.body)
    fee_charge_id = request_data["id"]
    delegate = FeeChargeDelegate()
    request_data = delegate.delete(fee_charge_id)
    as_json = serializers.serialize("json", request_data)
    return HttpResponse(as_json, content_type="application/json")


def getAll(request):
    delegate = FeeChargeDelegate()
    request_data = delegate.getAll()
    as_json = serializers.serialize("json", request_data)
    return HttpResponse(as_json, content_type="application/json")

    # ---------------------------------------------------------
    # Single association
    # ---------------------------------------------------------


def assignAccount(request):
    request_data = json.loads(request.body)
    parent_id = request_data["parent_id"]
    child_id = request_data["childId"]
    delegate = FeeChargeDelegate()
    request_data = delegate.assignAccount(parent_id, child_id)
    as_json = serializers.serialize("json", request_data)
    return HttpResponse(as_json, content_type="application/json")


def unassignAccount(request):
    request_data = json.loads(request.body)
    parent_id = request_data["parent_id"]
    child_id = request_data["childId"]
    delegate = FeeChargeDelegate()
    request_data = delegate.unassignAccount(parent_id, child_id)
    as_json = serializers.serialize("json", request_data)
    return HttpResponse(as_json, content_type="application/json")


def assignLoanAccount(request):
    request_data = json.loads(request.body)
    parent_id = request_data["parent_id"]
    child_id = request_data["childId"]
    delegate = FeeChargeDelegate()
    request_data = delegate.assignLoanAccount(parent_id, child_id)
    as_json = serializers.serialize("json", request_data)
    return HttpResponse(as_json, content_type="application/json")


def unassignLoanAccount(request):
    request_data = json.loads(request.body)
    parent_id = request_data["parent_id"]
    child_id = request_data["childId"]
    delegate = FeeChargeDelegate()
    request_data = delegate.unassignLoanAccount(parent_id, child_id)
    as_json = serializers.serialize("json", request_data)
    return HttpResponse(as_json, content_type="application/json")

    # ---------------------------------------------------------
    # Multiple association
    # ---------------------------------------------------------
