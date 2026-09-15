
class SoftwareUpdateCampaign < ApplicationRecord
  enum Status: [:Planned, :InProgress, :Paused, :Completed, :Cancelled]


  has_many :FirmwareRelease, class_name: 'FirmwareRelease'
  has_many :DeviceGroup, class_name: 'DeviceGroup'
  has_many :Executions, class_name: 'SoftwareUpdateExecution'

end
