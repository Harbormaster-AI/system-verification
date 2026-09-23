
class Experiment < ApplicationRecord
  enum Status: [:Planned, :Running, :Paused, :Completed, :Cancelled]


  has_many :Campaign, class_name: 'Campaign'
  has_many :Variants, class_name: 'ExperimentVariant'

end
