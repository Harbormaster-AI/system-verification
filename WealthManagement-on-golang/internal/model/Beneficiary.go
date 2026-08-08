package model

import (
    "gorm.io/gorm"
)

//==============================================================
// Beneficiary Declaration
//==============================================================
type Beneficiary struct {
    gorm.Model
     FirstName                                    string
    LastName                                    string
    Relationship                                    string
    AllocationPercent                                                            string
    ClientId         *uint
    Client           *Client `gorm:"foreignKey:ClientId"`
     Accounts           []Account `gorm:"foreignKey:AccountsFromBeneficiaryId"`

// parent associations as their child

}

