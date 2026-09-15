package model

import (
    "gorm.io/gorm"
)

//==============================================================
// Room Declaration
//==============================================================
type Room struct {
    gorm.Model
     Name                                    string
    FloorId         *uint
    Floor           *Floor `gorm:"foreignKey:FloorId"`
     Devices           []IoTDevice `gorm:"foreignKey:DevicesFromRoomId"`
     Gateways           []Gateway `gorm:"foreignKey:GatewaysFromRoomId"`

// parent associations as their child

}

