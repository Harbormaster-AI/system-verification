class FundsTransfer < ApplicationRecord
  enum _METHOD: [:InternalTransfer, :ACH, :Wire, :SEPA, :SWIFT, :Card, :Cash, :Check, :MobileWallet]
  enum _STATUS: [:Initiated, :InProcess, :Settled, :Failed, :Reversed, :Cancelled]


  composed_of :_money,
    class_name: "Money",
    mapping: [
      %w[_money_amount amount], 
      %w[_money_currency currency]
    ]

  composed_of :_money,
    class_name: "Money",
    mapping: [
      %w[_money_amount amount], 
      %w[_money_currency currency]
    ]

  has_many :SourceAccount, class_name: 'Account'
  has_many :DestinationAccount, class_name: 'Account'
  has_many :ExternalBeneficiary, class_name: 'ExternalAccount'
  has_many :InitiatedBy, class_name: 'Customer'
  has_many :Transactions, class_name: 'Transaction'

end

