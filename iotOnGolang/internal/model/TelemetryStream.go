package model

import (
    "gorm.io/gorm"
)

//==============================================================
// TelemetryStream Declaration
//==============================================================
type TelemetryStream struct {
    gorm.Model
     StreamName                                    string
    RetentionDays                                                            string
    DeviceId         *uint
    Device           *IoTDevice `gorm:"foreignKey:DeviceId"`
    SensorId         *uint
    Sensor           *SensorInstance `gorm:"foreignKey:SensorId"`
    SchemaId         *uint
    Schema           *TelemetrySchema `gorm:"foreignKey:SchemaId"`
    MessagingEndpointId         *uint
    MessagingEndpoint           *MessagingEndpoint `gorm:"foreignKey:MessagingEndpointId"`
    RetentionPolicyId         *uint
    RetentionPolicy           *DataRetentionPolicy `gorm:"foreignKey:RetentionPolicyId"`
    Qos                      MessageQoS

// parent associations as their child

}

