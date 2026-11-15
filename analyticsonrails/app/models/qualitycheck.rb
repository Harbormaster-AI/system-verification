class QualityCheck < ApplicationRecord
  enum STATUS: [:Passed, :Failed, :Warning, :Skipped]


  has_many :Rule, class_name: 'QualityRule'
  has_many :Dataset, class_name: 'DataSet'

end

