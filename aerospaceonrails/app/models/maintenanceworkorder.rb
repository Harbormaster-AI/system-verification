class MaintenanceWorkOrder < ApplicationRecord
  enum STATUS: [:Open, :InProgress, :AwaitingParts, :Closed, :Deferred]


  has_many :Aircraft, class_name: 'Aircraft'
  has_many :AirworthinessDirective, class_name: 'AirworthinessDirective'
  has_many :ServiceBulletin, class_name: 'ServiceBulletin'

end

