package model

import (
    "time"
    "gorm.io/gorm"
)

//==============================================================
// Portfolio Declaration
//==============================================================
type Portfolio struct {
    gorm.Model
     Name                                    string
    BaseCurrency                                    string
    InceptionDate                                                            time.Time
    AccountId         *uint
    Account           *Account `gorm:"foreignKey:AccountId"`
    ModelPortfolioId         *uint
    ModelPortfolio           *ModelPortfolio `gorm:"foreignKey:ModelPortfolioId"`
    BenchmarkId         *uint
    Benchmark           *Benchmark `gorm:"foreignKey:BenchmarkId"`
    InvestmentPolicyId         *uint
    InvestmentPolicy           *InvestmentPolicy `gorm:"foreignKey:InvestmentPolicyId"`
     Positions           []Position `gorm:"foreignKey:PositionsFromPortfolioId"`
     PerformanceReports           []PerformanceReport `gorm:"foreignKey:PerformanceReportsFromPortfolioId"`
     RebalancePlans           []RebalancePlan `gorm:"foreignKey:RebalancePlansFromPortfolioId"`
    PortfolioType                      PortfolioType
    RebalanceFrequency                      RebalanceFrequency

// parent associations as their child

}

