package model

import (
    "gorm.io/gorm"
)

//==============================================================
// DeviceVendor Declaration
//==============================================================
type DeviceVendor struct {
    gorm.Model
     Name                                    string
    LegalName                                    string
    HeadquartersCountry                                    string
    Website                                    string
     DeviceModels           []DeviceModel `gorm:"foreignKey:DeviceModelsFromDeviceVendorId"`
     FirmwareReleases           []FirmwareRelease `gorm:"foreignKey:FirmwareReleasesFromDeviceVendorId"`
     HardwareModules           []HardwareModule `gorm:"foreignKey:HardwareModulesFromDeviceVendorId"`

// parent associations as their child

}

