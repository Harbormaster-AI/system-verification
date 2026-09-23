class InitialMigration < ActiveRecord::Migration[6.1]
  def change
    create_table :agencys do |t|
      t.string :name      
      t.string :legalName      
      t.string :headquartersCountry      
      t.string :website      
      t.timestamps
    end
    create_table :teams do |t|
      t.string :name      
      t.timestamps
    end
    create_table :users do |t|
      t.string :firstName      
      t.string :lastName      
      t.string :email      
      t.integer :Role      
      t.timestamps
    end
    create_table :advertisers do |t|
      t.string :name      
      t.string :legalName      
      t.string :industry      
      t.string :website      
      t.timestamps
    end
    create_table :billingProfiles do |t|
      t.string :billingName      
      t.string :taxId      
      t.string :billingAddress      
      t.integer :PaymentTerms      
      t.timestamps
    end
    create_table :paymentMethods do |t|
      t.string :last4      
      t.string :cardholderName      
      t.string :billingAddress      
      t.integer :MethodType      
      t.timestamps
    end
    create_table :adAccounts do |t|
      t.string :name      
      t.string :accountCode      
      t.string :defaultCurrency      
      t.string :defaultTimezone      
      t.timestamps
    end
    create_table :dSPs do |t|
      t.string :name      
      t.string :website      
      t.string :region      
      t.timestamps
    end
    create_table :campaigns do |t|
      t.string :name      
      t.string :totalBudget      
      t.string :flight      
      t.integer :Objective      
      t.integer :Status      
      t.timestamps
    end
    create_table :kPIs do |t|
      t.decimal :targetValue      
      t.integer :MetricType      
      t.timestamps
    end
    create_table :audienceSegments do |t|
      t.string :name      
      t.integer :estimatedReach      
      t.string :description      
      t.integer :ProviderType      
      t.timestamps
    end
    create_table :dataProviders do |t|
      t.string :name      
      t.string :website      
      t.integer :ProviderType      
      t.timestamps
    end
    create_table :lineItems do |t|
      t.string :name      
      t.string :bidAmount      
      t.string :dailyBudget      
      t.string :frequencyCap      
      t.integer :Status      
      t.integer :PricingModel      
      t.integer :BidStrategy      
      t.integer :Pacing      
      t.timestamps
    end
    create_table :targetingProfiles do |t|
      t.string :name      
      t.timestamps
    end
    create_table :deviceCriterions do |t|
      t.integer :DeviceType      
      t.integer :PlatformType      
      t.integer :Operator_      
      t.timestamps
    end
    create_table :brandSafetyPolicys do |t|
      t.integer :Level      
      t.integer :ContentRatingThreshold      
      t.timestamps
    end
    create_table :contentCategorys do |t|
      t.string :code      
      t.string :name      
      t.timestamps
    end
    create_table :publishers do |t|
      t.string :name      
      t.string :website      
      t.integer :PublisherType      
      t.timestamps
    end
    create_table :inventorySources do |t|
      t.string :name      
      t.string :domain      
      t.integer :Channel      
      t.integer :PrimaryFormat      
      t.timestamps
    end
    create_table :adSlots do |t|
      t.string :slotCode      
      t.integer :width      
      t.integer :height      
      t.string :floorPrice      
      t.integer :Format      
      t.timestamps
    end
    create_table :deals do |t|
      t.string :floorPrice      
      t.integer :DealType      
      t.timestamps
    end
    create_table :placements do |t|
      t.string :name      
      t.string :flight      
      t.integer :goalImpressions      
      t.timestamps
    end
    create_table :creativeAssets do |t|
      t.string :name      
      t.string :clickUrl      
      t.string :landingPage      
      t.integer :width      
      t.integer :height      
      t.integer :durationSeconds      
      t.integer :CreativeType      
      t.integer :AdFormat      
      t.timestamps
    end
    create_table :creativeFiles do |t|
      t.string :uri      
      t.integer :fileSizeKB      
      t.string :mimeType      
      t.string :checksum      
      t.timestamps
    end
    create_table :creativeVariations do |t|
      t.string :name      
      t.string :language      
      t.string :headline      
      t.string :bodyText      
      t.string :callToAction      
      t.timestamps
    end
    create_table :creativeApprovals do |t|
      t.string :reviewer      
      t.date :reviewedAt      
      t.integer :Status      
      t.timestamps
    end
    create_table :trackingPixels do |t|
      t.string :name      
      t.string :url      
      t.integer :EventType      
      t.integer :PixelType      
      t.timestamps
    end
    create_table :conversionEvents do |t|
      t.datetime :timestamp      
      t.string :value      
      t.integer :EventType      
      t.integer :AttributionModel      
      t.timestamps
    end
    create_table :performanceMetrics do |t|
      t.date :date      
      t.decimal :value      
      t.integer :MetricType      
      t.timestamps
    end
    create_table :reports do |t|
      t.string :reportName      
      t.datetime :generatedAt      
      t.string :fileUrl      
      t.integer :ReportType      
      t.timestamps
    end
    create_table :insertionOrders do |t|
      t.string :ioNumber      
      t.string :agreedBudget      
      t.string :flight      
      t.integer :Status      
      t.timestamps
    end
    create_table :rateCards do |t|
      t.string :name      
      t.date :effectiveDate      
      t.string :currency      
      t.timestamps
    end
    create_table :rates do |t|
      t.string :unitPrice      
      t.integer :AdFormat      
      t.integer :PricingModel      
      t.timestamps
    end
    create_table :experiments do |t|
      t.string :name      
      t.string :hypothesis      
      t.date :startDate      
      t.date :endDate      
      t.integer :Status      
      t.timestamps
    end
    create_table :experimentVariants do |t|
      t.string :name      
      t.string :allocation      
      t.timestamps
    end
    create_table :geoRegions do |t|
      t.string :code      
      t.string :name      
      t.integer :RegionType      
      t.timestamps
    end
  end
end
