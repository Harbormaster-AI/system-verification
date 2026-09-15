package model

import (
    "time"
    "gorm.io/gorm"
)

//==============================================================
// SoftwareUpdateCampaign Declaration
//==============================================================
type SoftwareUpdateCampaign struct {
    gorm.Model
     CampaignCode                                    string
    ScheduledStart                                                            time.Time
    ScheduledEnd                                                            time.Time
    FirmwareReleaseId         *uint
    FirmwareRelease           *FirmwareRelease `gorm:"foreignKey:FirmwareReleaseId"`
    DeviceGroupId         *uint
    DeviceGroup           *DeviceGroup `gorm:"foreignKey:DeviceGroupId"`
     Executions           []SoftwareUpdateExecution `gorm:"foreignKey:ExecutionsFromSoftwareUpdateCampaignId"`
    Status                      UpdateCampaignStatus

// parent associations as their child

}

