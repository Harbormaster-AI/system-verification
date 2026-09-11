class BankingProduct < ApplicationRecord
  enum ProductCategory: [:Deposit, :Loan, :Card, :PaymentService, :Investment]


  has_many :Bank, class_name: 'Bank'
  has_many :Accounts, class_name: 'Account'
  has_many :LoanAccounts, class_name: 'LoanAccount'
  has_many :PaymentCards, class_name: 'PaymentCard'

end
