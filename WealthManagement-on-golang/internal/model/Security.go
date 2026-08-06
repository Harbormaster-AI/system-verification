package model

import (
    "gorm.io/gorm"
)

//==============================================================
// Security Declaration
//==============================================================
type Security struct {
    gorm.Model
     Ticker                                    string
    Name                                    string
    Currency                                    string
    Isin                                                            string
    Cusip                                                            string
    ExpenseRatio                                                            string
     CorporateActions           []CorporateAction `gorm:"foreignKey:CorporateActionsFromSecurityId"`
     Prices           []MarketPrice `gorm:"foreignKey:PricesFromSecurityId"`
     Benchmarks           []Benchmark `gorm:"foreignKey:BenchmarksFromSecurityId"`
    SecurityType                      SecurityType
    AssetClass                      AssetClass

// parent associations as their child

}

