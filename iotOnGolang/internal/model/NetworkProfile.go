package model

import (
    "gorm.io/gorm"
)

//==============================================================
// NetworkProfile Declaration
//==============================================================
type NetworkProfile struct {
    gorm.Model
     ProfileName                                    string
    Ssid                                    string
    Apn                                    string
    DeviceId         *uint
    Device           *IoTDevice `gorm:"foreignKey:DeviceId"`
    GatewayId         *uint
    Gateway           *Gateway `gorm:"foreignKey:GatewayId"`
    SimCardId         *uint
    SimCard           *SimCard `gorm:"foreignKey:SimCardId"`
    ConnectivityType                      ConnectivityType

// parent associations as their child

}

