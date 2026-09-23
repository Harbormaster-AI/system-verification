import json

from django.core import serializers
from django.shortcuts import render
from django.http import HttpResponse

from bankingOnDjango.delegates.LoanPaymentDelegate import LoanPaymentDelegate

 #======================================================================
# 
# Encapsulates data for View LoanPayment
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class LoanPaymentView function declarations
#======================================================================
def index(request):
	return HttpResponse("Hello, world. You're at the LoanPayment index.")


def get(request):
    requestData = json.loads(request.body)
    loanPaymentId = requestData["id"]
    delegate = LoanPaymentDelegate()
    responseData = delegate.get(loanPaymentId)
    asJson = serializers.serialize("json",responseData)
    return HttpResponse(asJson,content_type="application/json")

def create(request):
	loanPayment = json.loads(request.body)
	delegate = LoanPaymentDelegate()
	responseData = delegate.createFromJson( loanPayment )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def update(request):
	loanPayment = json.loads(request.body)
	delegate = LoanPaymentDelegate()
	responseData = delegate.save( loanPayment )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def delete(request):
    requestData = json.loads(request.body)
    loanPaymentId = requestData["id"]
    delegate = LoanPaymentDelegate()
    responseData = delegate.delete(loanPaymentId)
    asJson = serializers.serialize("json",responseData)
    return HttpResponse(asJson,content_type="application/json")

def getAll(request):
    delegate = LoanPaymentDelegate()
    responseData = delegate.getAll()
    asJson = serializers.serialize("json", responseData)
    return HttpResponse(asJson, content_type="application/json");


    # ---------------------------------------------------------
    # Single association
    # ---------------------------------------------------------
def assignLoanAccount(request):
    requestData = json.loads(request.body)
    parentId = requestData["parentId"]
    childId = requestData["childId"]
    delegate = LoanPaymentDelegate()
    responseData = delegate.assignLoanAccount(parentId,childId)
    asJson = serializers.serialize("json",responseData)
    return HttpResponse(asJson,content_type="application/json")

def unassignLoanAccount(request):
    requestData = json.loads(request.body)
    parentId = requestData["parentId"]
    childId = requestData["childId"]
    delegate = LoanPaymentDelegate()
    responseData = delegate.unassignLoanAccount(parentId,childId)
    asJson = serializers.serialize("json",responseData)
    return HttpResponse(asJson,content_type="application/json")
def assignTransaction(request):
    requestData = json.loads(request.body)
    parentId = requestData["parentId"]
    childId = requestData["childId"]
    delegate = LoanPaymentDelegate()
    responseData = delegate.assignTransaction(parentId,childId)
    asJson = serializers.serialize("json",responseData)
    return HttpResponse(asJson,content_type="application/json")

def unassignTransaction(request):
    requestData = json.loads(request.body)
    parentId = requestData["parentId"]
    childId = requestData["childId"]
    delegate = LoanPaymentDelegate()
    responseData = delegate.unassignTransaction(parentId,childId)
    asJson = serializers.serialize("json",responseData)
    return HttpResponse(asJson,content_type="application/json")


    # ---------------------------------------------------------
    # Multiple association
    # ---------------------------------------------------------
