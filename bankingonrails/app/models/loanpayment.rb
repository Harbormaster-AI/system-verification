class LoanPayment < ApplicationRecord
  enum Method: [:InternalTransfer, :ACH, :Wire, :SEPA, :SWIFT, :Card, :Cash, :Check, :MobileWallet]
  enum Status: [:Initiated, :InProcess, :Settled, :Failed, :Reversed, :Cancelled]


  composed_of :money,
    class_name: "Money",
    mapping: [
      ${$mapping}, 
      %w[money_currency currency]
    ]

  has_many :LoanAccount, class_name: 'LoanAccount'
  has_many :Transaction, class_name: 'Transaction'

end
