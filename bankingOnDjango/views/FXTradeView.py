import json

from django.core import serializers
from django.http import HttpResponse

from bankingOnDjango.delegates.FXTradeDelegate import FXTradeDelegate

 #======================================================================
# 
# Encapsulates data for View FXTrade
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class FXTradeView function declarations
#======================================================================
def index(request):
	return HttpResponse("Hello, world. You're at the FXTrade index.")


def get(request):
    request_data = json.loads(request.body)
    f_x_trade_id = request_data["id"]
    delegate = FXTradeDelegate()
    request_data = delegate.get(f_x_trade_id)
    as_json = serializers.serialize("json",request_data)
    return HttpResponse(as_json,content_type="application/json")

def create(request):
	f_x_trade = json.loads(request.body)
	delegate = FXTradeDelegate()
	request_data = delegate.createFromJson( f_x_trade )
	as_json = serializers.serialize("json", request_data)
	return HttpResponse(as_json, content_type="application/json");

def update(request):
	f_x_trade = json.loads(request.body)
	delegate = FXTradeDelegate()
	request_data = delegate.save( f_x_trade )
	as_json = serializers.serialize("json", request_data)
	return HttpResponse(as_json, content_type="application/json");

def delete(request):
    request_data = json.loads(request.body)
    f_x_trade_id = request_data["id"]
    delegate = FXTradeDelegate()
    request_data = delegate.delete(f_x_trade_id)
    as_json = serializers.serialize("json",request_data)
    return HttpResponse(as_json,content_type="application/json")

def getAll(request):
    delegate = FXTradeDelegate()
    request_data = delegate.getAll()
    as_json = serializers.serialize("json", request_data)
    return HttpResponse(as_json, content_type="application/json");


    # ---------------------------------------------------------
    # Single association
    # ---------------------------------------------------------
def assignCustomer(request):
    request_data = json.loads(request.body)
    parent_id = request_data["parent_id"]
    child_id = request_data["childId"]
    delegate = FXTradeDelegate()
    request_data = delegate.assignCustomer(parent_id,child_id)
    as_json = serializers.serialize("json",request_data)
    return HttpResponse(as_json,content_type="application/json")

def unassignCustomer(request):
    request_data = json.loads(request.body)
    parent_id = request_data["parent_id"]
    child_id = request_data["childId"]
    delegate = FXTradeDelegate()
    request_data = delegate.unassignCustomer(parent_id,child_id)
    as_json = serializers.serialize("json",request_data)
    return HttpResponse(as_json,content_type="application/json")
def assignBank(request):
    request_data = json.loads(request.body)
    parent_id = request_data["parent_id"]
    child_id = request_data["childId"]
    delegate = FXTradeDelegate()
    request_data = delegate.assignBank(parent_id,child_id)
    as_json = serializers.serialize("json",request_data)
    return HttpResponse(as_json,content_type="application/json")

def unassignBank(request):
    request_data = json.loads(request.body)
    parent_id = request_data["parent_id"]
    child_id = request_data["childId"]
    delegate = FXTradeDelegate()
    request_data = delegate.unassignBank(parent_id,child_id)
    as_json = serializers.serialize("json",request_data)
    return HttpResponse(as_json,content_type="application/json")
def assignExchangeRate(request):
    request_data = json.loads(request.body)
    parent_id = request_data["parent_id"]
    child_id = request_data["childId"]
    delegate = FXTradeDelegate()
    request_data = delegate.assignExchangeRate(parent_id,child_id)
    as_json = serializers.serialize("json",request_data)
    return HttpResponse(as_json,content_type="application/json")

def unassignExchangeRate(request):
    request_data = json.loads(request.body)
    parent_id = request_data["parent_id"]
    child_id = request_data["childId"]
    delegate = FXTradeDelegate()
    request_data = delegate.unassignExchangeRate(parent_id,child_id)
    as_json = serializers.serialize("json",request_data)
    return HttpResponse(as_json,content_type="application/json")
def assignSourceAccount(request):
    request_data = json.loads(request.body)
    parent_id = request_data["parent_id"]
    child_id = request_data["childId"]
    delegate = FXTradeDelegate()
    request_data = delegate.assignSourceAccount(parent_id,child_id)
    as_json = serializers.serialize("json",request_data)
    return HttpResponse(as_json,content_type="application/json")

def unassignSourceAccount(request):
    request_data = json.loads(request.body)
    parent_id = request_data["parent_id"]
    child_id = request_data["childId"]
    delegate = FXTradeDelegate()
    request_data = delegate.unassignSourceAccount(parent_id,child_id)
    as_json = serializers.serialize("json",request_data)
    return HttpResponse(as_json,content_type="application/json")
def assignDestinationAccount(request):
    request_data = json.loads(request.body)
    parent_id = request_data["parent_id"]
    child_id = request_data["childId"]
    delegate = FXTradeDelegate()
    request_data = delegate.assignDestinationAccount(parent_id,child_id)
    as_json = serializers.serialize("json",request_data)
    return HttpResponse(as_json,content_type="application/json")

def unassignDestinationAccount(request):
    request_data = json.loads(request.body)
    parent_id = request_data["parent_id"]
    child_id = request_data["childId"]
    delegate = FXTradeDelegate()
    request_data = delegate.unassignDestinationAccount(parent_id,child_id)
    as_json = serializers.serialize("json",request_data)
    return HttpResponse(as_json,content_type="application/json")
def assignTransaction(request):
    request_data = json.loads(request.body)
    parent_id = request_data["parent_id"]
    child_id = request_data["childId"]
    delegate = FXTradeDelegate()
    request_data = delegate.assignTransaction(parent_id,child_id)
    as_json = serializers.serialize("json",request_data)
    return HttpResponse(as_json,content_type="application/json")

def unassignTransaction(request):
    request_data = json.loads(request.body)
    parent_id = request_data["parent_id"]
    child_id = request_data["childId"]
    delegate = FXTradeDelegate()
    request_data = delegate.unassignTransaction(parent_id,child_id)
    as_json = serializers.serialize("json",request_data)
    return HttpResponse(as_json,content_type="application/json")


    # ---------------------------------------------------------
    # Multiple association
    # ---------------------------------------------------------
