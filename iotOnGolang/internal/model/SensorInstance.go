package model

import (
    "gorm.io/gorm"
)

//==============================================================
// SensorInstance Declaration
//==============================================================
type SensorInstance struct {
    gorm.Model
     Name                                    string
    Unit                                    string
    SamplingIntervalMs                                                            string
    DeviceId         *uint
    Device           *IoTDevice `gorm:"foreignKey:DeviceId"`
     TelemetryStreams           []TelemetryStream `gorm:"foreignKey:TelemetryStreamsFromSensorInstanceId"`
    SensorType                      SensorType

// parent associations as their child

}

