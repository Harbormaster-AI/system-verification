class Supplier < ApplicationRecord
  enum SUPPLIER_TYPE: [:Airframe, :Engine, :Avionics, :Systems, :Materials, :MRO, :Testing]
  enum APPROVAL_STATUS: [:Applied, :Approved, :OnHold, :Suspended]


  has_many :Manufacturers, class_name: 'AerospaceManufacturer'
  has_many :Components, class_name: 'Component_'
  has_many :EngineTypes, class_name: 'EngineType'
  has_many :AvionicsSuites, class_name: 'AvionicsSuite'
  has_many :Apus, class_name: 'APU'
  has_many :LandingGears, class_name: 'LandingGear'

end

