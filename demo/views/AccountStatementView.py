import json

from django.core import serializers
from django.shortcuts import render
from django.http import HttpResponse

from demo.delegates.AccountStatementDelegate import AccountStatementDelegate

 #======================================================================
# 
# Encapsulates data for View AccountStatement
#
# @author your_name_here
#
#======================================================================

#======================================================================
# Class AccountStatementView function declarations
#======================================================================
def index(request):
	return HttpResponse("Hello, world. You're at the AccountStatement index.")

def get(request, accountStatementId ):
	delegate = AccountStatementDelegate()
	responseData = delegate.get( accountStatementId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def create(request):
	accountStatement = json.loads(request.body)
	delegate = AccountStatementDelegate()
	responseData = delegate.createFromJson( accountStatement )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def save(request):
	accountStatement = json.loads(request.body)
	delegate = AccountStatementDelegate()
	responseData = delegate.save( accountStatement )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def delete(request, accountStatementId ):
	delegate = AccountStatementDelegate()
	responseData = delegate.delete( accountStatementId )
	return HttpResponse(responseData, content_type="application/json");

def getAll(request):
	delegate = AccountStatementDelegate()
	responseData = delegate.getAll()
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def assignAccount( request, accountStatementId, AccountId ):
	delegate = AccountStatementDelegate()
	responseData = delegate.saveAccount( accountStatementId, AccountId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");
	
def unassignAccount( request, accountStatementId ):
	delegate = AccountStatementDelegate()
	responseData = delegate.deleteAccount( accountStatementId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

