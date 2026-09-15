package model

import (
    "gorm.io/gorm"
)

//==============================================================
// DeviceModel Declaration
//==============================================================
type DeviceModel struct {
    gorm.Model
     Name                                    string
    ModelNumber                                    string
    HardwareRevision                                    string
    VendorId         *uint
    Vendor           *DeviceVendor `gorm:"foreignKey:VendorId"`
     HardwareModules           []HardwareModule `gorm:"foreignKey:HardwareModulesFromDeviceModelId"`
    TwinTemplateId         *uint
    TwinTemplate           *TwinTemplate `gorm:"foreignKey:TwinTemplateId"`
     FirmwareReleases           []FirmwareRelease `gorm:"foreignKey:FirmwareReleasesFromDeviceModelId"`
     CommandDefinitions           []CommandDefinition `gorm:"foreignKey:CommandDefinitionsFromDeviceModelId"`
    SupportedConnectivity                      ConnectivityType
    DefaultTelemetryEncoding                      TelemetryEncoding

// parent associations as their child

}

