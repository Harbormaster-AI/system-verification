from django.urls import path


from bankingOnDjango.views import RepaymentScheduleView

urlpatterns = [
    path('', RepaymentScheduleView.index, name='index'),

    path('create', RepaymentScheduleView.create, name='create'),
    path('update', RepaymentScheduleView.update, name='update'),
    path('get', RepaymentScheduleView.get, name='get'),
    path('getAll', RepaymentScheduleView.getAll, name='getAll'),
    path('delete', RepaymentScheduleView.delete, name='delete'),


    path('assignLoanAccount', RepaymentScheduleView.assignLoanAccount, name='assignLoanAccount'),
    path('unassignLoanAccount', RepaymentScheduleView.unassignLoanAccount, name='unassignLoanAccount'),



    path('assignPayment', RepaymentScheduleView.assignPayment, name='assignPayment'),
    path('unassignPayment', RepaymentScheduleView.unassignPayment, name='unassignPayment'),



]