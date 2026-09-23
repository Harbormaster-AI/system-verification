class Account < ApplicationRecord
  enum ACCOUNT_TYPE: %i[Checking Savings MoneyMarket TimeDeposit]
  enum OWNERSHIP_TYPE: %i[Sole Joint Corporate Trust]
  enum STATUS: %i[Open Frozen Dormant Closed]

  composed_of :account_number,
              class_name: "AccountNumber",
              mapping: [
                %w[account_number_value value]
              ]

  composed_of :i_b_a_n,
              class_name: "IBAN",
              mapping: [
                %w[i_b_a_n_value value]
              ]

  has_many :Bank, class_name: "Bank"
  has_many :Branch, class_name: "Branch"
  has_many :Product, class_name: "BankingProduct"
  has_many :Owners, class_name: "Customer"
  has_many :Transactions, class_name: "Transaction"
  has_many :Statements, class_name: "AccountStatement"
  has_many :StandingInstructions, class_name: "StandingInstruction"
  has_many :FeeCharges, class_name: "FeeCharge"
end
