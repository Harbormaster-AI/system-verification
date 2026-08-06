package model

import (
    "time"
    "gorm.io/gorm"
)

//==============================================================
// Proposal Declaration
//==============================================================
type Proposal struct {
    gorm.Model
     ProposalNumber                                    string
    CreatedDate                                                            time.Time
    RecommendationText                                    string
    HouseholdId         *uint
    Household           *Household `gorm:"foreignKey:HouseholdId"`
    AdvisorId         *uint
    Advisor           *Advisor `gorm:"foreignKey:AdvisorId"`
    ModelPortfolioId         *uint
    ModelPortfolio           *ModelPortfolio `gorm:"foreignKey:ModelPortfolioId"`
    AccountId         *uint
    Account           *Account `gorm:"foreignKey:AccountId"`
    Status                      ProposalStatus
    ExpectedRisk                      RiskToleranceLevel

// parent associations as their child

}

