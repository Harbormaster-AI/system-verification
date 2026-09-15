package model

import (
    "time"
    "gorm.io/gorm"
)

//==============================================================
// DeviceCertificate Declaration
//==============================================================
type DeviceCertificate struct {
    gorm.Model
     SerialNumber                                    string
    NotBefore                                                            time.Time
    NotAfter                                                            time.Time
    Fingerprint                                    string
    DeviceId         *uint
    Device           *IoTDevice `gorm:"foreignKey:DeviceId"`
    GatewayId         *uint
    Gateway           *Gateway `gorm:"foreignKey:GatewayId"`
    CertificateType                      CertificateType

// parent associations as their child

}

