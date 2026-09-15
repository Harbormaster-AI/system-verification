
class DeviceVendor < ApplicationRecord


  has_many :DeviceModels, class_name: 'DeviceModel'
  has_many :FirmwareReleases, class_name: 'FirmwareRelease'
  has_many :HardwareModules, class_name: 'HardwareModule'

end
