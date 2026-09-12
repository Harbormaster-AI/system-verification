import json

from django.core import serializers
from django.shortcuts import render
from django.http import HttpResponse

from demo.delegates.BankingProductDelegate import BankingProductDelegate

 #======================================================================
# 
# Encapsulates data for View BankingProduct
#
# @author your_name_here
#
#======================================================================

#======================================================================
# Class BankingProductView function declarations
#======================================================================
def index(request):
	return HttpResponse("Hello, world. You're at the BankingProduct index.")

def get(request, bankingProductId ):
	delegate = BankingProductDelegate()
	responseData = delegate.get( bankingProductId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def create(request):
	bankingProduct = json.loads(request.body)
	delegate = BankingProductDelegate()
	responseData = delegate.createFromJson( bankingProduct )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def save(request):
	bankingProduct = json.loads(request.body)
	delegate = BankingProductDelegate()
	responseData = delegate.save( bankingProduct )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def delete(request, bankingProductId ):
	delegate = BankingProductDelegate()
	responseData = delegate.delete( bankingProductId )
	return HttpResponse(responseData, content_type="application/json");

def getAll(request):
	delegate = BankingProductDelegate()
	responseData = delegate.getAll()
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def assignBank( request, bankingProductId, BankId ):
	delegate = BankingProductDelegate()
	responseData = delegate.saveBank( bankingProductId, BankId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");
	
def unassignBank( request, bankingProductId ):
	delegate = BankingProductDelegate()
	responseData = delegate.deleteBank( bankingProductId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def addAccounts( request, bankingProductId, AccountsIds ):
	delegate = BankingProductDelegate()
	responseData = delegate.addAccounts( bankingProductId, AccountsIds )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def removeAccounts( request, bankingProductId, AccountsIds ):
	delegate = BankingProductDelegate()
	responseData = delegate.removeAccounts( bankingProductId, AccountsIds )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def addLoanAccounts( request, bankingProductId, LoanAccountsIds ):
	delegate = BankingProductDelegate()
	responseData = delegate.addLoanAccounts( bankingProductId, LoanAccountsIds )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def removeLoanAccounts( request, bankingProductId, LoanAccountsIds ):
	delegate = BankingProductDelegate()
	responseData = delegate.removeLoanAccounts( bankingProductId, LoanAccountsIds )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def addPaymentCards( request, bankingProductId, PaymentCardsIds ):
	delegate = BankingProductDelegate()
	responseData = delegate.addPaymentCards( bankingProductId, PaymentCardsIds )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def removePaymentCards( request, bankingProductId, PaymentCardsIds ):
	delegate = BankingProductDelegate()
	responseData = delegate.removePaymentCards( bankingProductId, PaymentCardsIds )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

