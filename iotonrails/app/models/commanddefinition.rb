
class CommandDefinition < ApplicationRecord


  composed_of :uri,
    class_name: "Uri",
    mapping: [
      %w[uri_value value]
    ]

  composed_of :uri,
    class_name: "Uri",
    mapping: [
      %w[uri_value value]
    ]

  has_many :DeviceModel, class_name: 'DeviceModel'
  has_many :Actuators, class_name: 'ActuatorInstance'
  has_many :CommandInvocations, class_name: 'CommandInvocation'

end
