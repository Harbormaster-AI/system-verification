class Collateral < ApplicationRecord
  enum COLLATERAL_TYPE: %i[RealEstate Vehicle Cash Securities Guarantee Equipment]

  composed_of :money,
              class_name: "Money",
              mapping: [
                %w[money_amount amount],
                %w[money_currency currency]
              ]

  composed_of :address,
              class_name: "Address",
              mapping: [
                %w[address_street street],
                %w[address_city city],
                %w[address_state state],
                %w[address_postal_code postal_code],
                %w[address_country country]
              ]

  has_many :LoanAccount, class_name: "LoanAccount"
end
