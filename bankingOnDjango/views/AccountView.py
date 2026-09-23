import json

from django.core import serializers
from django.shortcuts import render
from django.http import HttpResponse

from bankingOnDjango.delegates.AccountDelegate import AccountDelegate

 #======================================================================
# 
# Encapsulates data for View Account
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class AccountView function declarations
#======================================================================
def index(request):
	return HttpResponse("Hello, world. You're at the Account index.")


def get(request):
    request_data = json.loads(request.body)
    account_id = request_data["id"]
    delegate = AccountDelegate()
    request_data = delegate.get(account_id)
    as_json = serializers.serialize("json",request_data)
    return HttpResponse(as_json,content_type="application/json")

def create(request):
	account = json.loads(request.body)
	delegate = AccountDelegate()
	request_data = delegate.createFromJson( account )
	as_json = serializers.serialize("json", request_data)
	return HttpResponse(as_json, content_type="application/json");

def update(request):
	account = json.loads(request.body)
	delegate = AccountDelegate()
	request_data = delegate.save( account )
	as_json = serializers.serialize("json", request_data)
	return HttpResponse(as_json, content_type="application/json");

def delete(request):
    request_data = json.loads(request.body)
    account_id = request_data["id"]
    delegate = AccountDelegate()
    request_data = delegate.delete(account_id)
    as_json = serializers.serialize("json",request_data)
    return HttpResponse(as_json,content_type="application/json")

def getAll(request):
    delegate = AccountDelegate()
    request_data = delegate.getAll()
    as_json = serializers.serialize("json", request_data)
    return HttpResponse(as_json, content_type="application/json");


    # ---------------------------------------------------------
    # Single association
    # ---------------------------------------------------------
def assignBank(request):
    request_data = json.loads(request.body)
    parent_id = request_data["parent_id"]
    child_id = request_data["childId"]
    delegate = AccountDelegate()
    request_data = delegate.assignBank(parent_id,childId)
    as_json = serializers.serialize("json",request_data)
    return HttpResponse(as_json,content_type="application/json")

def unassignBank(request):
    request_data = json.loads(request.body)
    parent_id = request_data["parent_id"]
    child_id = request_data["childId"]
    delegate = AccountDelegate()
    request_data = delegate.unassignBank(parent_id,childId)
    as_json = serializers.serialize("json",request_data)
    return HttpResponse(as_json,content_type="application/json")
def assignBranch(request):
    request_data = json.loads(request.body)
    parent_id = request_data["parent_id"]
    child_id = request_data["childId"]
    delegate = AccountDelegate()
    request_data = delegate.assignBranch(parent_id,childId)
    as_json = serializers.serialize("json",request_data)
    return HttpResponse(as_json,content_type="application/json")

def unassignBranch(request):
    request_data = json.loads(request.body)
    parent_id = request_data["parent_id"]
    child_id = request_data["childId"]
    delegate = AccountDelegate()
    request_data = delegate.unassignBranch(parent_id,childId)
    as_json = serializers.serialize("json",request_data)
    return HttpResponse(as_json,content_type="application/json")
def assignProduct(request):
    request_data = json.loads(request.body)
    parent_id = request_data["parent_id"]
    child_id = request_data["childId"]
    delegate = AccountDelegate()
    request_data = delegate.assignProduct(parent_id,childId)
    as_json = serializers.serialize("json",request_data)
    return HttpResponse(as_json,content_type="application/json")

def unassignProduct(request):
    request_data = json.loads(request.body)
    parent_id = request_data["parent_id"]
    child_id = request_data["childId"]
    delegate = AccountDelegate()
    request_data = delegate.unassignProduct(parent_id,childId)
    as_json = serializers.serialize("json",request_data)
    return HttpResponse(as_json,content_type="application/json")


    # ---------------------------------------------------------
    # Multiple association
    # ---------------------------------------------------------
def addOwners(request):
    request_data = json.loads(request.body)
    parent_id = request_data["parent_id"]
    child_ids =  request_data["child_ids"]
    delegate = AccountDelegate()
    request_data = delegate.addOwners(parent_id,child_ids)
    as_json = serializers.serialize("json",request_data)
    return HttpResponse(as_json,content_type="application/json")

def removeOwners(request):
    request_data = json.loads(request.body)
    parent_id = request_data["parent_id"]
    child_ids =  request_data["child_ids"]
    delegate = AccountDelegate()
    request_data = delegate.removeOwners(parent_id,child_ids)
    as_json = serializers.serialize("json",request_data)
    return HttpResponse(as_json,content_type="application/json")


def addTransactions(request):
    request_data = json.loads(request.body)
    parent_id = request_data["parent_id"]
    child_ids =  request_data["child_ids"]
    delegate = AccountDelegate()
    request_data = delegate.addTransactions(parent_id,child_ids)
    as_json = serializers.serialize("json",request_data)
    return HttpResponse(as_json,content_type="application/json")

def removeTransactions(request):
    request_data = json.loads(request.body)
    parent_id = request_data["parent_id"]
    child_ids =  request_data["child_ids"]
    delegate = AccountDelegate()
    request_data = delegate.removeTransactions(parent_id,child_ids)
    as_json = serializers.serialize("json",request_data)
    return HttpResponse(as_json,content_type="application/json")


def addStatements(request):
    request_data = json.loads(request.body)
    parent_id = request_data["parent_id"]
    child_ids =  request_data["child_ids"]
    delegate = AccountDelegate()
    request_data = delegate.addStatements(parent_id,child_ids)
    as_json = serializers.serialize("json",request_data)
    return HttpResponse(as_json,content_type="application/json")

def removeStatements(request):
    request_data = json.loads(request.body)
    parent_id = request_data["parent_id"]
    child_ids =  request_data["child_ids"]
    delegate = AccountDelegate()
    request_data = delegate.removeStatements(parent_id,child_ids)
    as_json = serializers.serialize("json",request_data)
    return HttpResponse(as_json,content_type="application/json")


def addStandingInstructions(request):
    request_data = json.loads(request.body)
    parent_id = request_data["parent_id"]
    child_ids =  request_data["child_ids"]
    delegate = AccountDelegate()
    request_data = delegate.addStandingInstructions(parent_id,child_ids)
    as_json = serializers.serialize("json",request_data)
    return HttpResponse(as_json,content_type="application/json")

def removeStandingInstructions(request):
    request_data = json.loads(request.body)
    parent_id = request_data["parent_id"]
    child_ids =  request_data["child_ids"]
    delegate = AccountDelegate()
    request_data = delegate.removeStandingInstructions(parent_id,child_ids)
    as_json = serializers.serialize("json",request_data)
    return HttpResponse(as_json,content_type="application/json")


def addFeeCharges(request):
    request_data = json.loads(request.body)
    parent_id = request_data["parent_id"]
    child_ids =  request_data["child_ids"]
    delegate = AccountDelegate()
    request_data = delegate.addFeeCharges(parent_id,child_ids)
    as_json = serializers.serialize("json",request_data)
    return HttpResponse(as_json,content_type="application/json")

def removeFeeCharges(request):
    request_data = json.loads(request.body)
    parent_id = request_data["parent_id"]
    child_ids =  request_data["child_ids"]
    delegate = AccountDelegate()
    request_data = delegate.removeFeeCharges(parent_id,child_ids)
    as_json = serializers.serialize("json",request_data)
    return HttpResponse(as_json,content_type="application/json")


