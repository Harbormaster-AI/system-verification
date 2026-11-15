# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


5.times do |i|
  AerospaceManufacturer.create( name:"test string for name", 
legal_name:"test string for legalName", 
headquarters_country:"test string for headquartersCountry", 
website:"test string for website"
  )
  AircraftProgram.create( name:"test string for name", 
program_code:"test string for programCode", 
entry_into_service_year:100, 
status:0
  )
  AircraftFamily.create( name:"test string for name", 
family_code:"test string for familyCode"
  )
  AircraftModel.create( name:"test string for name", 
model_designation:"test string for modelDesignation", 
aircraft_type:0
  )
  EngineType.create( engine_model_code:"test string for engineModelCode", 
max_thrust_kn:"test value", 
category:0
  )
  AircraftVariant.create( variant_code:"test string for variantCode", 
range_nm:100, 
max_takeoff_weight_kg:"test value"
  )
  AvionicsSuite.create( suite_name:"test string for suiteName", 
software_baseline:"test string for softwareBaseline"
  )
  APU.create( model_:"test string for model_"
  )
  LandingGear.create( supplier_part_number:"test string for supplierPartNumber", 
gear_type:0
  )
  AircraftOption.create( code:"test string for code", 
name:"test string for name", 
option_category:0
  )
  AircraftPackage.create( name:"test string for name", 
package_type:0
  )
  Supplier.create( name:"test string for name", 
supplier_type:0, 
approval_status:0
  )
  Component_.create( part_number:"test string for partNumber", 
name:"test string for name", 
component_category:0, 
serialization_method:0
  )
  Plant.create( name:"test string for name", 
plant_code:"test string for plantCode", 
address:"test value"
  )
  ProductionLine.create( name:"test string for name", 
line_type:0
  )
  WorkCenter.create( name:"test string for name", 
capability:"test string for capability"
  )
  ProductionOrder.create( order_number:"test string for orderNumber", 
status:0
  )
  BuildSchedule.create( schedule_number:"test string for scheduleNumber", 
status:0
  )
  Warehouse.create( name:"test string for name"
  )
  InventoryItem.create( quantity_on_hand:100, 
quantity_reserved:100, 
lot_number:"test string for lotNumber"
  )
  Operator_.create( name:"test string for name", 
icao_designator:"test string for icaoDesignator", 
operator_type:0
  )
  AircraftOrder.create( order_number:"test string for orderNumber", 
total_amount:"test value", 
status:0
  )
  Quote.create( quote_number:"test string for quoteNumber", 
total_amount:"test value"
  )
  PurchaseAgreement.create( agreement_number:"test string for agreementNumber", 
effective_date:1.week.ago
  )
  Aircraft.create( msn:"test value", 
delivery_date:1.week.ago
  )
  Registration.create( tail_number:"test value", 
registry_country:"test string for registryCountry"
  )
  Warranty.create( coverage_months:100, 
warranty_type:0
  )
  CabinLayout.create( layout_code:"test string for layoutCode", 
total_seats:100, 
class_layout:"test string for classLayout"
  )
  MROFacility.create( name:"test string for name", 
approval_scope:"test string for approvalScope", 
address:"test value"
  )
  MaintenanceAppointment.create( appointment_date:1.week.ago, 
status:0
  )
  MaintenanceWorkOrder.create( work_order_number:"test string for workOrderNumber", 
status:0
  )
  AirworthinessDirective.create( directive_number:"test string for directiveNumber", 
title:"test string for title"
  )
  ServiceBulletin.create( bulletin_number:"test string for bulletinNumber", 
category:0
  )
  ConnectedAircraft.create( communications_provider:"test string for communicationsProvider", 
connectivity_status:0
  )
  FlightHealthEvent.create( event_code:"test string for eventCode", 
severity:0
  )
  SoftwareLoad.create( version:"test string for version", 
load_type:0
  )
  TypeCertificate.create( certificate_number:"test string for certificateNumber", 
authority:"test string for authority"
  )
  ProductionCertificate.create( certificate_number:"test string for certificateNumber", 
authority:"test string for authority"
  )
  SalesRegion.create( name:"test string for name", 
region_code:"test string for regionCode"
  )
  SalesCampaign.create( campaign_code:"test string for campaignCode", 
status:0
  )
end
