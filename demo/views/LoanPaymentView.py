import json

from django.core import serializers
from django.shortcuts import render
from django.http import HttpResponse

from demo.delegates.LoanPaymentDelegate import LoanPaymentDelegate

 #======================================================================
# 
# Encapsulates data for View LoanPayment
#
# @author your_name_here
#
#======================================================================

#======================================================================
# Class LoanPaymentView function declarations
#======================================================================
def index(request):
	return HttpResponse("Hello, world. You're at the LoanPayment index.")

def get(request, loanPaymentId ):
	delegate = LoanPaymentDelegate()
	responseData = delegate.get( loanPaymentId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def create(request):
	loanPayment = json.loads(request.body)
	delegate = LoanPaymentDelegate()
	responseData = delegate.createFromJson( loanPayment )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def save(request):
	loanPayment = json.loads(request.body)
	delegate = LoanPaymentDelegate()
	responseData = delegate.save( loanPayment )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def delete(request, loanPaymentId ):
	delegate = LoanPaymentDelegate()
	responseData = delegate.delete( loanPaymentId )
	return HttpResponse(responseData, content_type="application/json");

def getAll(request):
	delegate = LoanPaymentDelegate()
	responseData = delegate.getAll()
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def assignLoanAccount( request, loanPaymentId, LoanAccountId ):
	delegate = LoanPaymentDelegate()
	responseData = delegate.saveLoanAccount( loanPaymentId, LoanAccountId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");
	
def unassignLoanAccount( request, loanPaymentId ):
	delegate = LoanPaymentDelegate()
	responseData = delegate.deleteLoanAccount( loanPaymentId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def assignTransaction( request, loanPaymentId, TransactionId ):
	delegate = LoanPaymentDelegate()
	responseData = delegate.saveTransaction( loanPaymentId, TransactionId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");
	
def unassignTransaction( request, loanPaymentId ):
	delegate = LoanPaymentDelegate()
	responseData = delegate.deleteTransaction( loanPaymentId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

