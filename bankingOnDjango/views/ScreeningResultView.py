import json

from django.core import serializers
from django.shortcuts import render
from django.http import HttpResponse

from bankingOnDjango.delegates.ScreeningResultDelegate import ScreeningResultDelegate

# ======================================================================
#
# Encapsulates data for View ScreeningResult
#
# @author Harbormaster Dev Team
#
# ======================================================================


# ======================================================================
# Class ScreeningResultView function declarations
# ======================================================================
def index(request):
    return HttpResponse("Hello, world. You're at the ScreeningResult index.")


def get(request):
    request_data = json.loads(request.body)
    screening_result_id = request_data["id"]
    delegate = ScreeningResultDelegate()
    request_data = delegate.get(screening_result_id)
    as_json = serializers.serialize("json", request_data)
    return HttpResponse(as_json, content_type="application/json")


def create(request):
    screening_result = json.loads(request.body)
    delegate = ScreeningResultDelegate()
    request_data = delegate.createFromJson(screening_result)
    as_json = serializers.serialize("json", request_data)
    return HttpResponse(as_json, content_type="application/json")


def update(request):
    screening_result = json.loads(request.body)
    delegate = ScreeningResultDelegate()
    request_data = delegate.save(screening_result)
    as_json = serializers.serialize("json", request_data)
    return HttpResponse(as_json, content_type="application/json")


def delete(request):
    request_data = json.loads(request.body)
    screening_result_id = request_data["id"]
    delegate = ScreeningResultDelegate()
    request_data = delegate.delete(screening_result_id)
    as_json = serializers.serialize("json", request_data)
    return HttpResponse(as_json, content_type="application/json")


def getAll(request):
    delegate = ScreeningResultDelegate()
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
    delegate = ScreeningResultDelegate()
    request_data = delegate.assignKycProfile(parent_id, child_id)
    as_json = serializers.serialize("json", request_data)
    return HttpResponse(as_json, content_type="application/json")


def unassignKycProfile(request):
    request_data = json.loads(request.body)
    parent_id = request_data["parent_id"]
    child_id = request_data["childId"]
    delegate = ScreeningResultDelegate()
    request_data = delegate.unassignKycProfile(parent_id, child_id)
    as_json = serializers.serialize("json", request_data)
    return HttpResponse(as_json, content_type="application/json")

    # ---------------------------------------------------------
    # Multiple association
    # ---------------------------------------------------------
