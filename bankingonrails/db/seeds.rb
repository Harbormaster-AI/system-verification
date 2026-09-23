# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


5.times do |i|
  Bank.create( website:"test string for website" )
  Branch.create( opening_hours:"test string for openingHours" )
  ATM.create( status:0 )
  Customer.create( kyc_status:0 )
  KycProfile.create( status:0 )
  IdentityDocument.create( document_type:0 )
  RiskAssessment.create( rating:0 )
  ScreeningResult.create( outcome:0 )
  BankingProduct.create( product_category:0 )
  Account.create( status:0 )
  AccountStatement.create( delivery_method:0 )
  Transaction.create( channel:0 )
  ExternalAccount.create( country:"test string for country" )
  FundsTransfer.create( status:0 )
  StandingInstruction.create( status:0 )
  PaymentCard.create( network:0 )
  LoanAccount.create( status:0 )
  RepaymentSchedule.create( status:0 )
  LoanPayment.create( status:0 )
  Collateral.create( collateral_type:0 )
  FeeCharge.create( fee_type:0 )
  ExchangeRate.create( source:"test string for source" )
  FXTrade.create( status:0 )
  Dispute.create( status:0 )
  Consent.create( status:0 )
  ThirdPartyProvider.create( website:"test string for website" )
end
