import json

from django.core import serializers
from django.shortcuts import render
from django.http import HttpResponse

from bankingOnDjango.delegates.AccountStatementDelegate import AccountStatementDelegate

 #======================================================================
# 
# Encapsulates data for View AccountStatement
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class AccountStatementView function declarations
#======================================================================
def index(request):
	return HttpResponse("Hello, world. You're at the AccountStatement index.")


def get(request):
    request_data = json.loads(request.body)
    accountStatement_id = request_data["id"]
    delegate = AccountStatementDelegate()
    request_data = delegate.get(accountStatement_id)
    as_json = serializers.serialize("json",request_data)
    return HttpResponse(as_json,content_type="application/json")

def create(request):
	accountStatement = json.loads(request.body)
	delegate = AccountStatementDelegate()
	request_data = delegate.createFromJson( accountStatement )
	as_json = serializers.serialize("json", request_data)
	return HttpResponse(as_json, content_type="application/json");

def update(request):
	accountStatement = json.loads(request.body)
	delegate = AccountStatementDelegate()
	request_data = delegate.save( accountStatement )
	as_json = serializers.serialize("json", request_data)
	return HttpResponse(as_json, content_type="application/json");

def delete(request):
    request_data = json.loads(request.body)
    accountStatement_id = request_data["id"]
    delegate = AccountStatementDelegate()
    request_data = delegate.delete(accountStatement_id)
    as_json = serializers.serialize("json",request_data)
    return HttpResponse(as_json,content_type="application/json")

def getAll(request):
    delegate = AccountStatementDelegate()
    request_data = delegate.getAll()
    as_json = serializers.serialize("json", request_data)
    return HttpResponse(as_json, content_type="application/json");


    # ---------------------------------------------------------
    # Single association
    # ---------------------------------------------------------
def assignAccount(request):
    request_data = json.loads(request.body)
    parent_id = request_data["parent_id"]
    child_id = request_data["childId"]
    delegate = AccountStatementDelegate()
    request_data = delegate.assignAccount(parent_id,childId)
    as_json = serializers.serialize("json",request_data)
    return HttpResponse(as_json,content_type="application/json")

def unassignAccount(request):
    request_data = json.loads(request.body)
    parent_id = request_data["parent_id"]
    child_id = request_data["childId"]
    delegate = AccountStatementDelegate()
    request_data = delegate.unassignAccount(parent_id,childId)
    as_json = serializers.serialize("json",request_data)
    return HttpResponse(as_json,content_type="application/json")


    # ---------------------------------------------------------
    # Multiple association
    # ---------------------------------------------------------
