import json

from django.core import serializers
from django.shortcuts import render
from django.http import HttpResponse

from demo.delegates.DisputeDelegate import DisputeDelegate

 #======================================================================
# 
# Encapsulates data for View Dispute
#
# @author your_name_here
#
#======================================================================

#======================================================================
# Class DisputeView function declarations
#======================================================================
def index(request):
	return HttpResponse("Hello, world. You're at the Dispute index.")

def get(request, disputeId ):
	delegate = DisputeDelegate()
	responseData = delegate.get( disputeId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def create(request):
	dispute = json.loads(request.body)
	delegate = DisputeDelegate()
	responseData = delegate.createFromJson( dispute )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def save(request):
	dispute = json.loads(request.body)
	delegate = DisputeDelegate()
	responseData = delegate.save( dispute )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def delete(request, disputeId ):
	delegate = DisputeDelegate()
	responseData = delegate.delete( disputeId )
	return HttpResponse(responseData, content_type="application/json");

def getAll(request):
	delegate = DisputeDelegate()
	responseData = delegate.getAll()
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def assignTransaction( request, disputeId, TransactionId ):
	delegate = DisputeDelegate()
	responseData = delegate.saveTransaction( disputeId, TransactionId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");
	
def unassignTransaction( request, disputeId ):
	delegate = DisputeDelegate()
	responseData = delegate.deleteTransaction( disputeId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def assignCustomer( request, disputeId, CustomerId ):
	delegate = DisputeDelegate()
	responseData = delegate.saveCustomer( disputeId, CustomerId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");
	
def unassignCustomer( request, disputeId ):
	delegate = DisputeDelegate()
	responseData = delegate.deleteCustomer( disputeId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def assignAccount( request, disputeId, AccountId ):
	delegate = DisputeDelegate()
	responseData = delegate.saveAccount( disputeId, AccountId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");
	
def unassignAccount( request, disputeId ):
	delegate = DisputeDelegate()
	responseData = delegate.deleteAccount( disputeId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def assignPaymentCard( request, disputeId, PaymentCardId ):
	delegate = DisputeDelegate()
	responseData = delegate.savePaymentCard( disputeId, PaymentCardId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");
	
def unassignPaymentCard( request, disputeId ):
	delegate = DisputeDelegate()
	responseData = delegate.deletePaymentCard( disputeId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

