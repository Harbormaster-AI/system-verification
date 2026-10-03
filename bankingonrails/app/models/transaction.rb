class Transaction < ApplicationRecord
  enum DIRECTION: %i[Credit Debit]
  enum TRANSACTION_TYPE: %i[Deposit Withdrawal Transfer Payment Fee Interest Adjustment Chargeback
                            Refund FXConversion]
  enum STATUS: %i[Pending Posted Reversed Failed Cancelled]
  enum CHANNEL: %i[Branch Online Mobile ATM API CallCenter]

  composed_of :money,
              class_name: "Money",
              mapping: [
                %w[money_amount amount],
                %w[money_currency currency]
              ]

  has_many :Account, class_name: "Account"
  has_many :ExternalCounterparty, class_name: "ExternalAccount"
  has_many :PaymentCard, class_name: "PaymentCard"
  has_many :FundsTransfer, class_name: "FundsTransfer"
  has_many :FxTrade, class_name: "FXTrade"
  has_many :Dispute, class_name: "Dispute"
end
