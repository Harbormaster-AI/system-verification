package model

import (
    "gorm.io/gorm"
)

//==============================================================
// ModelPortfolio Declaration
//==============================================================
type ModelPortfolio struct {
    gorm.Model
     Name                                    string
    Objective                                    string
     Allocations           []AssetAllocationSlice `gorm:"foreignKey:AllocationsFromModelPortfolioId"`
     Portfolios           []Portfolio `gorm:"foreignKey:PortfoliosFromModelPortfolioId"`
    RiskLevel                      RiskToleranceLevel

// parent associations as their child

}

