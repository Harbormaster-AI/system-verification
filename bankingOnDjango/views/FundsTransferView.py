import json

from django.core import serializers

from django.http import HttpResponse

from bankingOnDjango.delegates.FundsTransferDelegate import FundsTransferDelegate

 #======================================================================
# 
# Encapsulates data for View FundsTransfer
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class FundsTransferView function declarations
#======================================================================
def index(request):
	return HttpResponse("Hello, world. You're at the FundsTransfer index.")


def get(request):
    request_data = json.loads(request.body)
    funds_transfer_id = request_data["id"]
    delegate = FundsTransferDelegate()
    request_data = delegate.get(funds_transfer_id)
    as_json = serializers.serialize("json",request_data)
    return HttpResponse(as_json,content_type="application/json")

def create(request):
	funds_transfer = json.loads(request.body)
	delegate = FundsTransferDelegate()
	request_data = delegate.createFromJson( funds_transfer )
	as_json = serializers.serialize("json", request_data)
	return HttpResponse(as_json, content_type="application/json");

def update(request):
	funds_transfer = json.loads(request.body)
	delegate = FundsTransferDelegate()
	request_data = delegate.save( funds_transfer )
	as_json = serializers.serialize("json", request_data)
	return HttpResponse(as_json, content_type="application/json");

def delete(request):
    request_data = json.loads(request.body)
    funds_transfer_id = request_data["id"]
    delegate = FundsTransferDelegate()
    request_data = delegate.delete(funds_transfer_id)
    as_json = serializers.serialize("json",request_data)
    return HttpResponse(as_json,content_type="application/json")

def getAll(request):
    delegate = FundsTransferDelegate()
    request_data = delegate.getAll()
    as_json = serializers.serialize("json", request_data)
    return HttpResponse(as_json, content_type="application/json");


    # ---------------------------------------------------------
    # Single association
    # ---------------------------------------------------------
def assignSourceAccount(request):
    request_data = json.loads(request.body)
    parent_id = request_data["parent_id"]
    child_id = request_data["childId"]
    delegate = FundsTransferDelegate()
    request_data = delegate.assignSourceAccount(parent_id,child_id)
    as_json = serializers.serialize("json",request_data)
    return HttpResponse(as_json,content_type="application/json")

def unassignSourceAccount(request):
    request_data = json.loads(request.body)
    parent_id = request_data["parent_id"]
    child_id = request_data["childId"]
    delegate = FundsTransferDelegate()
    request_data = delegate.unassignSourceAccount(parent_id,child_id)
    as_json = serializers.serialize("json",request_data)
    return HttpResponse(as_json,content_type="application/json")
def assignDestinationAccount(request):
    request_data = json.loads(request.body)
    parent_id = request_data["parent_id"]
    child_id = request_data["childId"]
    delegate = FundsTransferDelegate()
    request_data = delegate.assignDestinationAccount(parent_id,child_id)
    as_json = serializers.serialize("json",request_data)
    return HttpResponse(as_json,content_type="application/json")

def unassignDestinationAccount(request):
    request_data = json.loads(request.body)
    parent_id = request_data["parent_id"]
    child_id = request_data["childId"]
    delegate = FundsTransferDelegate()
    request_data = delegate.unassignDestinationAccount(parent_id,child_id)
    as_json = serializers.serialize("json",request_data)
    return HttpResponse(as_json,content_type="application/json")
def assignExternalBeneficiary(request):
    request_data = json.loads(request.body)
    parent_id = request_data["parent_id"]
    child_id = request_data["childId"]
    delegate = FundsTransferDelegate()
    request_data = delegate.assignExternalBeneficiary(parent_id,child_id)
    as_json = serializers.serialize("json",request_data)
    return HttpResponse(as_json,content_type="application/json")

def unassignExternalBeneficiary(request):
    request_data = json.loads(request.body)
    parent_id = request_data["parent_id"]
    child_id = request_data["childId"]
    delegate = FundsTransferDelegate()
    request_data = delegate.unassignExternalBeneficiary(parent_id,child_id)
    as_json = serializers.serialize("json",request_data)
    return HttpResponse(as_json,content_type="application/json")
def assignInitiatedBy(request):
    request_data = json.loads(request.body)
    parent_id = request_data["parent_id"]
    child_id = request_data["childId"]
    delegate = FundsTransferDelegate()
    request_data = delegate.assignInitiatedBy(parent_id,child_id)
    as_json = serializers.serialize("json",request_data)
    return HttpResponse(as_json,content_type="application/json")

def unassignInitiatedBy(request):
    request_data = json.loads(request.body)
    parent_id = request_data["parent_id"]
    child_id = request_data["childId"]
    delegate = FundsTransferDelegate()
    request_data = delegate.unassignInitiatedBy(parent_id,child_id)
    as_json = serializers.serialize("json",request_data)
    return HttpResponse(as_json,content_type="application/json")


    # ---------------------------------------------------------
    # Multiple association
    # ---------------------------------------------------------
def addTransactions(request):
    request_data = json.loads(request.body)
    parent_id = request_data["parent_id"]
    child_ids =  request_data["child_ids"]
    delegate = FundsTransferDelegate()
    request_data = delegate.addTransactions(parent_id,child_ids)
    as_json = serializers.serialize("json",request_data)
    return HttpResponse(as_json,content_type="application/json")

def removeTransactions(request):
    request_data = json.loads(request.body)
    parent_id = request_data["parent_id"]
    child_ids =  request_data["child_ids"]
    delegate = FundsTransferDelegate()
    request_data = delegate.removeTransactions(parent_id,child_ids)
    as_json = serializers.serialize("json",request_data)
    return HttpResponse(as_json,content_type="application/json")


