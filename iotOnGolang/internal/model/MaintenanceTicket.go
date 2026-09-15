package model

import (
    "time"
    "gorm.io/gorm"
)

//==============================================================
// MaintenanceTicket Declaration
//==============================================================
type MaintenanceTicket struct {
    gorm.Model
     TicketNumber                                    string
    OpenedAt                                                            time.Time
    ClosedAt                                                            time.Time
    DeviceId         *uint
    Device           *IoTDevice `gorm:"foreignKey:DeviceId"`
    TenantId         *uint
    Tenant           *Tenant `gorm:"foreignKey:TenantId"`
    Priority                      MaintenancePriority
    Status                      MaintenanceStatus

// parent associations as their child

}

