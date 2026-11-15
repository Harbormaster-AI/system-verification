class Dimension < ApplicationRecord
  enum DIMENSION_TYPE: [:Categorical, :Temporal, :Geospatial, :Hierarchical]


  has_many :SemanticModel, class_name: 'SemanticModel'
  has_many :Datasets, class_name: 'DataSet'
  has_many :GlossaryTerms, class_name: 'BusinessGlossaryTerm'

end

