package model

import (
    "gorm.io/gorm"
)

//==============================================================
// InvestmentPolicy Declaration
//==============================================================
type InvestmentPolicy struct {
    gorm.Model
     PolicyNumber                                    string
    Constraints                                    string
    PortfolioId         *uint
    Portfolio           *Portfolio `gorm:"foreignKey:PortfolioId"`
    RiskAssessmentId         *uint
    RiskAssessment           *RiskAssessment `gorm:"foreignKey:RiskAssessmentId"`
     Goals           []WealthGoal `gorm:"foreignKey:GoalsFromInvestmentPolicyId"`
    SuitabilityStatus                      SuitabilityStatus

// parent associations as their child

}

