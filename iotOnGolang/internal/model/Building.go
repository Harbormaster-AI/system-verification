package model

import (
    "gorm.io/gorm"
)

//==============================================================
// Building Declaration
//==============================================================
type Building struct {
    gorm.Model
     Name                                    string
    SiteId         *uint
    Site           *Site `gorm:"foreignKey:SiteId"`
     Floors           []Floor `gorm:"foreignKey:FloorsFromBuildingId"`

// parent associations as their child

}

