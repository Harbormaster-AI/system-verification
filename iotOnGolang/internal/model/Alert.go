package model

import (
    "time"
    "gorm.io/gorm"
)

//==============================================================
// Alert Declaration
//==============================================================
type Alert struct {
    gorm.Model
     RaisedAt                                                            time.Time
    ClearedAt                                                            time.Time
    Message                                    string
    DeviceId         *uint
    Device           *IoTDevice `gorm:"foreignKey:DeviceId"`
    AlertRuleId         *uint
    AlertRule           *AlertRule `gorm:"foreignKey:AlertRuleId"`
    Status                      AlertStatus

// parent associations as their child

}

