class BusinessGlossaryTerm < ApplicationRecord


  has_many :RelatedTerms, class_name: 'BusinessGlossaryTerm'
  has_many :Metrics, class_name: 'Metric'
  has_many :Datasets, class_name: 'DataSet'
  has_many :Dimensions, class_name: 'Dimension'
  has_many :Measures, class_name: 'Measure'

end

