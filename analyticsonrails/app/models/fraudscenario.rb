class FraudScenario < ApplicationRecord
  enum DETECTION_TYPE: [:RuleBased, :SupervisedML, :UnsupervisedML, :Hybrid]


  has_many :Models, class_name: 'Model_'
  has_many :Datasets, class_name: 'DataSet'
  has_many :Alerts, class_name: 'Alert'
  has_many :Signals, class_name: 'FraudSignal'

end

