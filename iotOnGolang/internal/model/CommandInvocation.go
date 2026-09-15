package model

import (
    "time"
    "gorm.io/gorm"
)

//==============================================================
// CommandInvocation Declaration
//==============================================================
type CommandInvocation struct {
    gorm.Model
     InvocationId                                    string
    RequestedAt                                                            time.Time
    CompletedAt                                                            time.Time
    DeviceId         *uint
    Device           *IoTDevice `gorm:"foreignKey:DeviceId"`
    CommandDefinitionId         *uint
    CommandDefinition           *CommandDefinition `gorm:"foreignKey:CommandDefinitionId"`
    ActuatorId         *uint
    Actuator           *ActuatorInstance `gorm:"foreignKey:ActuatorId"`
    UserId         *uint
    User           *TenantUser `gorm:"foreignKey:UserId"`
    Status                      CommandStatus

// parent associations as their child

}

