package model

import (
    "gorm.io/gorm"
)

//==============================================================
// TelemetrySchema Declaration
//==============================================================
type TelemetrySchema struct {
    gorm.Model
     SchemaId                                    string
    SchemaUri                                                            string
     Streams           []TelemetryStream `gorm:"foreignKey:StreamsFromTelemetrySchemaId"`
    Encoding                      TelemetryEncoding

// parent associations as their child

}

