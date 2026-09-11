class FeeCharge < ApplicationRecord
  enum FeeType: [:Maintenance, :Overdraft, :Wire, :ATM, :CardAnnual, :LatePayment, :EarlyWithdrawal, :ReplacementCard]


  composed_of :money,
    class_name: "Money",
    mapping: [
      ${$mapping}, 
      %w[money_currency currency]
    ]

  has_many :Account, class_name: 'Account'
  has_many :LoanAccount, class_name: 'LoanAccount'

end
