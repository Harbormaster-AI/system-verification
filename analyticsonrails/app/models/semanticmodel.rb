class SemanticModel < ApplicationRecord


  has_many :Datasets, class_name: 'DataSet'
  has_many :Metrics, class_name: 'Metric'
  has_many :Dimensions, class_name: 'Dimension'
  has_many :Measures, class_name: 'Measure'
  has_many :GlossaryTerms, class_name: 'BusinessGlossaryTerm'

end

