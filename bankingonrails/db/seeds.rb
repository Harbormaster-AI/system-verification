# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


5.times do |i|
  Bank.create( name:"test string for name", legalName:"test string for legalName", swiftBic:"test value", headquartersCountry:"test string for headquartersCountry", website:"test string for website" )
  Branch.create( name:"test string for name", branchCode:"test string for branchCode", address:"test value", phone:"test string for phone", openingHours:"test string for openingHours" )
  ATM.create( terminalId:"test string for terminalId", location:"test value", Status:0 )
  Customer.create( firstName:"test string for firstName", lastName:"test string for lastName", legalName:"test string for legalName", dateOfBirth:1.week.ago, taxId:"test string for taxId", email:"test string for email", phone:"test string for phone", address:"test value", CustomerType:0, RiskRating:0, KycStatus:0 )
  KycProfile.create( profileId:"test string for profileId", lastReviewedOn:1.week.ago, Status:0 )
  IdentityDocument.create( documentNumber:"test string for documentNumber", issuingCountry:"test string for issuingCountry", expirationDate:1.week.ago, DocumentType:0 )
  RiskAssessment.create( score:100, assessedOn:1.week.ago, Rating:0 )
  ScreeningResult.create( screeningDate:1.week.ago, provider:"test string for provider", Outcome:0 )
  BankingProduct.create( productCode:"test string for productCode", name:"test string for name", description:"test string for description", ProductCategory:0 )
  Account.create( accountNumber:"test value", iban:"test value", accountName:"test string for accountName", currency:"test string for currency", openedOn:1.week.ago, closedOn:1.week.ago, AccountType:0, OwnershipType:0, Status:0 )
  AccountStatement.create( statementNumber:"test string for statementNumber", periodStart:1.week.ago, periodEnd:1.week.ago, openingBalance:"test value", closingBalance:"test value", DeliveryMethod:0 )
  Transaction.create( bookingDate:1.week.ago, valueDate:1.week.ago, amount:"test value", description:"test string for description", Direction:0, TransactionType:0, Status:0, Channel:0 )
  ExternalAccount.create( name:"test string for name", iban:"test value", accountNumber:"test value", bic:"test value", bankName:"test string for bankName", country:"test string for country" )
  FundsTransfer.create( transferReference:"test string for transferReference", amount:"test value", requestedDate:1.week.ago, executionDate:1.week.ago, purpose:"test string for purpose", feeAmount:"test value", Method:0, Status:0 )
  StandingInstruction.create( instructionId:"test string for instructionId", amount:"test value", nextExecutionDate:1.week.ago, Frequency:0, Status:0 )
  PaymentCard.create( cardNumber:"test value", embossedName:"test string for embossedName", expiryMonth:100, expiryYear:100, CardType:0, CardStatus:0, Network:0 )
  LoanAccount.create( loanNumber:"test string for loanNumber", principalAmount:"test value", outstandingPrincipal:"test value", interestRate:"test value", originationDate:1.week.ago, maturityDate:1.week.ago, paymentDayOfMonth:100, currency:"test string for currency", LoanType:0, RateType:0, Compounding:0, Status:0 )
  RepaymentSchedule.create( installmentNumber:100, dueDate:1.week.ago, principalDue:"test value", interestDue:"test value", totalDue:"test value", Status:0 )
  LoanPayment.create( paymentReference:"test string for paymentReference", amount:"test value", paymentDate:1.week.ago, Method:0, Status:0 )
  Collateral.create( appraisedValue:"test value", description:"test string for description", location:"test value", CollateralType:0 )
  FeeCharge.create( feeCode:"test string for feeCode", amount:"test value", appliedOn:1.week.ago, FeeType:0 )
  ExchangeRate.create( baseCurrency:"test string for baseCurrency", counterCurrency:"test string for counterCurrency", rate:"test value", asOf:1.week.ago, source:"test string for source" )
  FXTrade.create( tradeReference:"test string for tradeReference", tradeDate:1.week.ago, settlementDate:1.week.ago, amountSold:"test value", amountBought:"test value", rate:"test value", Status:0 )
  Dispute.create( disputeReference:"test string for disputeReference", raisedOn:1.week.ago, reason:"test string for reason", Status:0 )
  Consent.create( grantedOn:1.week.ago, expiresOn:1.week.ago, ConsentType:0, Status:0 )
  ThirdPartyProvider.create( name:"test string for name", registrationId:"test string for registrationId", website:"test string for website" )
end
