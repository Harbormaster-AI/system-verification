import json

from django.core import serializers
from django.shortcuts import render
from django.http import HttpResponse

from bankingOnDjango.delegates.LoanAccountDelegate import LoanAccountDelegate

# ======================================================================
#
# Encapsulates data for View LoanAccount
#
# @author Harbormaster Dev Team
#
# ======================================================================


# ======================================================================
# Class LoanAccountView function declarations
# ======================================================================
def index(request):
    return HttpResponse("Hello, world. You're at the LoanAccount index.")


def get(request):
    request_data = json.loads(request.body)
    loanAccount_id = request_data["id"]
    delegate = LoanAccountDelegate()
    request_data = delegate.get(loanAccount_id)
    as_json = serializers.serialize("json", request_data)
    return HttpResponse(as_json, content_type="application/json")


def create(request):
    loanAccount = json.loads(request.body)
    delegate = LoanAccountDelegate()
    request_data = delegate.createFromJson(loanAccount)
    as_json = serializers.serialize("json", request_data)
    return HttpResponse(as_json, content_type="application/json")


def update(request):
    loanAccount = json.loads(request.body)
    delegate = LoanAccountDelegate()
    request_data = delegate.save(loanAccount)
    as_json = serializers.serialize("json", request_data)
    return HttpResponse(as_json, content_type="application/json")


def delete(request):
    request_data = json.loads(request.body)
    loanAccount_id = request_data["id"]
    delegate = LoanAccountDelegate()
    request_data = delegate.delete(loanAccount_id)
    as_json = serializers.serialize("json", request_data)
    return HttpResponse(as_json, content_type="application/json")


def getAll(request):
    delegate = LoanAccountDelegate()
    request_data = delegate.getAll()
    as_json = serializers.serialize("json", request_data)
    return HttpResponse(as_json, content_type="application/json")

    # ---------------------------------------------------------
    # Single association
    # ---------------------------------------------------------


def assignBank(request):
    request_data = json.loads(request.body)
    parent_id = request_data["parent_id"]
    child_id = request_data["childId"]
    delegate = LoanAccountDelegate()
    request_data = delegate.assignBank(parent_id, childId)
    as_json = serializers.serialize("json", request_data)
    return HttpResponse(as_json, content_type="application/json")


def unassignBank(request):
    request_data = json.loads(request.body)
    parent_id = request_data["parent_id"]
    child_id = request_data["childId"]
    delegate = LoanAccountDelegate()
    request_data = delegate.unassignBank(parent_id, childId)
    as_json = serializers.serialize("json", request_data)
    return HttpResponse(as_json, content_type="application/json")


def assignBranch(request):
    request_data = json.loads(request.body)
    parent_id = request_data["parent_id"]
    child_id = request_data["childId"]
    delegate = LoanAccountDelegate()
    request_data = delegate.assignBranch(parent_id, childId)
    as_json = serializers.serialize("json", request_data)
    return HttpResponse(as_json, content_type="application/json")


def unassignBranch(request):
    request_data = json.loads(request.body)
    parent_id = request_data["parent_id"]
    child_id = request_data["childId"]
    delegate = LoanAccountDelegate()
    request_data = delegate.unassignBranch(parent_id, childId)
    as_json = serializers.serialize("json", request_data)
    return HttpResponse(as_json, content_type="application/json")


def assignProduct(request):
    request_data = json.loads(request.body)
    parent_id = request_data["parent_id"]
    child_id = request_data["childId"]
    delegate = LoanAccountDelegate()
    request_data = delegate.assignProduct(parent_id, childId)
    as_json = serializers.serialize("json", request_data)
    return HttpResponse(as_json, content_type="application/json")


def unassignProduct(request):
    request_data = json.loads(request.body)
    parent_id = request_data["parent_id"]
    child_id = request_data["childId"]
    delegate = LoanAccountDelegate()
    request_data = delegate.unassignProduct(parent_id, childId)
    as_json = serializers.serialize("json", request_data)
    return HttpResponse(as_json, content_type="application/json")

    # ---------------------------------------------------------
    # Multiple association
    # ---------------------------------------------------------


def addBorrowers(request):
    request_data = json.loads(request.body)
    parent_id = request_data["parent_id"]
    child_ids = request_data["child_ids"]
    delegate = LoanAccountDelegate()
    request_data = delegate.addBorrowers(parent_id, child_ids)
    as_json = serializers.serialize("json", request_data)
    return HttpResponse(as_json, content_type="application/json")


def removeBorrowers(request):
    request_data = json.loads(request.body)
    parent_id = request_data["parent_id"]
    child_ids = request_data["child_ids"]
    delegate = LoanAccountDelegate()
    request_data = delegate.removeBorrowers(parent_id, child_ids)
    as_json = serializers.serialize("json", request_data)
    return HttpResponse(as_json, content_type="application/json")


def addRepaymentSchedule(request):
    request_data = json.loads(request.body)
    parent_id = request_data["parent_id"]
    child_ids = request_data["child_ids"]
    delegate = LoanAccountDelegate()
    request_data = delegate.addRepaymentSchedule(parent_id, child_ids)
    as_json = serializers.serialize("json", request_data)
    return HttpResponse(as_json, content_type="application/json")


def removeRepaymentSchedule(request):
    request_data = json.loads(request.body)
    parent_id = request_data["parent_id"]
    child_ids = request_data["child_ids"]
    delegate = LoanAccountDelegate()
    request_data = delegate.removeRepaymentSchedule(parent_id, child_ids)
    as_json = serializers.serialize("json", request_data)
    return HttpResponse(as_json, content_type="application/json")


def addPayments(request):
    request_data = json.loads(request.body)
    parent_id = request_data["parent_id"]
    child_ids = request_data["child_ids"]
    delegate = LoanAccountDelegate()
    request_data = delegate.addPayments(parent_id, child_ids)
    as_json = serializers.serialize("json", request_data)
    return HttpResponse(as_json, content_type="application/json")


def removePayments(request):
    request_data = json.loads(request.body)
    parent_id = request_data["parent_id"]
    child_ids = request_data["child_ids"]
    delegate = LoanAccountDelegate()
    request_data = delegate.removePayments(parent_id, child_ids)
    as_json = serializers.serialize("json", request_data)
    return HttpResponse(as_json, content_type="application/json")


def addCollateral(request):
    request_data = json.loads(request.body)
    parent_id = request_data["parent_id"]
    child_ids = request_data["child_ids"]
    delegate = LoanAccountDelegate()
    request_data = delegate.addCollateral(parent_id, child_ids)
    as_json = serializers.serialize("json", request_data)
    return HttpResponse(as_json, content_type="application/json")


def removeCollateral(request):
    request_data = json.loads(request.body)
    parent_id = request_data["parent_id"]
    child_ids = request_data["child_ids"]
    delegate = LoanAccountDelegate()
    request_data = delegate.removeCollateral(parent_id, child_ids)
    as_json = serializers.serialize("json", request_data)
    return HttpResponse(as_json, content_type="application/json")


def addFeeCharges(request):
    request_data = json.loads(request.body)
    parent_id = request_data["parent_id"]
    child_ids = request_data["child_ids"]
    delegate = LoanAccountDelegate()
    request_data = delegate.addFeeCharges(parent_id, child_ids)
    as_json = serializers.serialize("json", request_data)
    return HttpResponse(as_json, content_type="application/json")


def removeFeeCharges(request):
    request_data = json.loads(request.body)
    parent_id = request_data["parent_id"]
    child_ids = request_data["child_ids"]
    delegate = LoanAccountDelegate()
    request_data = delegate.removeFeeCharges(parent_id, child_ids)
    as_json = serializers.serialize("json", request_data)
    return HttpResponse(as_json, content_type="application/json")
