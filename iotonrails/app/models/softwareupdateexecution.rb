
class SoftwareUpdateExecution < ApplicationRecord
  enum Status: [:Downloading, :Installing, :Rebooting, :Success, :Failure, :Deferred]


  has_many :Campaign, class_name: 'SoftwareUpdateCampaign'
  has_many :Device, class_name: 'IoTDevice'

end
