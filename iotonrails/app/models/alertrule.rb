
class AlertRule < ApplicationRecord
  enum Severity: [:Info, :Warning, :Critical]


  has_many :Tenant, class_name: 'Tenant'
  has_many :Streams, class_name: 'TelemetryStream'
  has_many :Alerts, class_name: 'Alert'

end
