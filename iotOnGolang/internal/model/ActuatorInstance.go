package model

import (
    "gorm.io/gorm"
)

//==============================================================
// ActuatorInstance Declaration
//==============================================================
type ActuatorInstance struct {
    gorm.Model
     Name                                    string
    CommandTopic                                                            string
    DeviceId         *uint
    Device           *IoTDevice `gorm:"foreignKey:DeviceId"`
     SupportedCommands           []CommandDefinition `gorm:"foreignKey:SupportedCommandsFromActuatorInstanceId"`
    ActuatorType                      ActuatorType

// parent associations as their child

}

