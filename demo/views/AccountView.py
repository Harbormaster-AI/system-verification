import json

from django.core import serializers
from django.shortcuts import render
from django.http import HttpResponse

from demo.delegates.AccountDelegate import AccountDelegate

 #======================================================================
# 
# Encapsulates data for View Account
#
# @author your_name_here
#
#======================================================================

#======================================================================
# Class AccountView function declarations
#======================================================================
def index(request):
	return HttpResponse("Hello, world. You're at the Account index.")

def get(request, accountId ):
	delegate = AccountDelegate()
	responseData = delegate.get( accountId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def create(request):
	account = json.loads(request.body)
	delegate = AccountDelegate()
	responseData = delegate.createFromJson( account )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def save(request):
	account = json.loads(request.body)
	delegate = AccountDelegate()
	responseData = delegate.save( account )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def delete(request, accountId ):
	delegate = AccountDelegate()
	responseData = delegate.delete( accountId )
	return HttpResponse(responseData, content_type="application/json");

def getAll(request):
	delegate = AccountDelegate()
	responseData = delegate.getAll()
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def assignBank( request, accountId, BankId ):
	delegate = AccountDelegate()
	responseData = delegate.saveBank( accountId, BankId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");
	
def unassignBank( request, accountId ):
	delegate = AccountDelegate()
	responseData = delegate.deleteBank( accountId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def assignBranch( request, accountId, BranchId ):
	delegate = AccountDelegate()
	responseData = delegate.saveBranch( accountId, BranchId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");
	
def unassignBranch( request, accountId ):
	delegate = AccountDelegate()
	responseData = delegate.deleteBranch( accountId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def assignProduct( request, accountId, ProductId ):
	delegate = AccountDelegate()
	responseData = delegate.saveProduct( accountId, ProductId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");
	
def unassignProduct( request, accountId ):
	delegate = AccountDelegate()
	responseData = delegate.deleteProduct( accountId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def addOwners( request, accountId, OwnersIds ):
	delegate = AccountDelegate()
	responseData = delegate.addOwners( accountId, OwnersIds )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def removeOwners( request, accountId, OwnersIds ):
	delegate = AccountDelegate()
	responseData = delegate.removeOwners( accountId, OwnersIds )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def addTransactions( request, accountId, TransactionsIds ):
	delegate = AccountDelegate()
	responseData = delegate.addTransactions( accountId, TransactionsIds )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def removeTransactions( request, accountId, TransactionsIds ):
	delegate = AccountDelegate()
	responseData = delegate.removeTransactions( accountId, TransactionsIds )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def addStatements( request, accountId, StatementsIds ):
	delegate = AccountDelegate()
	responseData = delegate.addStatements( accountId, StatementsIds )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def removeStatements( request, accountId, StatementsIds ):
	delegate = AccountDelegate()
	responseData = delegate.removeStatements( accountId, StatementsIds )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def addStandingInstructions( request, accountId, StandingInstructionsIds ):
	delegate = AccountDelegate()
	responseData = delegate.addStandingInstructions( accountId, StandingInstructionsIds )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def removeStandingInstructions( request, accountId, StandingInstructionsIds ):
	delegate = AccountDelegate()
	responseData = delegate.removeStandingInstructions( accountId, StandingInstructionsIds )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def addFeeCharges( request, accountId, FeeChargesIds ):
	delegate = AccountDelegate()
	responseData = delegate.addFeeCharges( accountId, FeeChargesIds )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def removeFeeCharges( request, accountId, FeeChargesIds ):
	delegate = AccountDelegate()
	responseData = delegate.removeFeeCharges( accountId, FeeChargesIds )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

