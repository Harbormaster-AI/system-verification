
class TwinChangeEvent < ApplicationRecord
  enum ChangeType: [:DesiredUpdated, :ReportedUpdated, :TagUpdated]


  has_many :Twin, class_name: 'DigitalTwin'

end
