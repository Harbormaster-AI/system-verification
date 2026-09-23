class FundsTransfer < ApplicationRecord
  enum METHOD: %i[InternalTransfer ACH Wire SEPA SWIFT Card Cash Check MobileWallet]
  enum STATUS: %i[Initiated InProcess Settled Failed Reversed Cancelled]

  composed_of :money,
              class_name: "Money",
              mapping: [
                %w[money_amount amount],
                %w[money_currency currency]
              ]

  composed_of :money,
              class_name: "Money",
              mapping: [
                %w[money_amount amount],
                %w[money_currency currency]
              ]

  has_many :SourceAccount, class_name: "Account"
  has_many :DestinationAccount, class_name: "Account"
  has_many :ExternalBeneficiary, class_name: "ExternalAccount"
  has_many :InitiatedBy, class_name: "Customer"
  has_many :Transactions, class_name: "Transaction"
end
