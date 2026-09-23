
class LineItem < ApplicationRecord
  enum Status: [:Draft, :Scheduled, :Running, :Paused, :Completed, :Cancelled]
  enum PricingModel: [:CPM, :CPC, :CPA, :CPL, :CPV, :FlatFee]
  enum BidStrategy: [:Manual, :AutoMaximizeClicks, :AutoTargetCPA, :AutoTargetROAS]
  enum Pacing: [:Even, :ASAP, :Smooth]


  composed_of :money,
    class_name: "Money",
    mapping: [
      ${$mapping}, 
      %w[money_currency currency]
    ]

  composed_of :money,
    class_name: "Money",
    mapping: [
      ${$mapping}, 
      %w[money_currency currency]
    ]

  composed_of :frequencyCap,
    class_name: "FrequencyCap",
    mapping: [
      ${$mapping}, 
      ${$mapping}, 
      %w[frequencyCap_period period]
    ]

  has_many :Campaign, class_name: 'Campaign'
  has_many :Placements, class_name: 'Placement'
  has_many :TargetingProfile, class_name: 'TargetingProfile'
  has_many :Deal, class_name: 'Deal'
  has_many :Creatives, class_name: 'CreativeAsset'
  has_many :PerformanceMetrics, class_name: 'PerformanceMetric'

end
