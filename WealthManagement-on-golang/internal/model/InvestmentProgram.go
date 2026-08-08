package model

import (
    "gorm.io/gorm"
)

//==============================================================
// InvestmentProgram Declaration
//==============================================================
type InvestmentProgram struct {
    gorm.Model
     Name                                    string
    Description                                    string
    ProgramType                                    string
     ModelPortfolios           []ModelPortfolio `gorm:"foreignKey:ModelPortfoliosFromInvestmentProgramId"`
     FeeSchedules           []FeeSchedule `gorm:"foreignKey:FeeSchedulesFromInvestmentProgramId"`

// parent associations as their child

}

