package model

import (
    "time"
    "gorm.io/gorm"
)

//==============================================================
// AccountTransfer Declaration
//==============================================================
type AccountTransfer struct {
    gorm.Model
     RequestDate                                                            time.Time
    CompletionDate                                                            time.Time
    FromCustodianId         *uint
    FromCustodian           *Custodian `gorm:"foreignKey:FromCustodianId"`
    ToCustodianId         *uint
    ToCustodian           *Custodian `gorm:"foreignKey:ToCustodianId"`
    AccountId         *uint
    Account           *Account `gorm:"foreignKey:AccountId"`
    TransferType                      TransferType
    Status                      TransferStatus

// parent associations as their child

}

