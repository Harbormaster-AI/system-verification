
class TelemetrySchema < ApplicationRecord
  enum Encoding: [:JSON, :CBOR, :Protobuf, :Avro, :Binary]


  composed_of :uri,
    class_name: "Uri",
    mapping: [
      %w[uri_value value]
    ]

  has_many :Streams, class_name: 'TelemetryStream'

end
