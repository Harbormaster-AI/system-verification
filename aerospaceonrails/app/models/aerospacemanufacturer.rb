class AerospaceManufacturer < ApplicationRecord


  has_many :Programs, class_name: 'AircraftProgram'
  has_many :Plants, class_name: 'Plant'
  has_many :Suppliers, class_name: 'Supplier'
  has_many :ProductionCertificates, class_name: 'ProductionCertificate'

end

