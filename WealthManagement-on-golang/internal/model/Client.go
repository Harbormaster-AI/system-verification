package model

import (
    "time"
    "gorm.io/gorm"
)

//==============================================================
// Client Declaration
//==============================================================
type Client struct {
    gorm.Model
     FirstName                                    string
    LastName                                    string
    TaxResidency                                    string
    DateOfBirth                                                            time.Time
    Email                                    string
    HouseholdId         *uint
    Household           *Household `gorm:"foreignKey:HouseholdId"`
     Accounts           []Account `gorm:"foreignKey:AccountsFromClientId"`
     Documents           []Document `gorm:"foreignKey:DocumentsFromClientId"`
     Beneficiaries           []Beneficiary `gorm:"foreignKey:BeneficiariesFromClientId"`
    KycRecordId         *uint
    KycRecord           *KycRecord `gorm:"foreignKey:KycRecordId"`
     Agreements           []Agreement `gorm:"foreignKey:AgreementsFromClientId"`

// parent associations as their child

}

