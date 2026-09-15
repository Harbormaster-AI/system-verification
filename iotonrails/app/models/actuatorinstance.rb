
class ActuatorInstance < ApplicationRecord
  enum ActuatorType: [:Relay, :Motor, :Valve, :LED, :Buzzer, :Display]


  composed_of :topicName,
    class_name: "TopicName",
    mapping: [
      %w[topicName_value value]
    ]

  has_many :Device, class_name: 'IoTDevice'
  has_many :SupportedCommands, class_name: 'CommandDefinition'

end
