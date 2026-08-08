package model

import (
    "gorm.io/gorm"
)

//==============================================================
// Custodian Declaration
//==============================================================
type Custodian struct {
    gorm.Model
     Name                                    string
    ClearingNumber                                    string
    Country                                    string
     Accounts           []Account `gorm:"foreignKey:AccountsFromCustodianId"`
     Transfers           []AccountTransfer `gorm:"foreignKey:TransfersFromCustodianId"`

// parent associations as their child

}

