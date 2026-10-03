class FeeCharge < ApplicationRecord
  enum FEE_TYPE: %i[Maintenance Overdraft Wire ATM CardAnnual LatePayment EarlyWithdrawal ReplacementCard]

  composed_of :money,
              class_name: "Money",
              mapping: [
                %w[money_amount amount],
                %w[money_currency currency]
              ]

  has_many :Account, class_name: "Account"
  has_many :LoanAccount, class_name: "LoanAccount"
end
