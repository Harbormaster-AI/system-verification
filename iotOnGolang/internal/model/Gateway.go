package model

import (
    "gorm.io/gorm"
)

//==============================================================
// Gateway Declaration
//==============================================================
type Gateway struct {
    gorm.Model
     SoftwareVersion                                    string
    SiteId         *uint
    Site           *Site `gorm:"foreignKey:SiteId"`
    RoomId         *uint
    Room           *Room `gorm:"foreignKey:RoomId"`
     Devices           []IoTDevice `gorm:"foreignKey:DevicesFromGatewayId"`
     EdgeApplications           []EdgeApplication `gorm:"foreignKey:EdgeApplicationsFromGatewayId"`
     Certificates           []DeviceCertificate `gorm:"foreignKey:CertificatesFromGatewayId"`
    DigitalTwinId         *uint
    DigitalTwin           *DigitalTwin `gorm:"foreignKey:DigitalTwinId"`
     NetworkProfiles           []NetworkProfile `gorm:"foreignKey:NetworkProfilesFromGatewayId"`
    Status                      DeviceStatus

// parent associations as their child

}

