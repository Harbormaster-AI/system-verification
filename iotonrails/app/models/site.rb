
class Site < ApplicationRecord


  composed_of :address,
    class_name: "Address",
    mapping: [
      ${$mapping}, 
      ${$mapping}, 
      ${$mapping}, 
      ${$mapping}, 
      %w[address_country country]
    ]

  has_many :Tenant, class_name: 'Tenant'
  has_many :Buildings, class_name: 'Building'
  has_many :Devices, class_name: 'IoTDevice'
  has_many :Gateways, class_name: 'Gateway'

end
