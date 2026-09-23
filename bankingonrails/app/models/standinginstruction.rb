
class StandingInstruction < ApplicationRecord
  enum _FREQUENCY: [:OneTime, :Weekly, :BiWeekly, :Monthly, :Quarterly, :Annually]
  enum _STATUS: [:Active, :Paused, :Cancelled, :Completed]


  composed_of :_money,
    class_name: "Money",
    mapping: [
      %w[_money_amount amount], 
      %w[_money_currency currency]
    ]

  has_many :Account, class_name: 'Account'
  has_many :Beneficiary, class_name: 'ExternalAccount'

end
