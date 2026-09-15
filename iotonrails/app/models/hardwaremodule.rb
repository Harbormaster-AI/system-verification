
class HardwareModule < ApplicationRecord
  enum ModuleType: [:RFModule, :MCU, :SensorChipset, :PowerManagement, :Storage, :Other]


  composed_of :uri,
    class_name: "Uri",
    mapping: [
      %w[uri_value value]
    ]

  has_many :Vendor, class_name: 'DeviceVendor'

end
