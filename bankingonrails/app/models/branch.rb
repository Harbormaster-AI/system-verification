class Branch < ApplicationRecord


  composed_of :_address,
    class_name: "Address",
    mapping: [
      %w[_address_street street], 
      %w[_address_city city], 
      %w[_address_state state], 
      %w[_address_postal_code postal_code], 
      %w[_address_country country]
    ]

  has_many :Bank, class_name: 'Bank'
  has_many :Accounts, class_name: 'Account'
  has_many :LoanAccounts, class_name: 'LoanAccount'
  has_many :Atms, class_name: 'ATM'

end

