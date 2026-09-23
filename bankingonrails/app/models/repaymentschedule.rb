class RepaymentSchedule < ApplicationRecord
  enum _STATUS: [:Due, :Paid, :Overdue, :Deferred]


  composed_of :_money,
    class_name: "Money",
    mapping: [
      %w[_money_amount amount], 
      %w[_money_currency currency]
    ]

  composed_of :_money,
    class_name: "Money",
    mapping: [
      %w[_money_amount amount], 
      %w[_money_currency currency]
    ]

  composed_of :_money,
    class_name: "Money",
    mapping: [
      %w[_money_amount amount], 
      %w[_money_currency currency]
    ]

  has_many :LoanAccount, class_name: 'LoanAccount'
  has_many :Payment, class_name: 'LoanPayment'

end

