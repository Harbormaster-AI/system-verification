class ThirdPartyProvider < ApplicationRecord


  has_many :Bank, class_name: 'Bank'
  has_many :Consents, class_name: 'Consent'

end
