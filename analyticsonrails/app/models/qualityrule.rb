class QualityRule < ApplicationRecord
  enum DIMENSION: [:Completeness, :Accuracy, :Consistency, :Timeliness, :Uniqueness, :Validity]
  enum OPERATOR_: [:GreaterThan, :GreaterThanOrEqual, :LessThan, :LessThanOrEqual, :Equal, :NotEqual]


  composed_of :threshold,
    class_name: "Threshold",
    mapping: [
      %w[threshold_limit limit], 
      %w[threshold_inclusive inclusive]
    ]

  has_many :Dataset, class_name: 'DataSet'
  has_many :Checks, class_name: 'QualityCheck'

end

