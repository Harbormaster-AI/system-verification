
class CreativeFile < ApplicationRecord


  composed_of :uRL,
    class_name: "URL",
    mapping: [
      %w[uRL_href href]
    ]

  has_many :CreativeAsset, class_name: 'CreativeAsset'

end
