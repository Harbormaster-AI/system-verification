from django.urls import path


from bankingOnDjango.views import BranchView

urlpatterns = [
    path("", BranchView.index, name="index"),
    path("create", BranchView.create, name="create"),
    path("update", BranchView.update, name="update"),
    path("get", BranchView.get, name="get"),
    path("getAll", BranchView.getAll, name="getAll"),
    path("delete", BranchView.delete, name="delete"),
    path("assignBank", BranchView.assignBank, name="assignBank"),
    path("unassignBank", BranchView.unassignBank, name="unassignBank"),
    path("addToAccounts", BranchView.addAccounts, name="addAccounts"),
    path("removeFromAccounts", BranchView.removeAccounts, name="removeAccounts"),
    path("addToLoanAccounts", BranchView.addLoanAccounts, name="addLoanAccounts"),
    path(
        "removeFromLoanAccounts",
        BranchView.removeLoanAccounts,
        name="removeLoanAccounts",
    ),
    path("addToAtms", BranchView.addAtms, name="addAtms"),
    path("removeFromAtms", BranchView.removeAtms, name="removeAtms"),
]
