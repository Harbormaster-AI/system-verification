package model

import (
    "gorm.io/gorm"
)

//==============================================================
// OrderAllocation Declaration
//==============================================================
type OrderAllocation struct {
    gorm.Model
     AllocationPercent                                                            string
    OrderId         *uint
    Order           *Order_ `gorm:"foreignKey:OrderId"`
    AccountId         *uint
    Account           *Account `gorm:"foreignKey:AccountId"`
    PortfolioId         *uint
    Portfolio           *Portfolio `gorm:"foreignKey:PortfolioId"`

// parent associations as their child

}

