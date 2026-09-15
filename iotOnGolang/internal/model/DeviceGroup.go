package model

import (
    "gorm.io/gorm"
)

//==============================================================
// DeviceGroup Declaration
//==============================================================
type DeviceGroup struct {
    gorm.Model
     Name                                    string
    Criteria                                    string
    TenantId         *uint
    Tenant           *Tenant `gorm:"foreignKey:TenantId"`
     Devices           []IoTDevice `gorm:"foreignKey:DevicesFromDeviceGroupId"`

// parent associations as their child

}

