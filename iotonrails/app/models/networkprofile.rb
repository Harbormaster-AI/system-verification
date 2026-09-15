
class NetworkProfile < ApplicationRecord
  enum ConnectivityType: [:WiFi, :Ethernet, :LTE, :FiveG, :NBIoT, :LoRaWAN, :Zigbee, :BLE, :Satellite]


  has_many :Device, class_name: 'IoTDevice'
  has_many :Gateway, class_name: 'Gateway'
  has_many :SimCard, class_name: 'SimCard'

end
