class Measure < ApplicationRecord
  enum AGGREGATION: [:Sum, :Average, :Min, :Max, :Median, :Count, :DistinctCount]


  has_many :SemanticModel, class_name: 'SemanticModel'
  has_many :Datasets, class_name: 'DataSet'
  has_many :GlossaryTerms, class_name: 'BusinessGlossaryTerm'

end

