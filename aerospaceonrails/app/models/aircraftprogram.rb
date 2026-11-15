class AircraftProgram < ApplicationRecord
  enum STATUS: [:Concept, :Development, :Certification, :Production, :InService, :Sunset]


  has_many :Manufacturer, class_name: 'AerospaceManufacturer'
  has_many :AircraftFamilies, class_name: 'AircraftFamily'
  has_many :TypeCertificate, class_name: 'TypeCertificate'
  has_many :KeySuppliers, class_name: 'Supplier'

end

