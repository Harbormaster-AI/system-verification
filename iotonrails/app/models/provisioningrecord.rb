
class ProvisioningRecord < ApplicationRecord
  enum Method: [:Manual, :JITP, :JITR, :Bulk, :ZeroTouch]
  enum Status: [:Pending, :Enrolled, :Failed, :Revoked]


  has_many :Device, class_name: 'IoTDevice'
  has_many :Certificate, class_name: 'DeviceCertificate'
  has_many :Tenant, class_name: 'Tenant'

end
