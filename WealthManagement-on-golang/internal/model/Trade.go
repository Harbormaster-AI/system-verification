package model

import (
    "time"
    "gorm.io/gorm"
)

//==============================================================
// Trade Declaration
//==============================================================
type Trade struct {
    gorm.Model
     ExecutionId                                    string
    ExecutionPrice                                                            string
    ExecutedQuantity                                                            string
    TradeDate                                                            time.Time
    Venue                                    string
    OrderId         *uint
    Order           *Order_ `gorm:"foreignKey:OrderId"`
    AccountId         *uint
    Account           *Account `gorm:"foreignKey:AccountId"`
    SecurityId         *uint
    Security           *Security `gorm:"foreignKey:SecurityId"`
    TransactionId         *uint
    Transaction           *Transaction `gorm:"foreignKey:TransactionId"`
    Status                      TradeStatus

// parent associations as their child

}

