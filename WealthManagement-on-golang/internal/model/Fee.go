package model

import (
    "time"
    "gorm.io/gorm"
)

//==============================================================
// Fee Declaration
//==============================================================
type Fee struct {
    gorm.Model
     FeeDate                                                            time.Time
    Amount                                                            string
    Description                                    string
    AccountId         *uint
    Account           *Account `gorm:"foreignKey:AccountId"`
    InvoiceId         *uint
    Invoice           *Invoice `gorm:"foreignKey:InvoiceId"`
    FeeType                      FeeType

// parent associations as their child

}

