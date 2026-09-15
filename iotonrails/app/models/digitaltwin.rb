
class DigitalTwin < ApplicationRecord


  has_many :Device, class_name: 'IoTDevice'
  has_many :Gateway, class_name: 'Gateway'
  has_many :Template, class_name: 'TwinTemplate'
  has_many :ChangeEvents, class_name: 'TwinChangeEvent'

end
