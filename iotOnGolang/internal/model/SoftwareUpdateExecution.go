package model

import (
    "time"
    "gorm.io/gorm"
)

//==============================================================
// SoftwareUpdateExecution Declaration
//==============================================================
type SoftwareUpdateExecution struct {
    gorm.Model
     StartedAt                                                            time.Time
    CompletedAt                                                            time.Time
    CampaignId         *uint
    Campaign           *SoftwareUpdateCampaign `gorm:"foreignKey:CampaignId"`
    DeviceId         *uint
    Device           *IoTDevice `gorm:"foreignKey:DeviceId"`
    Status                      UpdateStatus

// parent associations as their child

}

