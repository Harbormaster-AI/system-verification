
class DeviceCriterion < ApplicationRecord
  enum DeviceType: [:Desktop, :Mobile, :Tablet, :ConnectedTV]
  enum PlatformType: [:Web, :MobileApp, :CTV]
  enum Operator_: [:Include, :Exclude]


  has_many :TargetingProfile, class_name: 'TargetingProfile'

end
