
class Campaign < ApplicationRecord
  enum Objective: [:Awareness, :Reach, :Traffic, :Engagement, :Leads, :Sales, :AppInstalls, :VideoViews]
  enum Status: [:Draft, :Active, :Paused, :Completed, :Cancelled]


  composed_of :money,
    class_name: "Money",
    mapping: [
      ${$mapping}, 
      %w[money_currency currency]
    ]

  composed_of :dateRange,
    class_name: "DateRange",
    mapping: [
      ${$mapping}, 
      %w[dateRange_endDate endDate]
    ]

  has_many :AdAccount, class_name: 'AdAccount'
  has_many :LineItems, class_name: 'LineItem'
  has_many :Kpis, class_name: 'KPI'
  has_many :TrackingPixels, class_name: 'TrackingPixel'
  has_many :Audiences, class_name: 'AudienceSegment'
  has_many :Reports, class_name: 'Report'
  has_many :InsertionOrder, class_name: 'InsertionOrder'

end
