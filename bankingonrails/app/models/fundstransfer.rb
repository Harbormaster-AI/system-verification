class FundsTransfer < ApplicationRecord
  enum Method: [:InternalTransfer, :ACH, :Wire, :SEPA, :SWIFT, :Card, :Cash, :Check, :MobileWallet]
  enum Status: [:Initiated, :InProcess, :Settled, :Failed, :Reversed, :Cancelled]


  composed_of :money,
    class_name: "Money",
    mapping: [
      ${$mapping}, 
      %w[money_currency currency]
    ]

  composed_of :money,
    class_name: "Money",
    mapping: [
      ${$mapping}, 
      %w[money_currency currency]
    ]

  has_many :SourceAccount, class_name: 'Account'
  has_many :DestinationAccount, class_name: 'Account'
  has_many :ExternalBeneficiary, class_name: 'ExternalAccount'
  has_many :InitiatedBy, class_name: 'Customer'
  has_many :Transactions, class_name: 'Transaction'

end
