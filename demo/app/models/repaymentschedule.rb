class RepaymentSchedule < ApplicationRecord
  enum STATUS: [:Due, :Paid, :Overdue, :Deferred]


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

  composed_of :money,
    class_name: "Money",
    mapping: [
      %w[money_amount amount], 
      %w[money_currency currency]
    ]

  has_many :LoanAccount, class_name: 'LoanAccount'
  has_many :Payment, class_name: 'LoanPayment'

end

