class Bank < ApplicationRecord


  composed_of :bIC,
    class_name: "BIC",
    mapping: [
      %w[bIC_value value]
    ]

  has_many :Branches, class_name: 'Branch'
  has_many :Products, class_name: 'BankingProduct'
  has_many :Customers, class_name: 'Customer'
  has_many :Accounts, class_name: 'Account'
  has_many :PaymentCards, class_name: 'PaymentCard'
  has_many :LoanAccounts, class_name: 'LoanAccount'
  has_many :ExchangeRates, class_name: 'ExchangeRate'
  has_many :Consents, class_name: 'Consent'
  has_many :ThirdPartyProviders, class_name: 'ThirdPartyProvider'

end
