class Metric < ApplicationRecord
  enum METRIC_TYPE: [:Ratio, :Rate, :Count, :Percentage, :Index, :Score]


  has_many :SemanticModel, class_name: 'SemanticModel'
  has_many :Datasets, class_name: 'DataSet'
  has_many :GlossaryTerms, class_name: 'BusinessGlossaryTerm'
  has_many :Alerts, class_name: 'Alert'
  has_many :Visualizations, class_name: 'Visualization'

end

