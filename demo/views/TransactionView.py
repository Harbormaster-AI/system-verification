import json

from django.core import serializers
from django.shortcuts import render
from django.http import HttpResponse

from demo.delegates.TransactionDelegate import TransactionDelegate

 #======================================================================
# 
# Encapsulates data for View Transaction
#
# @author your_name_here
#
#======================================================================

#======================================================================
# Class TransactionView function declarations
#======================================================================
def index(request):
	return HttpResponse("Hello, world. You're at the Transaction index.")

def get(request, transactionId ):
	delegate = TransactionDelegate()
	responseData = delegate.get( transactionId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def create(request):
	transaction = json.loads(request.body)
	delegate = TransactionDelegate()
	responseData = delegate.createFromJson( transaction )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def save(request):
	transaction = json.loads(request.body)
	delegate = TransactionDelegate()
	responseData = delegate.save( transaction )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def delete(request, transactionId ):
	delegate = TransactionDelegate()
	responseData = delegate.delete( transactionId )
	return HttpResponse(responseData, content_type="application/json");

def getAll(request):
	delegate = TransactionDelegate()
	responseData = delegate.getAll()
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def assignAccount( request, transactionId, AccountId ):
	delegate = TransactionDelegate()
	responseData = delegate.saveAccount( transactionId, AccountId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");
	
def unassignAccount( request, transactionId ):
	delegate = TransactionDelegate()
	responseData = delegate.deleteAccount( transactionId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def assignExternalCounterparty( request, transactionId, ExternalCounterpartyId ):
	delegate = TransactionDelegate()
	responseData = delegate.saveExternalCounterparty( transactionId, ExternalCounterpartyId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");
	
def unassignExternalCounterparty( request, transactionId ):
	delegate = TransactionDelegate()
	responseData = delegate.deleteExternalCounterparty( transactionId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def assignPaymentCard( request, transactionId, PaymentCardId ):
	delegate = TransactionDelegate()
	responseData = delegate.savePaymentCard( transactionId, PaymentCardId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");
	
def unassignPaymentCard( request, transactionId ):
	delegate = TransactionDelegate()
	responseData = delegate.deletePaymentCard( transactionId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def assignFundsTransfer( request, transactionId, FundsTransferId ):
	delegate = TransactionDelegate()
	responseData = delegate.saveFundsTransfer( transactionId, FundsTransferId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");
	
def unassignFundsTransfer( request, transactionId ):
	delegate = TransactionDelegate()
	responseData = delegate.deleteFundsTransfer( transactionId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def assignFxTrade( request, transactionId, FxTradeId ):
	delegate = TransactionDelegate()
	responseData = delegate.saveFxTrade( transactionId, FxTradeId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");
	
def unassignFxTrade( request, transactionId ):
	delegate = TransactionDelegate()
	responseData = delegate.deleteFxTrade( transactionId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def assignDispute( request, transactionId, DisputeId ):
	delegate = TransactionDelegate()
	responseData = delegate.saveDispute( transactionId, DisputeId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");
	
def unassignDispute( request, transactionId ):
	delegate = TransactionDelegate()
	responseData = delegate.deleteDispute( transactionId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

