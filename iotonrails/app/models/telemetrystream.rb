
class TelemetryStream < ApplicationRecord
  enum Qos: [:AtMostOnce, :AtLeastOnce, :ExactlyOnce]


  has_many :Device, class_name: 'IoTDevice'
  has_many :Sensor, class_name: 'SensorInstance'
  has_many :Schema, class_name: 'TelemetrySchema'
  has_many :MessagingEndpoint, class_name: 'MessagingEndpoint'
  has_many :RetentionPolicy, class_name: 'DataRetentionPolicy'

end
