import json

from django.core import serializers
from django.shortcuts import render
from django.http import HttpResponse

from demo.delegates.LoanAccountDelegate import LoanAccountDelegate

 #======================================================================
# 
# Encapsulates data for View LoanAccount
#
# @author your_name_here
#
#======================================================================

#======================================================================
# Class LoanAccountView function declarations
#======================================================================
def index(request):
	return HttpResponse("Hello, world. You're at the LoanAccount index.")

def get(request, loanAccountId ):
	delegate = LoanAccountDelegate()
	responseData = delegate.get( loanAccountId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def create(request):
	loanAccount = json.loads(request.body)
	delegate = LoanAccountDelegate()
	responseData = delegate.createFromJson( loanAccount )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def save(request):
	loanAccount = json.loads(request.body)
	delegate = LoanAccountDelegate()
	responseData = delegate.save( loanAccount )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def delete(request, loanAccountId ):
	delegate = LoanAccountDelegate()
	responseData = delegate.delete( loanAccountId )
	return HttpResponse(responseData, content_type="application/json");

def getAll(request):
	delegate = LoanAccountDelegate()
	responseData = delegate.getAll()
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def assignBank( request, loanAccountId, BankId ):
	delegate = LoanAccountDelegate()
	responseData = delegate.saveBank( loanAccountId, BankId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");
	
def unassignBank( request, loanAccountId ):
	delegate = LoanAccountDelegate()
	responseData = delegate.deleteBank( loanAccountId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def assignBranch( request, loanAccountId, BranchId ):
	delegate = LoanAccountDelegate()
	responseData = delegate.saveBranch( loanAccountId, BranchId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");
	
def unassignBranch( request, loanAccountId ):
	delegate = LoanAccountDelegate()
	responseData = delegate.deleteBranch( loanAccountId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def assignProduct( request, loanAccountId, ProductId ):
	delegate = LoanAccountDelegate()
	responseData = delegate.saveProduct( loanAccountId, ProductId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");
	
def unassignProduct( request, loanAccountId ):
	delegate = LoanAccountDelegate()
	responseData = delegate.deleteProduct( loanAccountId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def addBorrowers( request, loanAccountId, BorrowersIds ):
	delegate = LoanAccountDelegate()
	responseData = delegate.addBorrowers( loanAccountId, BorrowersIds )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def removeBorrowers( request, loanAccountId, BorrowersIds ):
	delegate = LoanAccountDelegate()
	responseData = delegate.removeBorrowers( loanAccountId, BorrowersIds )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def addRepaymentSchedule( request, loanAccountId, RepaymentScheduleIds ):
	delegate = LoanAccountDelegate()
	responseData = delegate.addRepaymentSchedule( loanAccountId, RepaymentScheduleIds )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def removeRepaymentSchedule( request, loanAccountId, RepaymentScheduleIds ):
	delegate = LoanAccountDelegate()
	responseData = delegate.removeRepaymentSchedule( loanAccountId, RepaymentScheduleIds )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def addPayments( request, loanAccountId, PaymentsIds ):
	delegate = LoanAccountDelegate()
	responseData = delegate.addPayments( loanAccountId, PaymentsIds )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def removePayments( request, loanAccountId, PaymentsIds ):
	delegate = LoanAccountDelegate()
	responseData = delegate.removePayments( loanAccountId, PaymentsIds )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def addCollateral( request, loanAccountId, CollateralIds ):
	delegate = LoanAccountDelegate()
	responseData = delegate.addCollateral( loanAccountId, CollateralIds )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def removeCollateral( request, loanAccountId, CollateralIds ):
	delegate = LoanAccountDelegate()
	responseData = delegate.removeCollateral( loanAccountId, CollateralIds )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def addFeeCharges( request, loanAccountId, FeeChargesIds ):
	delegate = LoanAccountDelegate()
	responseData = delegate.addFeeCharges( loanAccountId, FeeChargesIds )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def removeFeeCharges( request, loanAccountId, FeeChargesIds ):
	delegate = LoanAccountDelegate()
	responseData = delegate.removeFeeCharges( loanAccountId, FeeChargesIds )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

