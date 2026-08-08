package model

import (
    "gorm.io/gorm"
)

//==============================================================
// AssetAllocationSlice Declaration
//==============================================================
type AssetAllocationSlice struct {
    gorm.Model
     TargetWeight                                                            string
    ModelPortfolioId         *uint
    ModelPortfolio           *ModelPortfolio `gorm:"foreignKey:ModelPortfolioId"`
    AssetClass                      AssetClass

// parent associations as their child

}

