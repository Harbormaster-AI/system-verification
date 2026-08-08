package model

import (
    "gorm.io/gorm"
)

//==============================================================
// AdvisoryTeam Declaration
//==============================================================
type AdvisoryTeam struct {
    gorm.Model
     Name                                    string
    Specialization                                    string
     Advisors           []Advisor `gorm:"foreignKey:AdvisorsFromAdvisoryTeamId"`
     Households           []Household `gorm:"foreignKey:HouseholdsFromAdvisoryTeamId"`

// parent associations as their child

}

