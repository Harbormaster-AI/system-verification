class Customer < ApplicationRecord
  enum CustomerType: [:Individual, :Business, :NonProfit, :Government]
  enum RiskRating: [:Low, :Medium, :High]
  enum KycStatus: [:Pending, :Verified, :Rejected, :Expired]


  composed_of :address,
    class_name: "Address",
    mapping: [
      ${$mapping}, 
      ${$mapping}, 
      ${$mapping}, 
      ${$mapping}, 
      %w[address_country country]
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
