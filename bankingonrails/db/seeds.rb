# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

5.times do |_i|
  Bank.create(name: "test string for name",
              legal_name: "test string for legalName",
              swift_bic: "test value",
              headquarters_country: "test string for headquartersCountry",
              website: "test string for website")
  Branch.create(name: "test string for name",
                branch_code: "test string for branchCode",
                address: "test value",
                phone: "test string for phone",
                opening_hours: "test string for openingHours")
  ATM.create(terminal_id: "test string for terminalId",
             location: "test value",
             status: 0)
  Customer.create(first_name: "test string for firstName",
                  last_name: "test string for lastName",
                  legal_name: "test string for legalName",
                  date_of_birth: 1.week.ago,
                  tax_id: "test string for taxId",
                  email: "test string for email",
                  phone: "test string for phone",
                  address: "test value",
                  customer_type: 0,
                  risk_rating: 0,
                  kyc_status: 0)
  KycProfile.create(profile_id: "test string for profileId",
                    last_reviewed_on: 1.week.ago,
                    status: 0)
  IdentityDocument.create(document_number: "test string for documentNumber",
                          issuing_country: "test string for issuingCountry",
                          expiration_date: 1.week.ago,
                          document_type: 0)
  RiskAssessment.create(score: 100,
                        assessed_on: 1.week.ago,
                        rating: 0)
  ScreeningResult.create(screening_date: 1.week.ago,
                         provider: "test string for provider",
                         outcome: 0)
  BankingProduct.create(product_code: "test string for productCode",
                        name: "test string for name",
                        description: "test string for description",
                        product_category: 0)
  Account.create(account_number: "test value",
                 iban: "test value",
                 account_name: "test string for accountName",
                 currency: "test string for currency",
                 opened_on: 1.week.ago,
                 closed_on: 1.week.ago,
                 account_type: 0,
                 ownership_type: 0,
                 status: 0)
  AccountStatement.create(statement_number: "test string for statementNumber",
                          period_start: 1.week.ago,
                          period_end: 1.week.ago,
                          opening_balance: "test value",
                          closing_balance: "test value",
                          delivery_method: 0)
  Transaction.create(booking_date: 1.week.ago,
                     value_date: 1.week.ago,
                     amount: "test value",
                     description: "test string for description",
                     direction: 0,
                     transaction_type: 0,
                     status: 0,
                     channel: 0)
  ExternalAccount.create(name: "test string for name",
                         iban: "test value",
                         account_number: "test value",
                         bic: "test value",
                         bank_name: "test string for bankName",
                         country: "test string for country")
  FundsTransfer.create(transfer_reference: "test string for transferReference",
                       amount: "test value",
                       requested_date: 1.week.ago,
                       execution_date: 1.week.ago,
                       purpose: "test string for purpose",
                       fee_amount: "test value",
                       method: 0,
                       status: 0)
  StandingInstruction.create(instruction_id: "test string for instructionId",
                             amount: "test value",
                             next_execution_date: 1.week.ago,
                             frequency: 0,
                             status: 0)
  PaymentCard.create(card_number: "test value",
                     embossed_name: "test string for embossedName",
                     expiry_month: 100,
                     expiry_year: 100,
                     card_type: 0,
                     card_status: 0,
                     network: 0)
  LoanAccount.create(loan_number: "test string for loanNumber",
                     principal_amount: "test value",
                     outstanding_principal: "test value",
                     interest_rate: "test value",
                     origination_date: 1.week.ago,
                     maturity_date: 1.week.ago,
                     payment_day_of_month: 100,
                     currency: "test string for currency",
                     loan_type: 0,
                     rate_type: 0,
                     compounding: 0,
                     status: 0)
  RepaymentSchedule.create(installment_number: 100,
                           due_date: 1.week.ago,
                           principal_due: "test value",
                           interest_due: "test value",
                           total_due: "test value",
                           status: 0)
  LoanPayment.create(payment_reference: "test string for paymentReference",
                     amount: "test value",
                     payment_date: 1.week.ago,
                     method: 0,
                     status: 0)
  Collateral.create(collateral_identifier: "test string for collateralIdentifier",
                    appraised_value: "test value",
                    description: "test string for description",
                    location: "test value",
                    collateral_type: 0)
  FeeCharge.create(fee_code: "test string for feeCode",
                   amount: "test value",
                   applied_on: 1.week.ago,
                   fee_type: 0)
  ExchangeRate.create(base_currency: "test string for baseCurrency",
                      counter_currency: "test string for counterCurrency",
                      rate: "test value",
                      as_of: 1.week.ago,
                      source: "test string for source")
  FXTrade.create(trade_reference: "test string for tradeReference",
                 trade_date: 1.week.ago,
                 settlement_date: 1.week.ago,
                 amount_sold: "test value",
                 amount_bought: "test value",
                 rate: "test value",
                 status: 0)
  Dispute.create(dispute_reference: "test string for disputeReference",
                 raised_on: 1.week.ago,
                 reason: "test string for reason",
                 status: 0)
  Consent.create(granted_on: 1.week.ago,
                 expires_on: 1.week.ago,
                 consent_type: 0,
                 status: 0)
  ThirdPartyProvider.create(name: "test string for name",
                            registration_id: "test string for registrationId",
                            website: "test string for website")
end
