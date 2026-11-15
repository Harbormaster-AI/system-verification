class ProductionCertificate < ApplicationRecord


  has_many :Manufacturer, class_name: 'AerospaceManufacturer'

end

