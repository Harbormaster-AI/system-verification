package model

import (
    "time"
    "gorm.io/gorm"
)

//==============================================================
// FirmwareRelease Declaration
//==============================================================
type FirmwareRelease struct {
    gorm.Model
     Version                                                            string
    ReleaseDate                                                            time.Time
    ReleaseNotes                                    string
    Checksum                                                            string
    DeviceModelId         *uint
    DeviceModel           *DeviceModel `gorm:"foreignKey:DeviceModelId"`

// parent associations as their child

}

