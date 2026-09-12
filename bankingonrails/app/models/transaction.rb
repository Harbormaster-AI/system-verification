class Transaction < ApplicationRecord
  enum Direction: [:Credit, :Debit]
  enum TransactionType: [:Deposit, :Withdrawal, :Transfer, :Payment, :Fee, :Interest, :Adjustment, :Chargeback, :Refund, :FXConversion]
  enum Status: [:Pending, :Posted, :Reversed, :Failed, :Cancelled]
  enum Channel: [:Branch, :Online, :Mobile, :ATM, :API, :CallCenter]


  composed_of :money,
    class_name: "Money",
    mapping: [
      ${$mapping}, 
      %w[money_currency currency]
    ]

  has_many :Account, class_name: 'Account'
  has_many :ExternalCounterparty, class_name: 'ExternalAccount'
  has_many :PaymentCard, class_name: 'PaymentCard'
  has_many :FundsTransfer, class_name: 'FundsTransfer'
  has_many :FxTrade, class_name: 'FXTrade'
  has_many :Dispute, class_name: 'Dispute'

end
