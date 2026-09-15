
class FirmwareRelease < ApplicationRecord


  composed_of :firmwareVersion,
    class_name: "FirmwareVersion",
    mapping: [
      %w[firmwareVersion_value value]
    ]

  composed_of :checksum,
    class_name: "Checksum",
    mapping: [
      ${$mapping}, 
      %w[checksum_value value]
    ]

  has_many :DeviceModel, class_name: 'DeviceModel'

end
