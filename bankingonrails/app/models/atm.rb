
class ATM < ApplicationRecord
  enum _STATUS: [:InService, :OutOfService, :Maintenance]


  composed_of :_address,
    class_name: "Address",
    mapping: [
      %w[_address_street street], 
      %w[_address_city city], 
      %w[_address_state state], 
      %w[_address_postal_code postal_code], 
      %w[_address_country country]
    ]

  has_many :Branch, class_name: 'Branch'

end
