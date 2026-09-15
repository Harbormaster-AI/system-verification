
class SensorInstance < ApplicationRecord
  enum SensorType: [:Temperature, :Humidity, :Pressure, :Accelerometer, :Gyroscope, :GPS, :Light, :CO2, :VOC, :Current, :Voltage]


  has_many :Device, class_name: 'IoTDevice'
  has_many :TelemetryStreams, class_name: 'TelemetryStream'

end
