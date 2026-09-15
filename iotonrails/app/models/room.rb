
class Room < ApplicationRecord


  has_many :Floor, class_name: 'Floor'
  has_many :Devices, class_name: 'IoTDevice'
  has_many :Gateways, class_name: 'Gateway'

end
