
class ExperimentVariant < ApplicationRecord


  composed_of :percentage,
    class_name: "Percentage",
    mapping: [
      %w[percentage_value value]
    ]

  has_many :Experiment, class_name: 'Experiment'
  has_many :CreativeVariation, class_name: 'CreativeVariation'
  has_many :LineItem, class_name: 'LineItem'

end
