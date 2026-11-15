class Subscriber < ApplicationRecord
  enum CHANNEL: [:Email, :SMS, :Webhook, :Chat]


  has_many :Alerts, class_name: 'Alert'

end

