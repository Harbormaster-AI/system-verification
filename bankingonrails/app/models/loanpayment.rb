class LoanPayment < ApplicationRecord
  enum METHOD: %i[InternalTransfer ACH Wire SEPA SWIFT Card Cash Check MobileWallet]
  enum STATUS: %i[Initiated InProcess Settled Failed Reversed Cancelled]

  composed_of :money,
              class_name: "Money",
              mapping: [
                %w[money_amount amount],
                %w[money_currency currency]
              ]

  has_many :LoanAccount, class_name: "LoanAccount"
  has_many :Transaction, class_name: "Transaction"
end
