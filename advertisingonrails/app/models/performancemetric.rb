
class PerformanceMetric < ApplicationRecord
  enum MetricType: [:Impressions, :ViewableImpressions, :Clicks, :CTR, :Reach, :Frequency, :VideoStarts, :VideoCompletions, :AvgViewTime, :Conversions, :ViewThroughConversions, :Spend, :CPM, :CPC, :CPA]


  has_many :AdAccount, class_name: 'AdAccount'
  has_many :Campaign, class_name: 'Campaign'
  has_many :LineItem, class_name: 'LineItem'
  has_many :Placement, class_name: 'Placement'
  has_many :CreativeAsset, class_name: 'CreativeAsset'

end
