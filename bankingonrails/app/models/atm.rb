class ATM < ApplicationRecord
  enum Status: [:InService, :OutOfService, :Maintenance]


  composed_of :address,
    class_name: "Address",
    mapping: [
      ${$mapping}, 
      ${$mapping}, 
      ${$mapping}, 
      ${$mapping}, 
      %w[address_country country]
    ]

  has_many :Branch, class_name: 'Branch'

end
