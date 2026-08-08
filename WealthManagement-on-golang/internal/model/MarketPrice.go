package model

import (
    "time"
    "gorm.io/gorm"
)

//==============================================================
// MarketPrice Declaration
//==============================================================
type MarketPrice struct {
    gorm.Model
     Price                                                            string
    PriceDate                                                            time.Time
    SecurityId         *uint
    Security           *Security `gorm:"foreignKey:SecurityId"`
    Source                      PricingSourceType

// parent associations as their child

}

