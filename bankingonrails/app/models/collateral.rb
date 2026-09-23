class Collateral < ApplicationRecord
  enum _COLLATERAL_TYPE: [:RealEstate, :Vehicle, :Cash, :Securities, :Guarantee, :Equipment]


  composed_of :_money,
    class_name: "Money",
    mapping: [
      %w[_money_amount amount], 
      %w[_money_currency currency]
    ]

  composed_of :_address,
    class_name: "Address",
    mapping: [
      %w[_address_street street], 
      %w[_address_city city], 
      %w[_address_state state], 
      %w[_address_postal_code postal_code], 
      %w[_address_country country]
    ]

  has_many :LoanAccount, class_name: 'LoanAccount'

end

