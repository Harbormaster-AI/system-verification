
class AudienceSegment < ApplicationRecord
  enum ProviderType: [:FirstParty, :SecondParty, :ThirdParty]


  has_many :Provider, class_name: 'DataProvider'
  has_many :Campaigns, class_name: 'Campaign'

end
