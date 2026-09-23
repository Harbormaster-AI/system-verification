class Transaction < ApplicationRecord
  enum _DIRECTION: [:Credit, :Debit]
  enum _TRANSACTION_TYPE: [:Deposit, :Withdrawal, :Transfer, :Payment, :Fee, :Interest, :Adjustment, :Chargeback, :Refund, :FXConversion]
  enum _STATUS: [:Pending, :Posted, :Reversed, :Failed, :Cancelled]
  enum _CHANNEL: [:Branch, :Online, :Mobile, :ATM, :API, :CallCenter]


  composed_of :_money,
    class_name: "Money",
    mapping: [
      %w[_money_amount amount], 
      %w[_money_currency currency]
    ]

  has_many :Account, class_name: 'Account'
  has_many :ExternalCounterparty, class_name: 'ExternalAccount'
  has_many :PaymentCard, class_name: 'PaymentCard'
  has_many :FundsTransfer, class_name: 'FundsTransfer'
  has_many :FxTrade, class_name: 'FXTrade'
  has_many :Dispute, class_name: 'Dispute'

end

