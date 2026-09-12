class InitialMigration < ActiveRecord::Migration[6.1]
  def change
    create_table :banks do |t|
      t.string :name      
      t.string :legalName      
      t.string :swiftBic      
      t.string :headquartersCountry      
      t.string :website      
      t.timestamps
    end
    create_table :branchs do |t|
      t.string :name      
      t.string :branchCode      
      t.string :address      
      t.string :phone      
      t.string :openingHours      
      t.timestamps
    end
    create_table :aTMs do |t|
      t.string :terminalId      
      t.string :location      
      t.integer :Status      
      t.timestamps
    end
    create_table :customers do |t|
      t.string :firstName      
      t.string :lastName      
      t.string :legalName      
      t.date :dateOfBirth      
      t.string :taxId      
      t.string :email      
      t.string :phone      
      t.string :address      
      t.integer :CustomerType      
      t.integer :RiskRating      
      t.integer :KycStatus      
      t.timestamps
    end
    create_table :kycProfiles do |t|
      t.string :profileId      
      t.date :lastReviewedOn      
      t.integer :Status      
      t.timestamps
    end
    create_table :identityDocuments do |t|
      t.string :documentNumber      
      t.string :issuingCountry      
      t.date :expirationDate      
      t.integer :DocumentType      
      t.timestamps
    end
    create_table :riskAssessments do |t|
      t.integer :score      
      t.date :assessedOn      
      t.integer :Rating      
      t.timestamps
    end
    create_table :screeningResults do |t|
      t.date :screeningDate      
      t.string :provider      
      t.integer :Outcome      
      t.timestamps
    end
    create_table :bankingProducts do |t|
      t.string :productCode      
      t.string :name      
      t.string :description      
      t.integer :ProductCategory      
      t.timestamps
    end
    create_table :accounts do |t|
      t.string :accountNumber      
      t.string :iban      
      t.string :accountName      
      t.string :currency      
      t.date :openedOn      
      t.date :closedOn      
      t.integer :AccountType      
      t.integer :OwnershipType      
      t.integer :Status      
      t.timestamps
    end
    create_table :accountStatements do |t|
      t.string :statementNumber      
      t.date :periodStart      
      t.date :periodEnd      
      t.string :openingBalance      
      t.string :closingBalance      
      t.integer :DeliveryMethod      
      t.timestamps
    end
    create_table :transactions do |t|
      t.date :bookingDate      
      t.date :valueDate      
      t.string :amount      
      t.string :description      
      t.integer :Direction      
      t.integer :TransactionType      
      t.integer :Status      
      t.integer :Channel      
      t.timestamps
    end
    create_table :externalAccounts do |t|
      t.string :name      
      t.string :iban      
      t.string :accountNumber      
      t.string :bic      
      t.string :bankName      
      t.string :country      
      t.timestamps
    end
    create_table :fundsTransfers do |t|
      t.string :transferReference      
      t.string :amount      
      t.date :requestedDate      
      t.date :executionDate      
      t.string :purpose      
      t.string :feeAmount      
      t.integer :Method      
      t.integer :Status      
      t.timestamps
    end
    create_table :standingInstructions do |t|
      t.string :instructionId      
      t.string :amount      
      t.date :nextExecutionDate      
      t.integer :Frequency      
      t.integer :Status      
      t.timestamps
    end
    create_table :paymentCards do |t|
      t.string :cardNumber      
      t.string :embossedName      
      t.integer :expiryMonth      
      t.integer :expiryYear      
      t.integer :CardType      
      t.integer :CardStatus      
      t.integer :Network      
      t.timestamps
    end
    create_table :loanAccounts do |t|
      t.string :loanNumber      
      t.string :principalAmount      
      t.string :outstandingPrincipal      
      t.string :interestRate      
      t.date :originationDate      
      t.date :maturityDate      
      t.integer :paymentDayOfMonth      
      t.string :currency      
      t.integer :LoanType      
      t.integer :RateType      
      t.integer :Compounding      
      t.integer :Status      
      t.timestamps
    end
    create_table :repaymentSchedules do |t|
      t.integer :installmentNumber      
      t.date :dueDate      
      t.string :principalDue      
      t.string :interestDue      
      t.string :totalDue      
      t.integer :Status      
      t.timestamps
    end
    create_table :loanPayments do |t|
      t.string :paymentReference      
      t.string :amount      
      t.date :paymentDate      
      t.integer :Method      
      t.integer :Status      
      t.timestamps
    end
    create_table :collaterals do |t|
      t.string :appraisedValue      
      t.string :description      
      t.string :location      
      t.integer :CollateralType      
      t.timestamps
    end
    create_table :feeCharges do |t|
      t.string :feeCode      
      t.string :amount      
      t.date :appliedOn      
      t.integer :FeeType      
      t.timestamps
    end
    create_table :exchangeRates do |t|
      t.string :baseCurrency      
      t.string :counterCurrency      
      t.decimal :rate      
      t.date :asOf      
      t.string :source      
      t.timestamps
    end
    create_table :fXTrades do |t|
      t.string :tradeReference      
      t.date :tradeDate      
      t.date :settlementDate      
      t.string :amountSold      
      t.string :amountBought      
      t.decimal :rate      
      t.integer :Status      
      t.timestamps
    end
    create_table :disputes do |t|
      t.string :disputeReference      
      t.date :raisedOn      
      t.string :reason      
      t.integer :Status      
      t.timestamps
    end
    create_table :consents do |t|
      t.date :grantedOn      
      t.date :expiresOn      
      t.integer :ConsentType      
      t.integer :Status      
      t.timestamps
    end
    create_table :thirdPartyProviders do |t|
      t.string :name      
      t.string :registrationId      
      t.string :website      
      t.timestamps
    end
  end
end
