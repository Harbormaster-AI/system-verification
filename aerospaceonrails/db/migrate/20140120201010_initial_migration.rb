class InitialMigration < ActiveRecord::Migration[6.1]
  def change
    create_table :aerospaceManufacturers do |t|
      t.string :name      
      t.string :legalName      
      t.string :headquartersCountry      
      t.string :website      
      t.timestamps
    end
    create_table :aircraftPrograms do |t|
      t.string :name      
      t.string :programCode      
      t.integer :entryIntoServiceYear      
      t.integer :Status      
      t.timestamps
    end
    create_table :aircraftFamilys do |t|
      t.string :name      
      t.string :familyCode      
      t.timestamps
    end
    create_table :aircraftModels do |t|
      t.string :name      
      t.string :modelDesignation      
      t.integer :AircraftType      
      t.timestamps
    end
    create_table :engineTypes do |t|
      t.string :engineModelCode      
      t.decimal :maxThrustKn      
      t.integer :Category      
      t.timestamps
    end
    create_table :aircraftVariants do |t|
      t.string :variantCode      
      t.integer :rangeNm      
      t.decimal :maxTakeoffWeightKg      
      t.timestamps
    end
    create_table :avionicsSuites do |t|
      t.string :suiteName      
      t.string :softwareBaseline      
      t.timestamps
    end
    create_table :aPUs do |t|
      t.string :model_      
      t.timestamps
    end
    create_table :landingGears do |t|
      t.string :supplierPartNumber      
      t.integer :GearType      
      t.timestamps
    end
    create_table :aircraftOptions do |t|
      t.string :code      
      t.string :name      
      t.integer :OptionCategory      
      t.timestamps
    end
    create_table :aircraftPackages do |t|
      t.string :name      
      t.integer :PackageType      
      t.timestamps
    end
    create_table :suppliers do |t|
      t.string :name      
      t.integer :SupplierType      
      t.integer :ApprovalStatus      
      t.timestamps
    end
    create_table :component_s do |t|
      t.string :partNumber      
      t.string :name      
      t.integer :ComponentCategory      
      t.integer :SerializationMethod      
      t.timestamps
    end
    create_table :plants do |t|
      t.string :name      
      t.string :plantCode      
      t.string :address      
      t.timestamps
    end
    create_table :productionLines do |t|
      t.string :name      
      t.integer :LineType      
      t.timestamps
    end
    create_table :workCenters do |t|
      t.string :name      
      t.string :capability      
      t.timestamps
    end
    create_table :productionOrders do |t|
      t.string :orderNumber      
      t.integer :Status      
      t.timestamps
    end
    create_table :buildSchedules do |t|
      t.string :scheduleNumber      
      t.integer :Status      
      t.timestamps
    end
    create_table :warehouses do |t|
      t.string :name      
      t.timestamps
    end
    create_table :inventoryItems do |t|
      t.integer :quantityOnHand      
      t.integer :quantityReserved      
      t.string :lotNumber      
      t.timestamps
    end
    create_table :operator_s do |t|
      t.string :name      
      t.string :icaoDesignator      
      t.integer :OperatorType      
      t.timestamps
    end
    create_table :aircraftOrders do |t|
      t.string :orderNumber      
      t.string :totalAmount      
      t.integer :Status      
      t.timestamps
    end
    create_table :quotes do |t|
      t.string :quoteNumber      
      t.string :totalAmount      
      t.timestamps
    end
    create_table :purchaseAgreements do |t|
      t.string :agreementNumber      
      t.date :effectiveDate      
      t.timestamps
    end
    create_table :aircrafts do |t|
      t.string :msn      
      t.date :deliveryDate      
      t.timestamps
    end
    create_table :registrations do |t|
      t.string :tailNumber      
      t.string :registryCountry      
      t.timestamps
    end
    create_table :warrantys do |t|
      t.integer :coverageMonths      
      t.integer :WarrantyType      
      t.timestamps
    end
    create_table :cabinLayouts do |t|
      t.string :layoutCode      
      t.integer :totalSeats      
      t.string :classLayout      
      t.timestamps
    end
    create_table :mROFacilitys do |t|
      t.string :name      
      t.string :approvalScope      
      t.string :address      
      t.timestamps
    end
    create_table :maintenanceAppointments do |t|
      t.date :appointmentDate      
      t.integer :Status      
      t.timestamps
    end
    create_table :maintenanceWorkOrders do |t|
      t.string :workOrderNumber      
      t.integer :Status      
      t.timestamps
    end
    create_table :airworthinessDirectives do |t|
      t.string :directiveNumber      
      t.string :title      
      t.timestamps
    end
    create_table :serviceBulletins do |t|
      t.string :bulletinNumber      
      t.integer :Category      
      t.timestamps
    end
    create_table :connectedAircrafts do |t|
      t.string :communicationsProvider      
      t.integer :ConnectivityStatus      
      t.timestamps
    end
    create_table :flightHealthEvents do |t|
      t.string :eventCode      
      t.integer :Severity      
      t.timestamps
    end
    create_table :softwareLoads do |t|
      t.string :version      
      t.integer :LoadType      
      t.timestamps
    end
    create_table :typeCertificates do |t|
      t.string :certificateNumber      
      t.string :authority      
      t.timestamps
    end
    create_table :productionCertificates do |t|
      t.string :certificateNumber      
      t.string :authority      
      t.timestamps
    end
    create_table :salesRegions do |t|
      t.string :name      
      t.string :regionCode      
      t.timestamps
    end
    create_table :salesCampaigns do |t|
      t.string :campaignCode      
      t.integer :Status      
      t.timestamps
    end
  end
end
