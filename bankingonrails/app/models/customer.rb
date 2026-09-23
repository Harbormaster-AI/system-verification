class Customer < ApplicationRecord
  enum _CUSTOMER_TYPE: [:Individual, :Business, :NonProfit, :Government]
  enum _RISK_RATING: [:Low, :Medium, :High]
  enum _KYC_STATUS: [:Pending, :Verified, :Rejected, :Expired]


  composed_of :_address,
    class_name: "Address",
    mapping: [
      %w[_address_street street], 
      %w[_address_city city], 
      %w[_address_state state], 
      %w[_address_postal_code postal_code], 
      %w[_address_country country]
    ]

  has_many :Bank, class_name: 'Bank'
  has_many :Accounts, class_name: 'Account'
  has_many :LoanAccounts, class_name: 'LoanAccount'
  has_many :PaymentCards, class_name: 'PaymentCard'
  has_many :ExternalAccounts, class_name: 'ExternalAccount'
  has_many :FundsTransfers, class_name: 'FundsTransfer'
  has_many :Disputes, class_name: 'Dispute'
  has_many :KycProfiles, class_name: 'KycProfile'
  has_many :Consents, class_name: 'Consent'

end

