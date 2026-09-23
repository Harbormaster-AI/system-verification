import json

from django.core import serializers
from django.shortcuts import render
from django.http import HttpResponse

from bankingOnDjango.delegates.CollateralDelegate import CollateralDelegate

 #======================================================================
# 
# Encapsulates data for View Collateral
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class CollateralView function declarations
#======================================================================
def index(request):
	return HttpResponse("Hello, world. You're at the Collateral index.")


def get(request):
    request_data = json.loads(request.body)
    collateral_id = request_data["id"]
    delegate = CollateralDelegate()
    request_data = delegate.get(collateral_id)
    as_json = serializers.serialize("json",request_data)
    return HttpResponse(as_json,content_type="application/json")

def create(request):
	collateral = json.loads(request.body)
	delegate = CollateralDelegate()
	request_data = delegate.createFromJson( collateral )
	as_json = serializers.serialize("json", request_data)
	return HttpResponse(as_json, content_type="application/json");

def update(request):
	collateral = json.loads(request.body)
	delegate = CollateralDelegate()
	request_data = delegate.save( collateral )
	as_json = serializers.serialize("json", request_data)
	return HttpResponse(as_json, content_type="application/json");

def delete(request):
    request_data = json.loads(request.body)
    collateral_id = request_data["id"]
    delegate = CollateralDelegate()
    request_data = delegate.delete(collateral_id)
    as_json = serializers.serialize("json",request_data)
    return HttpResponse(as_json,content_type="application/json")

def getAll(request):
    delegate = CollateralDelegate()
    request_data = delegate.getAll()
    as_json = serializers.serialize("json", request_data)
    return HttpResponse(as_json, content_type="application/json");


    # ---------------------------------------------------------
    # Single association
    # ---------------------------------------------------------
def assignLoanAccount(request):
    request_data = json.loads(request.body)
    parent_id = request_data["parent_id"]
    child_id = request_data["childId"]
    delegate = CollateralDelegate()
    request_data = delegate.assignLoanAccount(parent_id,child_id)
    as_json = serializers.serialize("json",request_data)
    return HttpResponse(as_json,content_type="application/json")

def unassignLoanAccount(request):
    request_data = json.loads(request.body)
    parent_id = request_data["parent_id"]
    child_id = request_data["childId"]
    delegate = CollateralDelegate()
    request_data = delegate.unassignLoanAccount(parent_id,child_id)
    as_json = serializers.serialize("json",request_data)
    return HttpResponse(as_json,content_type="application/json")


    # ---------------------------------------------------------
    # Multiple association
    # ---------------------------------------------------------
