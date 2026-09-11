class Branch < ApplicationRecord


  composed_of :address,
    class_name: "Address",
    mapping: [
      ${$mapping}, 
      ${$mapping}, 
      ${$mapping}, 
      ${$mapping}, 
      %w[address_country country]
    ]

  has_many :Bank, class_name: 'Bank'
  has_many :Accounts, class_name: 'Account'
  has_many :LoanAccounts, class_name: 'LoanAccount'
  has_many :Atms, class_name: 'ATM'

end
