package model

import (
    "time"
    "gorm.io/gorm"
)

//==============================================================
// UsageRecord Declaration
//==============================================================
type UsageRecord struct {
    gorm.Model
     PeriodStart                                                            time.Time
    PeriodEnd                                                            time.Time
    MessagesSent                                                            string
    DataVolumeMB                                                            string
    TenantId         *uint
    Tenant           *Tenant `gorm:"foreignKey:TenantId"`
    DeviceId         *uint
    Device           *IoTDevice `gorm:"foreignKey:DeviceId"`
    ConnectivityPlanId         *uint
    ConnectivityPlan           *ConnectivityPlan `gorm:"foreignKey:ConnectivityPlanId"`

// parent associations as their child

}

