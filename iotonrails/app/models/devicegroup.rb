
class DeviceGroup < ApplicationRecord


  has_many :Tenant, class_name: 'Tenant'
  has_many :Devices, class_name: 'IoTDevice'

end
