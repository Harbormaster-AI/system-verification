
class IoTDevice < ApplicationRecord
  enum Status: [:Provisioning, :Active, :Suspended, :Offline, :Decommissioned]
  enum PowerSource: [:Battery, :Mains, :PoE, :EnergyHarvesting, :Solar]


  composed_of :deviceId,
    class_name: "DeviceId",
    mapping: [
      %w[deviceId_value value]
    ]

  composed_of :firmwareVersion,
    class_name: "FirmwareVersion",
    mapping: [
      %w[firmwareVersion_value value]
    ]

  has_many :DeviceModel, class_name: 'DeviceModel'
  has_many :Tenant, class_name: 'Tenant'
  has_many :Site, class_name: 'Site'
  has_many :Room, class_name: 'Room'
  has_many :Gateway, class_name: 'Gateway'
  has_many :Sensors, class_name: 'SensorInstance'
  has_many :Actuators, class_name: 'ActuatorInstance'
  has_many :Certificates, class_name: 'DeviceCertificate'
  has_many :DigitalTwin, class_name: 'DigitalTwin'
  has_many :TelemetryStreams, class_name: 'TelemetryStream'
  has_many :CommandInvocations, class_name: 'CommandInvocation'
  has_many :Alerts, class_name: 'Alert'
  has_many :ProvisioningRecord, class_name: 'ProvisioningRecord'
  has_many :DeviceGroups, class_name: 'DeviceGroup'
  has_many :NetworkProfiles, class_name: 'NetworkProfile'

end
