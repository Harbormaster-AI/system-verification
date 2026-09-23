import json

from django.core import serializers
from django.shortcuts import render
from django.http import HttpResponse

from bankingOnDjango.delegates.StandingInstructionDelegate import (
    StandingInstructionDelegate,
)

# ======================================================================
#
# Encapsulates data for View StandingInstruction
#
# @author Harbormaster Dev Team
#
# ======================================================================


# ======================================================================
# Class StandingInstructionView function declarations
# ======================================================================
def index(request):
    return HttpResponse("Hello, world. You're at the StandingInstruction index.")


def get(request):
    request_data = json.loads(request.body)
    standingInstruction_id = request_data["id"]
    delegate = StandingInstructionDelegate()
    request_data = delegate.get(standingInstruction_id)
    as_json = serializers.serialize("json", request_data)
    return HttpResponse(as_json, content_type="application/json")


def create(request):
    standingInstruction = json.loads(request.body)
    delegate = StandingInstructionDelegate()
    request_data = delegate.createFromJson(standingInstruction)
    as_json = serializers.serialize("json", request_data)
    return HttpResponse(as_json, content_type="application/json")


def update(request):
    standingInstruction = json.loads(request.body)
    delegate = StandingInstructionDelegate()
    request_data = delegate.save(standingInstruction)
    as_json = serializers.serialize("json", request_data)
    return HttpResponse(as_json, content_type="application/json")


def delete(request):
    request_data = json.loads(request.body)
    standingInstruction_id = request_data["id"]
    delegate = StandingInstructionDelegate()
    request_data = delegate.delete(standingInstruction_id)
    as_json = serializers.serialize("json", request_data)
    return HttpResponse(as_json, content_type="application/json")


def getAll(request):
    delegate = StandingInstructionDelegate()
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
    delegate = StandingInstructionDelegate()
    request_data = delegate.assignAccount(parent_id, childId)
    as_json = serializers.serialize("json", request_data)
    return HttpResponse(as_json, content_type="application/json")


def unassignAccount(request):
    request_data = json.loads(request.body)
    parent_id = request_data["parent_id"]
    child_id = request_data["childId"]
    delegate = StandingInstructionDelegate()
    request_data = delegate.unassignAccount(parent_id, childId)
    as_json = serializers.serialize("json", request_data)
    return HttpResponse(as_json, content_type="application/json")


def assignBeneficiary(request):
    request_data = json.loads(request.body)
    parent_id = request_data["parent_id"]
    child_id = request_data["childId"]
    delegate = StandingInstructionDelegate()
    request_data = delegate.assignBeneficiary(parent_id, childId)
    as_json = serializers.serialize("json", request_data)
    return HttpResponse(as_json, content_type="application/json")


def unassignBeneficiary(request):
    request_data = json.loads(request.body)
    parent_id = request_data["parent_id"]
    child_id = request_data["childId"]
    delegate = StandingInstructionDelegate()
    request_data = delegate.unassignBeneficiary(parent_id, childId)
    as_json = serializers.serialize("json", request_data)
    return HttpResponse(as_json, content_type="application/json")

    # ---------------------------------------------------------
    # Multiple association
    # ---------------------------------------------------------
