package model

import (
    "gorm.io/gorm"
)

//==============================================================
// Office Declaration
//==============================================================
type Office struct {
    gorm.Model
     Name                                    string
    Address                                                            string
    FirmId         *uint
    Firm           *WealthFirm `gorm:"foreignKey:FirmId"`
     Advisors           []Advisor `gorm:"foreignKey:AdvisorsFromOfficeId"`

// parent associations as their child

}

