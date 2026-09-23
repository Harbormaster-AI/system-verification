
class Collateral < ApplicationRecord
  enum _COLLATERAL_TYPE: [:RealEstate, :Vehicle, :Cash, :Securities, :Guarantee, :Equipment]


  composed_of :_money,
    class_name: "Money",
    mapping: [
      ${$mapping}, 
      %w[_money_currency currency]
    ]

  composed_of :_address,
    class_name: "Address",
    mapping: [
      ${$mapping}, 
      ${$mapping}, 
      ${$mapping}, 
      ${$mapping}, 
      %w[_address_country country]
    ]

  has_many :LoanAccount, class_name: 'LoanAccount'

end
