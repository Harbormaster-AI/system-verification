package model

import (
    "gorm.io/gorm"
)

//==============================================================
// Advisor Declaration
//==============================================================
type Advisor struct {
    gorm.Model
     FirstName                                    string
    LastName                                    string
    LicenseNumber                                    string
    FirmId         *uint
    Firm           *WealthFirm `gorm:"foreignKey:FirmId"`
    OfficeId         *uint
    Office           *Office `gorm:"foreignKey:OfficeId"`
     Clients           []Client `gorm:"foreignKey:ClientsFromAdvisorId"`
    AdvisoryTeamId         *uint
    AdvisoryTeam           *AdvisoryTeam `gorm:"foreignKey:AdvisoryTeamId"`
    Role                      AdvisorRole

// parent associations as their child

}

