import json

from django.core import serializers
from django.shortcuts import render
from django.http import HttpResponse

from bankingOnDjango.delegates.ExchangeRateDelegate import ExchangeRateDelegate

# ======================================================================
#
# Encapsulates data for View ExchangeRate
#
# @author Harbormaster Dev Team
#
# ======================================================================


# ======================================================================
# Class ExchangeRateView function declarations
# ======================================================================
def index(request):
    return HttpResponse("Hello, world. You're at the ExchangeRate index.")


def get(request):
    request_data = json.loads(request.body)
    exchangeRate_id = request_data["id"]
    delegate = ExchangeRateDelegate()
    request_data = delegate.get(exchangeRate_id)
    as_json = serializers.serialize("json", request_data)
    return HttpResponse(as_json, content_type="application/json")


def create(request):
    exchangeRate = json.loads(request.body)
    delegate = ExchangeRateDelegate()
    request_data = delegate.createFromJson(exchangeRate)
    as_json = serializers.serialize("json", request_data)
    return HttpResponse(as_json, content_type="application/json")


def update(request):
    exchangeRate = json.loads(request.body)
    delegate = ExchangeRateDelegate()
    request_data = delegate.save(exchangeRate)
    as_json = serializers.serialize("json", request_data)
    return HttpResponse(as_json, content_type="application/json")


def delete(request):
    request_data = json.loads(request.body)
    exchangeRate_id = request_data["id"]
    delegate = ExchangeRateDelegate()
    request_data = delegate.delete(exchangeRate_id)
    as_json = serializers.serialize("json", request_data)
    return HttpResponse(as_json, content_type="application/json")


def getAll(request):
    delegate = ExchangeRateDelegate()
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
    delegate = ExchangeRateDelegate()
    request_data = delegate.assignBank(parent_id, childId)
    as_json = serializers.serialize("json", request_data)
    return HttpResponse(as_json, content_type="application/json")


def unassignBank(request):
    request_data = json.loads(request.body)
    parent_id = request_data["parent_id"]
    child_id = request_data["childId"]
    delegate = ExchangeRateDelegate()
    request_data = delegate.unassignBank(parent_id, childId)
    as_json = serializers.serialize("json", request_data)
    return HttpResponse(as_json, content_type="application/json")

    # ---------------------------------------------------------
    # Multiple association
    # ---------------------------------------------------------


def addFxTrades(request):
    request_data = json.loads(request.body)
    parent_id = request_data["parent_id"]
    child_ids = request_data["child_ids"]
    delegate = ExchangeRateDelegate()
    request_data = delegate.addFxTrades(parent_id, child_ids)
    as_json = serializers.serialize("json", request_data)
    return HttpResponse(as_json, content_type="application/json")


def removeFxTrades(request):
    request_data = json.loads(request.body)
    parent_id = request_data["parent_id"]
    child_ids = request_data["child_ids"]
    delegate = ExchangeRateDelegate()
    request_data = delegate.removeFxTrades(parent_id, child_ids)
    as_json = serializers.serialize("json", request_data)
    return HttpResponse(as_json, content_type="application/json")
