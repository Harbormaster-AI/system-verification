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
    account_statement_id = request_data["id"]
    delegate = AccountStatementDelegate()
    request_data = delegate.get(account_statement_id)
    as_json = serializers.serialize("json",request_data)
    return HttpResponse(as_json,content_type="application/json")

def create(request):
	account_statement = json.loads(request.body)
	delegate = AccountStatementDelegate()
	request_data = delegate.createFromJson( account_statement )
	as_json = serializers.serialize("json", request_data)
	return HttpResponse(as_json, content_type="application/json");

def update(request):
	account_statement = json.loads(request.body)
	delegate = AccountStatementDelegate()
	request_data = delegate.save( account_statement )
	as_json = serializers.serialize("json", request_data)
	return HttpResponse(as_json, content_type="application/json");

def delete(request):
    request_data = json.loads(request.body)
    account_statement_id = request_data["id"]
    delegate = AccountStatementDelegate()
    request_data = delegate.delete(account_statement_id)
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
    request_data = delegate.assignAccount(parent_id,child_id)
    as_json = serializers.serialize("json",request_data)
    return HttpResponse(as_json,content_type="application/json")

def unassignAccount(request):
    request_data = json.loads(request.body)
    parent_id = request_data["parent_id"]
    child_id = request_data["childId"]
    delegate = AccountStatementDelegate()
    request_data = delegate.unassignAccount(parent_id,child_id)
    as_json = serializers.serialize("json",request_data)
    return HttpResponse(as_json,content_type="application/json")


    # ---------------------------------------------------------
    # Multiple association
    # ---------------------------------------------------------
