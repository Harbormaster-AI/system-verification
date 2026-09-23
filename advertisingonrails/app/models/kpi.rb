
class KPI < ApplicationRecord
  enum MetricType: [:Impressions, :ViewableImpressions, :Clicks, :CTR, :Reach, :Frequency, :VideoStarts, :VideoCompletions, :AvgViewTime, :Conversions, :ViewThroughConversions, :Spend, :CPM, :CPC, :CPA]


  has_many :Campaign, class_name: 'Campaign'

end
