"""mainsite URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
urlpatterns = [
    path('Bank/', include('demo.urls.BankUrls')),
    path('Branch/', include('demo.urls.BranchUrls')),
    path('ATM/', include('demo.urls.ATMUrls')),
    path('Customer/', include('demo.urls.CustomerUrls')),
    path('KycProfile/', include('demo.urls.KycProfileUrls')),
    path('IdentityDocument/', include('demo.urls.IdentityDocumentUrls')),
    path('RiskAssessment/', include('demo.urls.RiskAssessmentUrls')),
    path('ScreeningResult/', include('demo.urls.ScreeningResultUrls')),
    path('BankingProduct/', include('demo.urls.BankingProductUrls')),
    path('Account/', include('demo.urls.AccountUrls')),
    path('AccountStatement/', include('demo.urls.AccountStatementUrls')),
    path('Transaction/', include('demo.urls.TransactionUrls')),
    path('ExternalAccount/', include('demo.urls.ExternalAccountUrls')),
    path('FundsTransfer/', include('demo.urls.FundsTransferUrls')),
    path('StandingInstruction/', include('demo.urls.StandingInstructionUrls')),
    path('PaymentCard/', include('demo.urls.PaymentCardUrls')),
    path('LoanAccount/', include('demo.urls.LoanAccountUrls')),
    path('RepaymentSchedule/', include('demo.urls.RepaymentScheduleUrls')),
    path('LoanPayment/', include('demo.urls.LoanPaymentUrls')),
    path('Collateral/', include('demo.urls.CollateralUrls')),
    path('FeeCharge/', include('demo.urls.FeeChargeUrls')),
    path('ExchangeRate/', include('demo.urls.ExchangeRateUrls')),
    path('FXTrade/', include('demo.urls.FXTradeUrls')),
    path('Dispute/', include('demo.urls.DisputeUrls')),
    path('Consent/', include('demo.urls.ConsentUrls')),
    path('ThirdPartyProvider/', include('demo.urls.ThirdPartyProviderUrls')),
    path('admin/', admin.site.urls),
    path('', admin.site.urls),
]