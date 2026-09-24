from django.urls import path


from bankingOnDjango.views import CollateralView

urlpatterns = [
    path("", CollateralView.index, name="index"),
    path("create", CollateralView.create, name="create"),
    path("update", CollateralView.update, name="update"),
    path("get", CollateralView.get, name="get"),
    path("getAll", CollateralView.getAll, name="getAll"),
    path("delete", CollateralView.delete, name="delete"),
    path(
        "assignLoanAccount", CollateralView.assignLoanAccount, name="assignLoanAccount"
    ),
    path(
        "unassignLoanAccount",
        CollateralView.unassignLoanAccount,
        name="unassignLoanAccount",
    ),
]
