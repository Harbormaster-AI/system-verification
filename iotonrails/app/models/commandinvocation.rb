
class CommandInvocation < ApplicationRecord
  enum Status: [:Queued, :Sent, :Succeeded, :Failed, :TimedOut, :Cancelled]


  has_many :Device, class_name: 'IoTDevice'
  has_many :CommandDefinition, class_name: 'CommandDefinition'
  has_many :Actuator, class_name: 'ActuatorInstance'
  has_many :User, class_name: 'TenantUser'

end
