
class TargetingProfile < ApplicationRecord


  has_many :AudienceSegments, class_name: 'AudienceSegment'
  has_many :GeoRegions, class_name: 'GeoRegion'
  has_many :ContentCategories, class_name: 'ContentCategory'
  has_many :BrandSafetyPolicy, class_name: 'BrandSafetyPolicy'
  has_many :DeviceCriteria, class_name: 'DeviceCriterion'

end
