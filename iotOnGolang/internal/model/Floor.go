package model

import (
    "gorm.io/gorm"
)

//==============================================================
// Floor Declaration
//==============================================================
type Floor struct {
    gorm.Model
     Name                                    string
    Level                                                            string
    BuildingId         *uint
    Building           *Building `gorm:"foreignKey:BuildingId"`
     Rooms           []Room `gorm:"foreignKey:RoomsFromFloorId"`

// parent associations as their child

}

