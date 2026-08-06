package model

import (
    "time"
    "gorm.io/gorm"
)

//==============================================================
// WealthGoal Declaration
//==============================================================
type WealthGoal struct {
    gorm.Model
     Name                                    string
    TargetAmount                                                            string
    TargetDate                                                            time.Time
    Priority                                    int32
    HouseholdId         *uint
    Household           *Household `gorm:"foreignKey:HouseholdId"`
    PortfolioId         *uint
    Portfolio           *Portfolio `gorm:"foreignKey:PortfolioId"`
    InvestmentPolicyId         *uint
    InvestmentPolicy           *InvestmentPolicy `gorm:"foreignKey:InvestmentPolicyId"`
    GoalType                      GoalType

// parent associations as their child

}

