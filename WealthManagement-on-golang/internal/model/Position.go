package model

import (
    "gorm.io/gorm"
)

//==============================================================
// Position Declaration
//==============================================================
type Position struct {
    gorm.Model
     Quantity                                                            string
    CostBasis                                                            string
    PortfolioId         *uint
    Portfolio           *Portfolio `gorm:"foreignKey:PortfolioId"`
    SecurityId         *uint
    Security           *Security `gorm:"foreignKey:SecurityId"`
     TaxLots           []TaxLot `gorm:"foreignKey:TaxLotsFromPositionId"`
     Transactions           []Transaction `gorm:"foreignKey:TransactionsFromPositionId"`
    PositionType                      PositionType
    LotMethod                      TaxLotMethod

// parent associations as their child

}

