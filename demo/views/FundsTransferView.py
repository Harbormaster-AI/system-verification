import json

from django.core import serializers
from django.shortcuts import render
from django.http import HttpResponse

from demo.delegates.FundsTransferDelegate import FundsTransferDelegate

 #======================================================================
# 
# Encapsulates data for View FundsTransfer
#
# @author your_name_here
#
#======================================================================

#======================================================================
# Class FundsTransferView function declarations
#======================================================================
def index(request):
	return HttpResponse("Hello, world. You're at the FundsTransfer index.")

def get(request, fundsTransferId ):
	delegate = FundsTransferDelegate()
	responseData = delegate.get( fundsTransferId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def create(request):
	fundsTransfer = json.loads(request.body)
	delegate = FundsTransferDelegate()
	responseData = delegate.createFromJson( fundsTransfer )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def save(request):
	fundsTransfer = json.loads(request.body)
	delegate = FundsTransferDelegate()
	responseData = delegate.save( fundsTransfer )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def delete(request, fundsTransferId ):
	delegate = FundsTransferDelegate()
	responseData = delegate.delete( fundsTransferId )
	return HttpResponse(responseData, content_type="application/json");

def getAll(request):
	delegate = FundsTransferDelegate()
	responseData = delegate.getAll()
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def assignSourceAccount( request, fundsTransferId, SourceAccountId ):
	delegate = FundsTransferDelegate()
	responseData = delegate.saveSourceAccount( fundsTransferId, SourceAccountId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");
	
def unassignSourceAccount( request, fundsTransferId ):
	delegate = FundsTransferDelegate()
	responseData = delegate.deleteSourceAccount( fundsTransferId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def assignDestinationAccount( request, fundsTransferId, DestinationAccountId ):
	delegate = FundsTransferDelegate()
	responseData = delegate.saveDestinationAccount( fundsTransferId, DestinationAccountId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");
	
def unassignDestinationAccount( request, fundsTransferId ):
	delegate = FundsTransferDelegate()
	responseData = delegate.deleteDestinationAccount( fundsTransferId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def assignExternalBeneficiary( request, fundsTransferId, ExternalBeneficiaryId ):
	delegate = FundsTransferDelegate()
	responseData = delegate.saveExternalBeneficiary( fundsTransferId, ExternalBeneficiaryId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");
	
def unassignExternalBeneficiary( request, fundsTransferId ):
	delegate = FundsTransferDelegate()
	responseData = delegate.deleteExternalBeneficiary( fundsTransferId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def assignInitiatedBy( request, fundsTransferId, InitiatedById ):
	delegate = FundsTransferDelegate()
	responseData = delegate.saveInitiatedBy( fundsTransferId, InitiatedById )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");
	
def unassignInitiatedBy( request, fundsTransferId ):
	delegate = FundsTransferDelegate()
	responseData = delegate.deleteInitiatedBy( fundsTransferId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def addTransactions( request, fundsTransferId, TransactionsIds ):
	delegate = FundsTransferDelegate()
	responseData = delegate.addTransactions( fundsTransferId, TransactionsIds )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def removeTransactions( request, fundsTransferId, TransactionsIds ):
	delegate = FundsTransferDelegate()
	responseData = delegate.removeTransactions( fundsTransferId, TransactionsIds )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

