class Alert < ApplicationRecord
  enum SEVERITY: [:Info, :Warning, :Critical]
  enum STATUS: [:Open, :Acknowledged, :Resolved, :Suppressed]


  has_many :Metric, class_name: 'Metric'
  has_many :Dashboard, class_name: 'Dashboard'
  has_many :Dataset, class_name: 'DataSet'
  has_many :Rule, class_name: 'QualityRule'
  has_many :Anomalies, class_name: 'Anomaly'
  has_many :Subscribers, class_name: 'Subscriber'

end

