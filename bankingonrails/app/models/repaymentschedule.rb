class RepaymentSchedule < ApplicationRecord
  enum Status: [:Due, :Paid, :Overdue, :Deferred]


  composed_of :money,
    class_name: "Money",
    mapping: [
      ${$mapping}, 
      %w[money_currency currency]
    ]

  composed_of :money,
    class_name: "Money",
    mapping: [
      ${$mapping}, 
      %w[money_currency currency]
    ]

  composed_of :money,
    class_name: "Money",
    mapping: [
      ${$mapping}, 
      %w[money_currency currency]
    ]

  has_many :LoanAccount, class_name: 'LoanAccount'
  has_many :Payment, class_name: 'LoanPayment'

end
