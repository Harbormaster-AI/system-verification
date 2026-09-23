
class User < ApplicationRecord
  enum Role: [:Admin, :Trader, :Analyst, :Viewer]


  composed_of :email,
    class_name: "Email",
    mapping: [
      %w[email_value value]
    ]

  has_many :Agency, class_name: 'Agency'
  has_many :Teams, class_name: 'Team'
  has_many :AdAccounts, class_name: 'AdAccount'

end
