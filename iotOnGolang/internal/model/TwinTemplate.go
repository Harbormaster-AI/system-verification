package model

import (
    "gorm.io/gorm"
)

//==============================================================
// TwinTemplate Declaration
//==============================================================
type TwinTemplate struct {
    gorm.Model
     Name                                    string
    SchemaUri                                                            string
    Version                                    string
     DeviceModels           []DeviceModel `gorm:"foreignKey:DeviceModelsFromTwinTemplateId"`

// parent associations as their child

}

