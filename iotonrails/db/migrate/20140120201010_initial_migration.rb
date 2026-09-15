class InitialMigration < ActiveRecord::Migration[6.1]
  def change
    create_table :deviceVendors do |t|
      t.string :name      
      t.string :legalName      
      t.string :headquartersCountry      
      t.string :website      
      t.timestamps
    end
    create_table :hardwareModules do |t|
      t.string :moduleCode      
      t.string :datasheetUri      
      t.integer :ModuleType      
      t.timestamps
    end
    create_table :deviceModels do |t|
      t.string :name      
      t.string :modelNumber      
      t.string :hardwareRevision      
      t.integer :SupportedConnectivity      
      t.integer :DefaultTelemetryEncoding      
      t.timestamps
    end
    create_table :firmwareReleases do |t|
      t.string :version      
      t.date :releaseDate      
      t.string :releaseNotes      
      t.string :checksum      
      t.timestamps
    end
    create_table :ioTDevices do |t|
      t.string :deviceId      
      t.string :serialNumber      
      t.datetime :lastSeen      
      t.string :firmwareVersion      
      t.integer :Status      
      t.integer :PowerSource      
      t.timestamps
    end
    create_table :sensorInstances do |t|
      t.string :name      
      t.string :unit      
      t.integer :samplingIntervalMs      
      t.integer :SensorType      
      t.timestamps
    end
    create_table :actuatorInstances do |t|
      t.string :name      
      t.string :commandTopic      
      t.integer :ActuatorType      
      t.timestamps
    end
    create_table :telemetrySchemas do |t|
      t.string :schemaId      
      t.string :schemaUri      
      t.integer :Encoding      
      t.timestamps
    end
    create_table :telemetryStreams do |t|
      t.string :streamName      
      t.integer :retentionDays      
      t.integer :Qos      
      t.timestamps
    end
    create_table :commandDefinitions do |t|
      t.string :name      
      t.string :requestSchemaUri      
      t.string :responseSchemaUri      
      t.integer :timeoutSeconds      
      t.timestamps
    end
    create_table :commandInvocations do |t|
      t.string :invocationId      
      t.datetime :requestedAt      
      t.datetime :completedAt      
      t.integer :Status      
      t.timestamps
    end
    create_table :alertRules do |t|
      t.string :name      
      t.string :expression      
      t.integer :Severity      
      t.timestamps
    end
    create_table :alerts do |t|
      t.datetime :raisedAt      
      t.datetime :clearedAt      
      t.string :message      
      t.integer :Status      
      t.timestamps
    end
    create_table :tenants do |t|
      t.string :name      
      t.integer :TenantType      
      t.timestamps
    end
    create_table :tenantUsers do |t|
      t.string :firstName      
      t.string :lastName      
      t.string :email      
      t.integer :Role      
      t.timestamps
    end
    create_table :sites do |t|
      t.string :name      
      t.string :address      
      t.string :timezone      
      t.decimal :latitude      
      t.decimal :longitude      
      t.timestamps
    end
    create_table :buildings do |t|
      t.string :name      
      t.timestamps
    end
    create_table :floors do |t|
      t.string :name      
      t.integer :level      
      t.timestamps
    end
    create_table :rooms do |t|
      t.string :name      
      t.timestamps
    end
    create_table :gateways do |t|
      t.string :softwareVersion      
      t.integer :Status      
      t.timestamps
    end
    create_table :edgeApplications do |t|
      t.string :name      
      t.string :version      
      t.string :image      
      t.integer :Status      
      t.timestamps
    end
    create_table :networkProfiles do |t|
      t.string :profileName      
      t.string :ssid      
      t.string :apn      
      t.integer :ConnectivityType      
      t.timestamps
    end
    create_table :simCards do |t|
      t.string :iccid      
      t.string :imsi      
      t.string :carrier      
      t.integer :Status      
      t.timestamps
    end
    create_table :connectivityPlans do |t|
      t.string :name      
      t.integer :dataCapMB      
      t.integer :billingCycleDays      
      t.timestamps
    end
    create_table :messagingEndpoints do |t|
      t.string :host      
      t.integer :port      
      t.boolean :secure      
      t.integer :Protocol      
      t.timestamps
    end
    create_table :accessPolicys do |t|
      t.string :name      
      t.string :scope      
      t.datetime :expiresAt      
      t.timestamps
    end
    create_table :apiKeys do |t|
      t.string :keyId      
      t.string :hashedSecret      
      t.datetime :createdAt      
      t.datetime :lastUsedAt      
      t.timestamps
    end
    create_table :deviceCertificates do |t|
      t.string :serialNumber      
      t.datetime :notBefore      
      t.datetime :notAfter      
      t.string :fingerprint      
      t.integer :CertificateType      
      t.timestamps
    end
    create_table :provisioningRecords do |t|
      t.datetime :enrolledAt      
      t.string :provisioningService      
      t.integer :Method      
      t.integer :Status      
      t.timestamps
    end
    create_table :digitalTwins do |t|
      t.string :twinId      
      t.integer :desiredStateVersion      
      t.integer :reportedStateVersion      
      t.datetime :lastSyncAt      
      t.timestamps
    end
    create_table :twinTemplates do |t|
      t.string :name      
      t.string :schemaUri      
      t.string :version      
      t.timestamps
    end
    create_table :twinChangeEvents do |t|
      t.string :eventId      
      t.datetime :occurredAt      
      t.integer :ChangeType      
      t.timestamps
    end
    create_table :maintenanceTickets do |t|
      t.string :ticketNumber      
      t.datetime :openedAt      
      t.datetime :closedAt      
      t.integer :Priority      
      t.integer :Status      
      t.timestamps
    end
    create_table :dataRetentionPolicys do |t|
      t.string :name      
      t.integer :retentionDays      
      t.timestamps
    end
    create_table :softwareUpdateCampaigns do |t|
      t.string :campaignCode      
      t.datetime :scheduledStart      
      t.datetime :scheduledEnd      
      t.integer :Status      
      t.timestamps
    end
    create_table :softwareUpdateExecutions do |t|
      t.datetime :startedAt      
      t.datetime :completedAt      
      t.integer :Status      
      t.timestamps
    end
    create_table :deviceGroups do |t|
      t.string :name      
      t.string :criteria      
      t.timestamps
    end
    create_table :usageRecords do |t|
      t.date :periodStart      
      t.date :periodEnd      
      t.integer :messagesSent      
      t.integer :dataVolumeMB      
      t.timestamps
    end
  end
end
