package model

import (
    "time"
    "gorm.io/gorm"
)

//==============================================================
// IoTDevice Declaration
//==============================================================
type IoTDevice struct {
    gorm.Model
     DeviceId                                                            string
    SerialNumber                                    string
    LastSeen                                                            time.Time
    FirmwareVersion                                                            string
    DeviceModelId         *uint
    DeviceModel           *DeviceModel `gorm:"foreignKey:DeviceModelId"`
    TenantId         *uint
    Tenant           *Tenant `gorm:"foreignKey:TenantId"`
    SiteId         *uint
    Site           *Site `gorm:"foreignKey:SiteId"`
    RoomId         *uint
    Room           *Room `gorm:"foreignKey:RoomId"`
    GatewayId         *uint
    Gateway           *Gateway `gorm:"foreignKey:GatewayId"`
     Sensors           []SensorInstance `gorm:"foreignKey:SensorsFromIoTDeviceId"`
     Actuators           []ActuatorInstance `gorm:"foreignKey:ActuatorsFromIoTDeviceId"`
     Certificates           []DeviceCertificate `gorm:"foreignKey:CertificatesFromIoTDeviceId"`
    DigitalTwinId         *uint
    DigitalTwin           *DigitalTwin `gorm:"foreignKey:DigitalTwinId"`
     TelemetryStreams           []TelemetryStream `gorm:"foreignKey:TelemetryStreamsFromIoTDeviceId"`
     CommandInvocations           []CommandInvocation `gorm:"foreignKey:CommandInvocationsFromIoTDeviceId"`
     Alerts           []Alert `gorm:"foreignKey:AlertsFromIoTDeviceId"`
    ProvisioningRecordId         *uint
    ProvisioningRecord           *ProvisioningRecord `gorm:"foreignKey:ProvisioningRecordId"`
     DeviceGroups           []DeviceGroup `gorm:"foreignKey:DeviceGroupsFromIoTDeviceId"`
     NetworkProfiles           []NetworkProfile `gorm:"foreignKey:NetworkProfilesFromIoTDeviceId"`
    Status                      DeviceStatus
    PowerSource                      PowerSource

// parent associations as their child

}

