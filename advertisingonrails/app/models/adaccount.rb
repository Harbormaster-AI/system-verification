
class AdAccount < ApplicationRecord


  has_many :Advertiser, class_name: 'Advertiser'
  has_many :Users, class_name: 'User'
  has_many :Campaigns, class_name: 'Campaign'
  has_many :BillingProfile, class_name: 'BillingProfile'
  has_many :Dsp, class_name: 'DSP'
  has_many :PerformanceMetrics, class_name: 'PerformanceMetric'

end
