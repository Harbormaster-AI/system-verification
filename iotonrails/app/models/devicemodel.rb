
class DeviceModel < ApplicationRecord
  enum SupportedConnectivity: [:WiFi, :Ethernet, :LTE, :FiveG, :NBIoT, :LoRaWAN, :Zigbee, :BLE, :Satellite]
  enum DefaultTelemetryEncoding: [:JSON, :CBOR, :Protobuf, :Avro, :Binary]


  has_many :Vendor, class_name: 'DeviceVendor'
  has_many :HardwareModules, class_name: 'HardwareModule'
  has_many :TwinTemplate, class_name: 'TwinTemplate'
  has_many :FirmwareReleases, class_name: 'FirmwareRelease'
  has_many :CommandDefinitions, class_name: 'CommandDefinition'

end
