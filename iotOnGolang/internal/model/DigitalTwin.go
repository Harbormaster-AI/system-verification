package model

import (
    "time"
    "gorm.io/gorm"
)

//==============================================================
// DigitalTwin Declaration
//==============================================================
type DigitalTwin struct {
    gorm.Model
     TwinId                                    string
    DesiredStateVersion                                                            string
    ReportedStateVersion                                                            string
    LastSyncAt                                                            time.Time
    DeviceId         *uint
    Device           *IoTDevice `gorm:"foreignKey:DeviceId"`
    GatewayId         *uint
    Gateway           *Gateway `gorm:"foreignKey:GatewayId"`
    TemplateId         *uint
    Template           *TwinTemplate `gorm:"foreignKey:TemplateId"`
     ChangeEvents           []TwinChangeEvent `gorm:"foreignKey:ChangeEventsFromDigitalTwinId"`

// parent associations as their child

}

