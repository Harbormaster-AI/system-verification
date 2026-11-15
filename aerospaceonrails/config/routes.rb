Rails.application.routes.draw do
  root "application#health"

  resources :aerospace_manufacturers do

    resources :programs
    resources :plants
    resources :suppliers
    resources :productioncertificates
  end
  resources :aircraft_programs do

    resource :manufacturer
    resources :aircraftfamilies
    resource :typecertificate
    resources :keysuppliers
  end
  resources :aircraft_familys do

    resource :program
    resources :aircraftmodels
  end
  resources :aircraft_models do

    resource :family
    resources :variants
    resources :enginetypes
  end
  resources :engine_types do

    resource :supplier
    resources :compatiblemodels
  end
  resources :aircraft_variants do

    resource :model_
    resource :enginetype
    resource :avionicssuite
    resource :apu
    resource :landinggear
    resources :cabinlayouts
    resources :options
    resources :packages
  end
  resources :avionics_suites do

    resource :supplier
    resources :variants
    resources :softwareloads
  end
  resources :a_p_us do

    resource :supplier
    resources :variants
  end
  resources :landing_gears do

    resource :supplier
    resources :variants
  end
  resources :aircraft_options do

    resources :variants
    resources :packages
  end
  resources :aircraft_packages do

    resources :options
    resources :variants
  end
  resources :suppliers do

    resources :manufacturers
    resources :components
    resources :enginetypes
    resources :avionicssuites
    resources :apus
    resources :landinggears
  end
  resources :component_s do

    resource :supplier
  end
  resources :plants do

    resource :manufacturer
    resources :productionlines
    resources :warehouses
  end
  resources :production_lines do

    resource :plant
    resources :workcenters
  end
  resources :work_centers do

    resource :productionline
  end
  resources :production_orders do

    resource :variant
    resource :plant
    resource :aircraftorder
  end
  resources :build_schedules do

    resources :productionorders
  end
  resources :warehouses do

    resources :inventoryitems
  end
  resources :inventory_items do

    resource :component
    resource :warehouse
  end
  resources :operator_s do

    resources :aircraftorders
    resources :operatedaircraft
    resource :salesregion
  end
  resources :aircraft_orders do

    resource :operator_
    resource :variant
    resource :quote
    resource :purchaseagreement
  end
  resources :quotes do

    resource :aircraftorder
  end
  resources :purchase_agreements do

    resource :aircraftorder
  end
  resources :aircrafts do

    resource :variant
    resource :operator_
    resource :registration
    resource :warranty
    resources :maintenancerecords
    resource :connectedaircraft
    resource :cabinlayout
  end
  resources :registrations do

    resource :aircraft
  end
  resources :warrantys do

    resource :aircraft
  end
  resources :cabin_layouts do

    resource :variant
    resources :aircraft
    resources :options
  end
  resources :m_r_o_facilitys do

    resources :appointments
    resources :workorders
  end
  resources :maintenance_appointments do

    resource :aircraft
    resource :mrofacility
    resource :workorder
  end
  resources :maintenance_work_orders do

    resource :aircraft
    resource :airworthinessdirective
    resource :servicebulletin
  end
  resources :airworthiness_directives do

    resources :workorders
  end
  resources :service_bulletins do

    resources :workorders
    resources :variants
  end
  resources :connected_aircrafts do

    resource :aircraft
    resources :flighthealthevents
    resources :softwareloads
  end
  resources :flight_health_events do

    resource :connectedaircraft
  end
  resources :software_loads do

    resource :connectedaircraft
    resource :avionicssuite
  end
  resources :type_certificates do

    resource :program
  end
  resources :production_certificates do

    resource :manufacturer
  end
  resources :sales_regions do

    resources :operators
    resources :salescampaigns
  end
  resources :sales_campaigns do

    resource :region
    resource :operator_
    resources :quotes
  end
end
