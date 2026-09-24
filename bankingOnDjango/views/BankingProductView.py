import json

from django.core import serializers

from django.http import HttpResponse

from bankingOnDjango.delegates.BankingProductDelegate import BankingProductDelegate

# ======================================================================
#
# Encapsulates data for View BankingProduct
#
# @author Harbormaster Dev Team
#
# ======================================================================


# ======================================================================
# Class BankingProductView function declarations
# ======================================================================
def index(request):
    return HttpResponse("Hello, world. You're at the BankingProduct index.")


def get(request):
    request_data = json.loads(request.body)
    banking_product_id = request_data["id"]
    delegate = BankingProductDelegate()
    request_data = delegate.get(banking_product_id)
    as_json = serializers.serialize("json", request_data)
    return HttpResponse(as_json, content_type="application/json")


def create(request):
    banking_product = json.loads(request.body)
    delegate = BankingProductDelegate()
    request_data = delegate.createFromJson(banking_product)
    as_json = serializers.serialize("json", request_data)
    return HttpResponse(as_json, content_type="application/json")


def update(request):
    banking_product = json.loads(request.body)
    delegate = BankingProductDelegate()
    request_data = delegate.save(banking_product)
    as_json = serializers.serialize("json", request_data)
    return HttpResponse(as_json, content_type="application/json")


def delete(request):
    request_data = json.loads(request.body)
    banking_product_id = request_data["id"]
    delegate = BankingProductDelegate()
    request_data = delegate.delete(banking_product_id)
    as_json = serializers.serialize("json", request_data)
    return HttpResponse(as_json, content_type="application/json")


def getAll(request):
    delegate = BankingProductDelegate()
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
    delegate = BankingProductDelegate()
    request_data = delegate.assignBank(parent_id, child_id)
    as_json = serializers.serialize("json", request_data)
    return HttpResponse(as_json, content_type="application/json")


def unassignBank(request):
    request_data = json.loads(request.body)
    parent_id = request_data["parent_id"]
    child_id = request_data["childId"]
    delegate = BankingProductDelegate()
    request_data = delegate.unassignBank(parent_id, child_id)
    as_json = serializers.serialize("json", request_data)
    return HttpResponse(as_json, content_type="application/json")

    # ---------------------------------------------------------
    # Multiple association
    # ---------------------------------------------------------


def addAccounts(request):
    request_data = json.loads(request.body)
    parent_id = request_data["parent_id"]
    child_ids = request_data["child_ids"]
    delegate = BankingProductDelegate()
    request_data = delegate.addAccounts(parent_id, child_ids)
    as_json = serializers.serialize("json", request_data)
    return HttpResponse(as_json, content_type="application/json")


def removeAccounts(request):
    request_data = json.loads(request.body)
    parent_id = request_data["parent_id"]
    child_ids = request_data["child_ids"]
    delegate = BankingProductDelegate()
    request_data = delegate.removeAccounts(parent_id, child_ids)
    as_json = serializers.serialize("json", request_data)
    return HttpResponse(as_json, content_type="application/json")


def addLoanAccounts(request):
    request_data = json.loads(request.body)
    parent_id = request_data["parent_id"]
    child_ids = request_data["child_ids"]
    delegate = BankingProductDelegate()
    request_data = delegate.addLoanAccounts(parent_id, child_ids)
    as_json = serializers.serialize("json", request_data)
    return HttpResponse(as_json, content_type="application/json")


def removeLoanAccounts(request):
    request_data = json.loads(request.body)
    parent_id = request_data["parent_id"]
    child_ids = request_data["child_ids"]
    delegate = BankingProductDelegate()
    request_data = delegate.removeLoanAccounts(parent_id, child_ids)
    as_json = serializers.serialize("json", request_data)
    return HttpResponse(as_json, content_type="application/json")


def addPaymentCards(request):
    request_data = json.loads(request.body)
    parent_id = request_data["parent_id"]
    child_ids = request_data["child_ids"]
    delegate = BankingProductDelegate()
    request_data = delegate.addPaymentCards(parent_id, child_ids)
    as_json = serializers.serialize("json", request_data)
    return HttpResponse(as_json, content_type="application/json")


def removePaymentCards(request):
    request_data = json.loads(request.body)
    parent_id = request_data["parent_id"]
    child_ids = request_data["child_ids"]
    delegate = BankingProductDelegate()
    request_data = delegate.removePaymentCards(parent_id, child_ids)
    as_json = serializers.serialize("json", request_data)
    return HttpResponse(as_json, content_type="application/json")
