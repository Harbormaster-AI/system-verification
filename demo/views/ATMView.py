import json

from django.core import serializers
from django.shortcuts import render
from django.http import HttpResponse

from demo.delegates.ATMDelegate import ATMDelegate

 #======================================================================
# 
# Encapsulates data for View ATM
#
# @author your_name_here
#
#======================================================================

#======================================================================
# Class ATMView function declarations
#======================================================================
def index(request):
	return HttpResponse("Hello, world. You're at the ATM index.")

def get(request, aTMId ):
	delegate = ATMDelegate()
	responseData = delegate.get( aTMId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def create(request):
	aTM = json.loads(request.body)
	delegate = ATMDelegate()
	responseData = delegate.createFromJson( aTM )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def save(request):
	aTM = json.loads(request.body)
	delegate = ATMDelegate()
	responseData = delegate.save( aTM )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def delete(request, aTMId ):
	delegate = ATMDelegate()
	responseData = delegate.delete( aTMId )
	return HttpResponse(responseData, content_type="application/json");

def getAll(request):
	delegate = ATMDelegate()
	responseData = delegate.getAll()
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def assignBranch( request, aTMId, BranchId ):
	delegate = ATMDelegate()
	responseData = delegate.saveBranch( aTMId, BranchId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");
	
def unassignBranch( request, aTMId ):
	delegate = ATMDelegate()
	responseData = delegate.deleteBranch( aTMId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

