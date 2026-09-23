
class Advertiser < ApplicationRecord


  has_many :Agency, class_name: 'Agency'
  has_many :AdAccounts, class_name: 'AdAccount'
  has_many :BillingProfiles, class_name: 'BillingProfile'
  has_many :Campaigns, class_name: 'Campaign'
  has_many :TrackingPixels, class_name: 'TrackingPixel'

end
