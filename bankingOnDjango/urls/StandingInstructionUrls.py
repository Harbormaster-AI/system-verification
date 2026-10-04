from django.urls import path


from bankingOnDjango.views import StandingInstructionView

urlpatterns = [
    path("", StandingInstructionView.index, name="index"),
    path("create", StandingInstructionView.create, name="create"),
    path("update", StandingInstructionView.update, name="update"),
    path("get", StandingInstructionView.get, name="get"),
    path("getAll", StandingInstructionView.getAll, name="getAll"),
    path("delete", StandingInstructionView.delete, name="delete"),
    path("assignAccount", StandingInstructionView.assignAccount, name="assignAccount"),
    path(
        "unassignAccount",
        StandingInstructionView.unassignAccount,
        name="unassignAccount",
    ),
    path(
        "assignBeneficiary",
        StandingInstructionView.assignBeneficiary,
        name="assignBeneficiary",
    ),
    path(
        "unassignBeneficiary",
        StandingInstructionView.unassignBeneficiary,
        name="unassignBeneficiary",
    ),
]
