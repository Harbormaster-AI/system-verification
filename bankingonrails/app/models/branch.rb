class Branch < ApplicationRecord
  composed_of :address,
              class_name: "Address",
              mapping: [
                %w[address_street street],
                %w[address_city city],
                %w[address_state state],
                %w[address_postal_code postal_code],
                %w[address_country country]
              ]

  has_many :Bank, class_name: "Bank"
  has_many :Accounts, class_name: "Account"
  has_many :LoanAccounts, class_name: "LoanAccount"
  has_many :Atms, class_name: "ATM"
end
