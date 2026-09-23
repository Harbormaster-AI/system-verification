import json

from django.core import serializers
from django.shortcuts import render
from django.http import HttpResponse

from bankingOnDjango.delegates.ATMDelegate import ATMDelegate

 #======================================================================
# 
# Encapsulates data for View ATM
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class ATMView function declarations
#======================================================================
def index(request):
	return HttpResponse("Hello, world. You're at the ATM index.")


def get(request):
    request_data = json.loads(request.body)
    aTM_id = request_data["id"]
    delegate = ATMDelegate()
    request_data = delegate.get(aTM_id)
    as_json = serializers.serialize("json",request_data)
    return HttpResponse(as_json,content_type="application/json")

def create(request):
	aTM = json.loads(request.body)
	delegate = ATMDelegate()
	request_data = delegate.createFromJson( aTM )
	as_json = serializers.serialize("json", request_data)
	return HttpResponse(as_json, content_type="application/json");

def update(request):
	aTM = json.loads(request.body)
	delegate = ATMDelegate()
	request_data = delegate.save( aTM )
	as_json = serializers.serialize("json", request_data)
	return HttpResponse(as_json, content_type="application/json");

def delete(request):
    request_data = json.loads(request.body)
    aTM_id = request_data["id"]
    delegate = ATMDelegate()
    request_data = delegate.delete(aTM_id)
    as_json = serializers.serialize("json",request_data)
    return HttpResponse(as_json,content_type="application/json")

def getAll(request):
    delegate = ATMDelegate()
    request_data = delegate.getAll()
    as_json = serializers.serialize("json", request_data)
    return HttpResponse(as_json, content_type="application/json");


    # ---------------------------------------------------------
    # Single association
    # ---------------------------------------------------------
def assignBranch(request):
    request_data = json.loads(request.body)
    parent_id = request_data["parent_id"]
    child_id = request_data["childId"]
    delegate = ATMDelegate()
    request_data = delegate.assignBranch(parent_id,childId)
    as_json = serializers.serialize("json",request_data)
    return HttpResponse(as_json,content_type="application/json")

def unassignBranch(request):
    request_data = json.loads(request.body)
    parent_id = request_data["parent_id"]
    child_id = request_data["childId"]
    delegate = ATMDelegate()
    request_data = delegate.unassignBranch(parent_id,childId)
    as_json = serializers.serialize("json",request_data)
    return HttpResponse(as_json,content_type="application/json")


    # ---------------------------------------------------------
    # Multiple association
    # ---------------------------------------------------------
