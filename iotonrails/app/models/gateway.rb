
class Gateway < ApplicationRecord
  enum Status: [:Provisioning, :Active, :Suspended, :Offline, :Decommissioned]


  has_many :Site, class_name: 'Site'
  has_many :Room, class_name: 'Room'
  has_many :Devices, class_name: 'IoTDevice'
  has_many :EdgeApplications, class_name: 'EdgeApplication'
  has_many :Certificates, class_name: 'DeviceCertificate'
  has_many :DigitalTwin, class_name: 'DigitalTwin'
  has_many :NetworkProfiles, class_name: 'NetworkProfile'

end
