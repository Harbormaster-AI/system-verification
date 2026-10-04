from django.contrib import admin

# Register your models here.
from .models.Bank import Bank
from .models.Branch import Branch
from .models.ATM import ATM
from .models.Customer import Customer
from .models.KycProfile import KycProfile
from .models.IdentityDocument import IdentityDocument
from .models.RiskAssessment import RiskAssessment
from .models.ScreeningResult import ScreeningResult
from .models.BankingProduct import BankingProduct
from .models.Account import Account
from .models.AccountStatement import AccountStatement
from .models.Transaction import Transaction
from .models.ExternalAccount import ExternalAccount
from .models.FundsTransfer import FundsTransfer
from .models.StandingInstruction import StandingInstruction
from .models.PaymentCard import PaymentCard
from .models.LoanAccount import LoanAccount
from .models.RepaymentSchedule import RepaymentSchedule
from .models.LoanPayment import LoanPayment
from .models.Collateral import Collateral
from .models.FeeCharge import FeeCharge
from .models.ExchangeRate import ExchangeRate
from .models.FXTrade import FXTrade
from .models.Dispute import Dispute
from .models.Consent import Consent
from .models.ThirdPartyProvider import ThirdPartyProvider

# Need to add this for each model that requires managing

admin.site.register(Bank)
admin.site.register(Branch)
admin.site.register(ATM)
admin.site.register(Customer)
admin.site.register(KycProfile)
admin.site.register(IdentityDocument)
admin.site.register(RiskAssessment)
admin.site.register(ScreeningResult)
admin.site.register(BankingProduct)
admin.site.register(Account)
admin.site.register(AccountStatement)
admin.site.register(Transaction)
admin.site.register(ExternalAccount)
admin.site.register(FundsTransfer)
admin.site.register(StandingInstruction)
admin.site.register(PaymentCard)
admin.site.register(LoanAccount)
admin.site.register(RepaymentSchedule)
admin.site.register(LoanPayment)
admin.site.register(Collateral)
admin.site.register(FeeCharge)
admin.site.register(ExchangeRate)
admin.site.register(FXTrade)
admin.site.register(Dispute)
admin.site.register(Consent)
admin.site.register(ThirdPartyProvider)
