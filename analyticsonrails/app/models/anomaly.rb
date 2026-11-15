class Anomaly < ApplicationRecord
  enum ANOMALY_TYPE: [:Spike, :Drop, :Drift, :Seasonal, :LevelShift]
  enum SEVERITY: [:Info, :Warning, :Critical]


  has_many :TimeSeries, class_name: 'TimeSeries'
  has_many :Alert, class_name: 'Alert'
  has_many :Dataset, class_name: 'DataSet'

end

