package model

import (
    "gorm.io/gorm"
)

//==============================================================
// HardwareModule Declaration
//==============================================================
type HardwareModule struct {
    gorm.Model
     ModuleCode                                    string
    DatasheetUri                                                            string
    VendorId         *uint
    Vendor           *DeviceVendor `gorm:"foreignKey:VendorId"`
    ModuleType                      ModuleType

// parent associations as their child

}

