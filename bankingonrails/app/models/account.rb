class Account < ApplicationRecord
  enum AccountType: [:Checking, :Savings, :MoneyMarket, :TimeDeposit]
  enum OwnershipType: [:Sole, :Joint, :Corporate, :Trust]
  enum Status: [:Open, :Frozen, :Dormant, :Closed]


  composed_of :accountNumber,
    class_name: "AccountNumber",
    mapping: [
      %w[accountNumber_value value]
    ]

  composed_of :iBAN,
    class_name: "IBAN",
    mapping: [
      %w[iBAN_value value]
    ]

  has_many :Bank, class_name: 'Bank'
  has_many :Branch, class_name: 'Branch'
  has_many :Product, class_name: 'BankingProduct'
  has_many :Owners, class_name: 'Customer'
  has_many :Transactions, class_name: 'Transaction'
  has_many :Statements, class_name: 'AccountStatement'
  has_many :StandingInstructions, class_name: 'StandingInstruction'
  has_many :FeeCharges, class_name: 'FeeCharge'

end
