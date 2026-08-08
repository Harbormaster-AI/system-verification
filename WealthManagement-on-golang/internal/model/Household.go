package model

import (
    "gorm.io/gorm"
)

//==============================================================
// Household Declaration
//==============================================================
type Household struct {
    gorm.Model
     Name                                    string
     Clients           []Client `gorm:"foreignKey:ClientsFromHouseholdId"`
    PrimaryAdvisorId         *uint
    PrimaryAdvisor           *Advisor `gorm:"foreignKey:PrimaryAdvisorId"`
     Portfolios           []Portfolio `gorm:"foreignKey:PortfoliosFromHouseholdId"`
     Goals           []WealthGoal `gorm:"foreignKey:GoalsFromHouseholdId"`
     RiskAssessments           []RiskAssessment `gorm:"foreignKey:RiskAssessmentsFromHouseholdId"`

// parent associations as their child

}

