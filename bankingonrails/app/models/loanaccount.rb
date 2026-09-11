class LoanAccount < ApplicationRecord
  enum LoanType: [:Mortgage, :Personal, :Auto, :SmallBusiness, :CreditLine, :Student]
  enum RateType: [:Fixed, :Variable]
  enum Compounding: [:Daily, :Monthly, :Quarterly, :Annually]
  enum Status: [:Applied, :Approved, :Active, :Delinquent, :Defaulted, :Closed]


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

  composed_of :percentage,
    class_name: "Percentage",
    mapping: [
      %w[percentage_value value]
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
