
class DataRetentionPolicy < ApplicationRecord


  has_many :Tenant, class_name: 'Tenant'
  has_many :Streams, class_name: 'TelemetryStream'

end
