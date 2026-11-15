class InferenceEndpoint < ApplicationRecord
  enum MODE: [:Batch, :RealTime]


  composed_of :percentage,
    class_name: "Percentage",
    mapping: [
      %w[percentage_value value]
    ]

  has_many :ModelVersion, class_name: 'ModelVersion'
  has_many :Workspace, class_name: 'AnalyticsWorkspace'
  has_many :Predictions, class_name: 'Prediction'

end

