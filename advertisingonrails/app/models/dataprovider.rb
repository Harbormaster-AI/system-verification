
class DataProvider < ApplicationRecord
  enum ProviderType: [:FirstParty, :SecondParty, :ThirdParty]


  has_many :AudienceSegments, class_name: 'AudienceSegment'

end
