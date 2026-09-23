import json

from django.core import serializers
from django.http import HttpResponse

from bankingOnDjango.delegates.ExternalAccountDelegate import ExternalAccountDelegate

 #======================================================================
# 
# Encapsulates data for View ExternalAccount
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class ExternalAccountView function declarations
#======================================================================
def index(request):
	return HttpResponse("Hello, world. You're at the ExternalAccount index.")


def get(request):
    request_data = json.loads(request.body)
    external_account_id = request_data["id"]
    delegate = ExternalAccountDelegate()
    request_data = delegate.get(external_account_id)
    as_json = serializers.serialize("json",request_data)
    return HttpResponse(as_json,content_type="application/json")

def create(request):
	external_account = json.loads(request.body)
	delegate = ExternalAccountDelegate()
	request_data = delegate.createFromJson( external_account )
	as_json = serializers.serialize("json", request_data)
	return HttpResponse(as_json, content_type="application/json");

def update(request):
	external_account = json.loads(request.body)
	delegate = ExternalAccountDelegate()
	request_data = delegate.save( external_account )
	as_json = serializers.serialize("json", request_data)
	return HttpResponse(as_json, content_type="application/json");

def delete(request):
    request_data = json.loads(request.body)
    external_account_id = request_data["id"]
    delegate = ExternalAccountDelegate()
    request_data = delegate.delete(external_account_id)
    as_json = serializers.serialize("json",request_data)
    return HttpResponse(as_json,content_type="application/json")

def getAll(request):
    delegate = ExternalAccountDelegate()
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
    delegate = ExternalAccountDelegate()
    request_data = delegate.assignCustomer(parent_id,child_id)
    as_json = serializers.serialize("json",request_data)
    return HttpResponse(as_json,content_type="application/json")

def unassignCustomer(request):
    request_data = json.loads(request.body)
    parent_id = request_data["parent_id"]
    child_id = request_data["childId"]
    delegate = ExternalAccountDelegate()
    request_data = delegate.unassignCustomer(parent_id,child_id)
    as_json = serializers.serialize("json",request_data)
    return HttpResponse(as_json,content_type="application/json")


    # ---------------------------------------------------------
    # Multiple association
    # ---------------------------------------------------------
def addTransactions(request):
    request_data = json.loads(request.body)
    parent_id = request_data["parent_id"]
    child_ids =  request_data["child_ids"]
    delegate = ExternalAccountDelegate()
    request_data = delegate.addTransactions(parent_id,child_ids)
    as_json = serializers.serialize("json",request_data)
    return HttpResponse(as_json,content_type="application/json")

def removeTransactions(request):
    request_data = json.loads(request.body)
    parent_id = request_data["parent_id"]
    child_ids =  request_data["child_ids"]
    delegate = ExternalAccountDelegate()
    request_data = delegate.removeTransactions(parent_id,child_ids)
    as_json = serializers.serialize("json",request_data)
    return HttpResponse(as_json,content_type="application/json")


