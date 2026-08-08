package model

import (
    "time"
    "gorm.io/gorm"
)

//==============================================================
// Agreement Declaration
//==============================================================
type Agreement struct {
    gorm.Model
     EffectiveDate                                                            time.Time
    ClientId         *uint
    Client           *Client `gorm:"foreignKey:ClientId"`
    AccountId         *uint
    Account           *Account `gorm:"foreignKey:AccountId"`
     Documents           []Document `gorm:"foreignKey:DocumentsFromAgreementId"`
    AgreementType                      AgreementType
    Status                      AgreementStatus

// parent associations as their child

}

