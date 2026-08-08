package model

import (
    "gorm.io/gorm"
)

//==============================================================
// Order_ Declaration
//==============================================================
type Order_ struct {
    gorm.Model
     OrderNumber                                    string
    Quantity                                                            string
    LimitPrice                                                            string
    AccountId         *uint
    Account           *Account `gorm:"foreignKey:AccountId"`
    SecurityId         *uint
    Security           *Security `gorm:"foreignKey:SecurityId"`
     Allocations           []OrderAllocation `gorm:"foreignKey:AllocationsFromOrder_Id"`
     Trades           []Trade `gorm:"foreignKey:TradesFromOrder_Id"`
    AdvisorId         *uint
    Advisor           *Advisor `gorm:"foreignKey:AdvisorId"`
    OrderType                      OrderType
    Side                      OrderSide
    PriceType                      PriceType
    TimeInForce                      TimeInForce
    Status                      OrderStatus

// parent associations as their child

}

