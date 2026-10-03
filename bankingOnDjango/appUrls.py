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
    path("Bank/", include("bankingOnDjango.urls.BankUrls")),
    path("Branch/", include("bankingOnDjango.urls.BranchUrls")),
    path("ATM/", include("bankingOnDjango.urls.ATMUrls")),
    path("Customer/", include("bankingOnDjango.urls.CustomerUrls")),
    path("KycProfile/", include("bankingOnDjango.urls.KycProfileUrls")),
    path("IdentityDocument/", include("bankingOnDjango.urls.IdentityDocumentUrls")),
    path("RiskAssessment/", include("bankingOnDjango.urls.RiskAssessmentUrls")),
    path("ScreeningResult/", include("bankingOnDjango.urls.ScreeningResultUrls")),
    path("BankingProduct/", include("bankingOnDjango.urls.BankingProductUrls")),
    path("Account/", include("bankingOnDjango.urls.AccountUrls")),
    path("AccountStatement/", include("bankingOnDjango.urls.AccountStatementUrls")),
    path("Transaction/", include("bankingOnDjango.urls.TransactionUrls")),
    path("ExternalAccount/", include("bankingOnDjango.urls.ExternalAccountUrls")),
    path("FundsTransfer/", include("bankingOnDjango.urls.FundsTransferUrls")),
    path(
        "StandingInstruction/", include("bankingOnDjango.urls.StandingInstructionUrls")
    ),
    path("PaymentCard/", include("bankingOnDjango.urls.PaymentCardUrls")),
    path("LoanAccount/", include("bankingOnDjango.urls.LoanAccountUrls")),
    path("RepaymentSchedule/", include("bankingOnDjango.urls.RepaymentScheduleUrls")),
    path("LoanPayment/", include("bankingOnDjango.urls.LoanPaymentUrls")),
    path("Collateral/", include("bankingOnDjango.urls.CollateralUrls")),
    path("FeeCharge/", include("bankingOnDjango.urls.FeeChargeUrls")),
    path("ExchangeRate/", include("bankingOnDjango.urls.ExchangeRateUrls")),
    path("FXTrade/", include("bankingOnDjango.urls.FXTradeUrls")),
    path("Dispute/", include("bankingOnDjango.urls.DisputeUrls")),
    path("Consent/", include("bankingOnDjango.urls.ConsentUrls")),
    path("ThirdPartyProvider/", include("bankingOnDjango.urls.ThirdPartyProviderUrls")),
    path("admin/", admin.site.urls),
    path("", admin.site.urls),
]
