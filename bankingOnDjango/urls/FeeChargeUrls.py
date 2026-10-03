from django.urls import path


from bankingOnDjango.views import FeeChargeView

urlpatterns = [
    path("", FeeChargeView.index, name="index"),
    path("create", FeeChargeView.create, name="create"),
    path("update", FeeChargeView.update, name="update"),
    path("get", FeeChargeView.get, name="get"),
    path("getAll", FeeChargeView.getAll, name="getAll"),
    path("delete", FeeChargeView.delete, name="delete"),
    path("assignAccount", FeeChargeView.assignAccount, name="assignAccount"),
    path("unassignAccount", FeeChargeView.unassignAccount, name="unassignAccount"),
    path(
        "assignLoanAccount", FeeChargeView.assignLoanAccount, name="assignLoanAccount"
    ),
    path(
        "unassignLoanAccount",
        FeeChargeView.unassignLoanAccount,
        name="unassignLoanAccount",
    ),
]
