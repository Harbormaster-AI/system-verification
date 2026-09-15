package model

import (
    "time"
    "gorm.io/gorm"
)

//==============================================================
// ProvisioningRecord Declaration
//==============================================================
type ProvisioningRecord struct {
    gorm.Model
     EnrolledAt                                                            time.Time
    ProvisioningService                                    string
    DeviceId         *uint
    Device           *IoTDevice `gorm:"foreignKey:DeviceId"`
    CertificateId         *uint
    Certificate           *DeviceCertificate `gorm:"foreignKey:CertificateId"`
    TenantId         *uint
    Tenant           *Tenant `gorm:"foreignKey:TenantId"`
    Method                      ProvisioningMethod
    Status                      ProvisioningStatus

// parent associations as their child

}

