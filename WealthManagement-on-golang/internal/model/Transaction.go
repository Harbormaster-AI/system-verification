package model

import (
    "time"
    "gorm.io/gorm"
)

//==============================================================
// Transaction Declaration
//==============================================================
type Transaction struct {
    gorm.Model
     TradeDate                                                            time.Time
    SettleDate                                                            time.Time
    Amount                                                            string
    Quantity                                                            string
    AccountId         *uint
    Account           *Account `gorm:"foreignKey:AccountId"`
    SecurityId         *uint
    Security           *Security `gorm:"foreignKey:SecurityId"`
    OrderId         *uint
    Order           *Order_ `gorm:"foreignKey:OrderId"`
    PositionId         *uint
    Position           *Position `gorm:"foreignKey:PositionId"`
    TransactionType                      TransactionType

// parent associations as their child

}

