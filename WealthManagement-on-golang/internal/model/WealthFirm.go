package model

import (
    "gorm.io/gorm"
)

//==============================================================
// WealthFirm Declaration
//==============================================================
type WealthFirm struct {
    gorm.Model
     Name                                    string
    LegalName                                    string
    DomicileCountry                                    string
    Website                                    string
     Advisors           []Advisor `gorm:"foreignKey:AdvisorsFromWealthFirmId"`
     Offices           []Office `gorm:"foreignKey:OfficesFromWealthFirmId"`
     Custodians           []Custodian `gorm:"foreignKey:CustodiansFromWealthFirmId"`
     InvestmentPrograms           []InvestmentProgram `gorm:"foreignKey:InvestmentProgramsFromWealthFirmId"`

// parent associations as their child

}

