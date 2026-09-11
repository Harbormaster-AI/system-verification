class Collateral < ApplicationRecord
  enum CollateralType: [:RealEstate, :Vehicle, :Cash, :Securities, :Guarantee, :Equipment]


  composed_of :money,
    class_name: "Money",
    mapping: [
      ${$mapping}, 
      %w[money_currency currency]
    ]

  composed_of :address,
    class_name: "Address",
    mapping: [
      ${$mapping}, 
      ${$mapping}, 
      ${$mapping}, 
      ${$mapping}, 
      %w[address_country country]
    ]

  has_many :LoanAccount, class_name: 'LoanAccount'

end
