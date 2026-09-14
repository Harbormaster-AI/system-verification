import json

from django.core import serializers
from django.shortcuts import render
from django.http import HttpResponse

from demo.delegates.FeeChargeDelegate import FeeChargeDelegate

 #======================================================================
# 
# Encapsulates data for View FeeCharge
#
# @author your_name_here
#
#======================================================================

#======================================================================
# Class FeeChargeView function declarations
#======================================================================
def index(request):
	return HttpResponse("Hello, world. You're at the FeeCharge index.")

def get(request, feeChargeId ):
	delegate = FeeChargeDelegate()
	responseData = delegate.get( feeChargeId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def create(request):
	feeCharge = json.loads(request.body)
	delegate = FeeChargeDelegate()
	responseData = delegate.createFromJson( feeCharge )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def save(request):
	feeCharge = json.loads(request.body)
	delegate = FeeChargeDelegate()
	responseData = delegate.save( feeCharge )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def delete(request, feeChargeId ):
	delegate = FeeChargeDelegate()
	responseData = delegate.delete( feeChargeId )
	return HttpResponse(responseData, content_type="application/json");

def getAll(request):
	delegate = FeeChargeDelegate()
	responseData = delegate.getAll()
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def assignAccount( request, feeChargeId, AccountId ):
	delegate = FeeChargeDelegate()
	responseData = delegate.saveAccount( feeChargeId, AccountId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");
	
def unassignAccount( request, feeChargeId ):
	delegate = FeeChargeDelegate()
	responseData = delegate.deleteAccount( feeChargeId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def assignLoanAccount( request, feeChargeId, LoanAccountId ):
	delegate = FeeChargeDelegate()
	responseData = delegate.saveLoanAccount( feeChargeId, LoanAccountId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");
	
def unassignLoanAccount( request, feeChargeId ):
	delegate = FeeChargeDelegate()
	responseData = delegate.deleteLoanAccount( feeChargeId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

