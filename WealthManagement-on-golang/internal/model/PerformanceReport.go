package model

import (
    "time"
    "gorm.io/gorm"
)

//==============================================================
// PerformanceReport Declaration
//==============================================================
type PerformanceReport struct {
    gorm.Model
     PeriodStart                                                            time.Time
    PeriodEnd                                                            time.Time
    NetReturn                                                            string
    GrossReturn                                                            string
    PortfolioId         *uint
    Portfolio           *Portfolio `gorm:"foreignKey:PortfolioId"`
    BenchmarkId         *uint
    Benchmark           *Benchmark `gorm:"foreignKey:BenchmarkId"`
    Frequency                      PerformanceFrequency

// parent associations as their child

}

