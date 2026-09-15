Rails.application.routes.draw do
  root "application#health"

  resources :devicevendors do

    resources :devicemodels
    resources :firmwarereleases
    resources :hardwaremodules
  end
  resources :hardwaremodules do

    resource :vendor
  end
  resources :devicemodels do

    resource :vendor
    resources :hardwaremodules
    resource :twintemplate
    resources :firmwarereleases
    resources :commanddefinitions
  end
  resources :firmwarereleases do

    resource :devicemodel
  end
  resources :iotdevices do

    resource :devicemodel
    resource :tenant
    resource :site
    resource :room
    resource :gateway
    resources :sensors
    resources :actuators
    resources :certificates
    resource :digitaltwin
    resources :telemetrystreams
    resources :commandinvocations
    resources :alerts
    resource :provisioningrecord
    resources :devicegroups
    resources :networkprofiles
  end
  resources :sensorinstances do

    resource :device
    resources :telemetrystreams
  end
  resources :actuatorinstances do

    resource :device
    resources :supportedcommands
  end
  resources :telemetryschemas do

    resources :streams
  end
  resources :telemetrystreams do

    resource :device
    resource :sensor
    resource :schema
    resource :messagingendpoint
    resource :retentionpolicy
  end
  resources :commanddefinitions do

    resource :devicemodel
    resources :actuators
    resources :commandinvocations
  end
  resources :commandinvocations do

    resource :device
    resource :commanddefinition
    resource :actuator
    resource :user
  end
  resources :alertrules do

    resource :tenant
    resources :streams
    resources :alerts
  end
  resources :alerts do

    resource :device
    resource :alertrule
  end
  resources :tenants do

    resources :sites
    resources :users
    resources :devices
    resources :dataretentionpolicies
    resources :connectivityplans
    resources :simcards
    resources :messagingendpoints
    resources :accesspolicies
    resources :devicegroups
    resources :alertrules
    resources :maintenancetickets
    resources :usagerecords
  end
  resources :tenantusers do

    resource :tenant
    resources :commandinvocations
  end
  resources :sites do

    resource :tenant
    resources :buildings
    resources :devices
    resources :gateways
  end
  resources :buildings do

    resource :site
    resources :floors
  end
  resources :floors do

    resource :building
    resources :rooms
  end
  resources :rooms do

    resource :floor
    resources :devices
    resources :gateways
  end
  resources :gateways do

    resource :site
    resource :room
    resources :devices
    resources :edgeapplications
    resources :certificates
    resource :digitaltwin
    resources :networkprofiles
  end
  resources :edgeapplications do

    resource :gateway
  end
  resources :networkprofiles do

    resource :device
    resource :gateway
    resource :simcard
  end
  resources :simcards do

    resources :networkprofiles
    resource :tenant
    resource :connectivityplan
  end
  resources :connectivityplans do

    resources :simcards
    resource :tenant
  end
  resources :messagingendpoints do

    resource :tenant
    resources :streams
  end
  resources :accesspolicys do

    resource :tenant
    resources :apikeys
    resources :users
  end
  resources :apikeys do

    resource :accesspolicy
  end
  resources :devicecertificates do

    resource :device
    resource :gateway
  end
  resources :provisioningrecords do

    resource :device
    resource :certificate
    resource :tenant
  end
  resources :digitaltwins do

    resource :device
    resource :gateway
    resource :template
    resources :changeevents
  end
  resources :twintemplates do

    resources :devicemodels
  end
  resources :twinchangeevents do

    resource :twin
  end
  resources :maintenancetickets do

    resource :device
    resource :tenant
  end
  resources :dataretentionpolicys do

    resource :tenant
    resources :streams
  end
  resources :softwareupdatecampaigns do

    resource :firmwarerelease
    resource :devicegroup
    resources :executions
  end
  resources :softwareupdateexecutions do

    resource :campaign
    resource :device
  end
  resources :devicegroups do

    resource :tenant
    resources :devices
  end
  resources :usagerecords do

    resource :tenant
    resource :device
    resource :connectivityplan
  end
end
