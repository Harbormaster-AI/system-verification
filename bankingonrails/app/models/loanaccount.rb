
class LoanAccount < ApplicationRecord
  enum _LOAN_TYPE: [:Mortgage, :Personal, :Auto, :SmallBusiness, :CreditLine, :Student]
  enum _RATE_TYPE: [:Fixed, :Variable]
  enum _COMPOUNDING: [:Daily, :Monthly, :Quarterly, :Annually]
  enum _STATUS: [:Applied, :Approved, :Active, :Delinquent, :Defaulted, :Closed]


  composed_of :_money,
    class_name: "Money",
    mapping: [
      ${$mapping}, 
      %w[_money_currency currency]
    ]

  composed_of :_money,
    class_name: "Money",
    mapping: [
      ${$mapping}, 
      %w[_money_currency currency]
    ]

  composed_of :_percentage,
    class_name: "Percentage",
    mapping: [
      %w[_percentage_value value]
    ]

  has_many :Bank, class_name: 'Bank'
  has_many :Branch, class_name: 'Branch'
  has_many :Product, class_name: 'BankingProduct'
  has_many :Borrowers, class_name: 'Customer'
  has_many :RepaymentSchedule, class_name: 'RepaymentSchedule'
  has_many :Payments, class_name: 'LoanPayment'
  has_many :Collateral, class_name: 'Collateral'
  has_many :FeeCharges, class_name: 'FeeCharge'

end
