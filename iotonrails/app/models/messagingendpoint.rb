
class MessagingEndpoint < ApplicationRecord
  enum Protocol: [:MQTT, :AMQP, :HTTP, :CoAP, :WebSocket]


  has_many :Tenant, class_name: 'Tenant'
  has_many :Streams, class_name: 'TelemetryStream'

end
