package model

import (
    "gorm.io/gorm"
)

//==============================================================
// Benchmark Declaration
//==============================================================
type Benchmark struct {
    gorm.Model
     Name                                    string
     PerformanceReports           []PerformanceReport `gorm:"foreignKey:PerformanceReportsFromBenchmarkId"`
     Constituents           []Security `gorm:"foreignKey:ConstituentsFromBenchmarkId"`
    BenchmarkType                      BenchmarkType

// parent associations as their child

}

