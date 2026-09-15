package model

import (
    "gorm.io/gorm"
)

//==============================================================
// CommandDefinition Declaration
//==============================================================
type CommandDefinition struct {
    gorm.Model
     Name                                    string
    RequestSchemaUri                                                            string
    ResponseSchemaUri                                                            string
    TimeoutSeconds                                                            string
    DeviceModelId         *uint
    DeviceModel           *DeviceModel `gorm:"foreignKey:DeviceModelId"`
     Actuators           []ActuatorInstance `gorm:"foreignKey:ActuatorsFromCommandDefinitionId"`
     CommandInvocations           []CommandInvocation `gorm:"foreignKey:CommandInvocationsFromCommandDefinitionId"`

// parent associations as their child

}

