class FraudSignal < ApplicationRecord
  enum SIGNAL_TYPE: [:Velocity, :GeolocationMismatch, :AmountOutlier, :DeviceFingerprint, :BehavioralChange]


  has_many :Scenario, class_name: 'FraudScenario'
  has_many :Dataset, class_name: 'DataSet'
  has_many :ModelVersion, class_name: 'ModelVersion'

end

