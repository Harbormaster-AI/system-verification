package model

import (
    "gorm.io/gorm"
)

//==============================================================
// EdgeApplication Declaration
//==============================================================
type EdgeApplication struct {
    gorm.Model
     Name                                    string
    Version                                    string
    Image                                    string
    GatewayId         *uint
    Gateway           *Gateway `gorm:"foreignKey:GatewayId"`
    Status                      DeploymentStatus

// parent associations as their child

}

