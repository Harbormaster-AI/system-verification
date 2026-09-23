
class FeeCharge < ApplicationRecord
  enum _FEE_TYPE: [:Maintenance, :Overdraft, :Wire, :ATM, :CardAnnual, :LatePayment, :EarlyWithdrawal, :ReplacementCard]


  composed_of :_money,
    class_name: "Money",
    mapping: [
      ${$mapping}, 
      %w[_money_currency currency]
    ]

  has_many :Account, class_name: 'Account'
  has_many :LoanAccount, class_name: 'LoanAccount'

end
