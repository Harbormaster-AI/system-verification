
class ATM < ApplicationRecord
  enum _STATUS: [:InService, :OutOfService, :Maintenance]


  composed_of :_address,
    class_name: "Address",
    mapping: [
      ${$mapping}, 
      ${$mapping}, 
      ${$mapping}, 
      ${$mapping}, 
      %w[_address_country country]
    ]

  has_many :Branch, class_name: 'Branch'

end
