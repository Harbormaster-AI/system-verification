
class TwinTemplate < ApplicationRecord


  composed_of :uri,
    class_name: "Uri",
    mapping: [
      %w[uri_value value]
    ]

  has_many :DeviceModels, class_name: 'DeviceModel'

end
