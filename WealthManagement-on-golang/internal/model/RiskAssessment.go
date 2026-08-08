package model

import (
    "time"
    "gorm.io/gorm"
)

//==============================================================
// RiskAssessment Declaration
//==============================================================
type RiskAssessment struct {
    gorm.Model
     AssessmentDate                                                            time.Time
    CapacityScore                                    int32
    HorizonYears                                    int32
    HouseholdId         *uint
    Household           *Household `gorm:"foreignKey:HouseholdId"`
    AdvisorId         *uint
    Advisor           *Advisor `gorm:"foreignKey:AdvisorId"`
    RiskTolerance                      RiskToleranceLevel

// parent associations as their child

}

