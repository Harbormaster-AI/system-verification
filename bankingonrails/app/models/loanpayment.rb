class LoanPayment < ApplicationRecord
  enum _METHOD: [:InternalTransfer, :ACH, :Wire, :SEPA, :SWIFT, :Card, :Cash, :Check, :MobileWallet]
  enum _STATUS: [:Initiated, :InProcess, :Settled, :Failed, :Reversed, :Cancelled]


  composed_of :_money,
    class_name: "Money",
    mapping: [
      %w[_money_amount amount], 
      %w[_money_currency currency]
    ]

  has_many :LoanAccount, class_name: 'LoanAccount'
  has_many :Transaction, class_name: 'Transaction'

end

