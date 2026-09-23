
class BrandSafetyPolicy < ApplicationRecord
  enum Level: [:None, :Moderate, :Strict]
  enum ContentRatingThreshold: [:G, :PG, :PGThirteen, :R, :Mature, :Unrated]


  has_many :TargetingProfiles, class_name: 'TargetingProfile'

end
