# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


5.times do |i|
  Bank.create(                 website:"test string for website"
 )
  Branch.create(                 openingHours:"test string for openingHours"
 )
  ATM.create(                 Status:0
 )
  Customer.create(                 KycStatus:0
 )
  KycProfile.create(                 Status:0
 )
  IdentityDocument.create(                 DocumentType:0
 )
  RiskAssessment.create(                 Rating:0
 )
  ScreeningResult.create(                 Outcome:0
 )
  BankingProduct.create(                 ProductCategory:0
 )
  Account.create(                 Status:0
 )
  AccountStatement.create(                 DeliveryMethod:0
 )
  Transaction.create(                 Channel:0
 )
  ExternalAccount.create(                 country:"test string for country"
 )
  FundsTransfer.create(                 Status:0
 )
  StandingInstruction.create(                 Status:0
 )
  PaymentCard.create(                 Network:0
 )
  LoanAccount.create(                 Status:0
 )
  RepaymentSchedule.create(                 Status:0
 )
  LoanPayment.create(                 Status:0
 )
  Collateral.create(                 CollateralType:0
 )
  FeeCharge.create(                 FeeType:0
 )
  ExchangeRate.create(                 source:"test string for source"
 )
  FXTrade.create(                 Status:0
 )
  Dispute.create(                 Status:0
 )
  Consent.create(                 Status:0
 )
  ThirdPartyProvider.create(                 website:"test string for website"
 )
end
