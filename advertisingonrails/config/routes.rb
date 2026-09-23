Rails.application.routes.draw do
  root "application#health"

  resources :agencys do

    resources :advertisers
    resources :teams
    resources :users
    resources :insertionorders
  end
  resources :teams do

    resource :agency
    resources :users
    resources :adaccounts
  end
  resources :users do

    resource :agency
    resources :teams
    resources :adaccounts
  end
  resources :advertisers do

    resource :agency
    resources :adaccounts
    resources :billingprofiles
    resources :campaigns
    resources :trackingpixels
  end
  resources :billingprofiles do

    resource :advertiser
    resources :paymentmethods
    resources :adaccounts
  end
  resources :paymentmethods do

    resource :billingprofile
  end
  resources :adaccounts do

    resource :advertiser
    resources :users
    resources :campaigns
    resource :billingprofile
    resource :dsp
    resources :performancemetrics
  end
  resources :dsps do

    resources :adaccounts
  end
  resources :campaigns do

    resource :adaccount
    resources :lineitems
    resources :kpis
    resources :trackingpixels
    resources :audiences
    resources :reports
    resource :insertionorder
  end
  resources :kpis do

    resource :campaign
  end
  resources :audiencesegments do

    resource :provider
    resources :campaigns
  end
  resources :dataproviders do

    resources :audiencesegments
  end
  resources :lineitems do

    resource :campaign
    resources :placements
    resource :targetingprofile
    resource :deal
    resources :creatives
    resources :performancemetrics
  end
  resources :targetingprofiles do

    resources :audiencesegments
    resources :georegions
    resources :contentcategories
    resource :brandsafetypolicy
    resources :devicecriteria
  end
  resources :devicecriterions do

    resource :targetingprofile
  end
  resources :brandsafetypolicys do

    resources :targetingprofiles
  end
  resources :contentcategorys
  resources :publishers do

    resources :inventorysources
    resources :deals
    resources :creativeapprovals
    resources :insertionorders
    resources :ratecards
  end
  resources :inventorysources do

    resource :publisher
    resources :adslots
    resources :deals
  end
  resources :adslots do

    resource :inventorysource
    resources :placements
    resources :rates
  end
  resources :deals do

    resource :publisher
    resources :inventorysources
    resources :placements
  end
  resources :placements do

    resource :lineitem
    resource :adslot
    resource :deal
  end
  resources :creativeassets do

    resources :files
    resources :approvals
    resources :variations
    resources :lineitems
  end
  resources :creativefiles do

    resource :creativeasset
  end
  resources :creativevariations do

    resource :creativeasset
  end
  resources :creativeapprovals do

    resource :creativeasset
    resource :publisher
  end
  resources :trackingpixels do

    resource :campaign
    resource :advertiser
    resources :conversionevents
  end
  resources :conversionevents do

    resource :campaign
    resource :lineitem
    resource :trackingpixel
  end
  resources :performancemetrics do

    resource :adaccount
    resource :campaign
    resource :lineitem
    resource :placement
    resource :creativeasset
  end
  resources :reports do

    resource :adaccount
    resource :campaign
    resource :lineitem
  end
  resources :insertionorders do

    resource :advertiser
    resource :agency
    resource :publisher
    resources :campaigns
  end
  resources :ratecards do

    resource :publisher
    resources :rates
  end
  resources :rates do

    resource :ratecard
    resource :adslot
  end
  resources :experiments do

    resource :campaign
    resources :variants
  end
  resources :experimentvariants do

    resource :experiment
    resource :creativevariation
    resource :lineitem
  end
  resources :georegions do

    resource :parent
    resources :children
  end
end
