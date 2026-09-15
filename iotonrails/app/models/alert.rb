
class Alert < ApplicationRecord
  enum Status: [:Open, :Acknowledged, :Resolved, :Suppressed]


  has_many :Device, class_name: 'IoTDevice'
  has_many :AlertRule, class_name: 'AlertRule'

end
