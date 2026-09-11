class StandingInstruction < ApplicationRecord
  enum Frequency: [:OneTime, :Weekly, :BiWeekly, :Monthly, :Quarterly, :Annually]
  enum Status: [:Active, :Paused, :Cancelled, :Completed]


  composed_of :money,
    class_name: "Money",
    mapping: [
      ${$mapping}, 
      %w[money_currency currency]
    ]

  has_many :Account, class_name: 'Account'
  has_many :Beneficiary, class_name: 'ExternalAccount'

end
