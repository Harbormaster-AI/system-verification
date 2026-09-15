package model

import (
    "time"
    "gorm.io/gorm"
)

//==============================================================
// TwinChangeEvent Declaration
//==============================================================
type TwinChangeEvent struct {
    gorm.Model
     EventId                                    string
    OccurredAt                                                            time.Time
    TwinId         *uint
    Twin           *DigitalTwin `gorm:"foreignKey:TwinId"`
    ChangeType                      TwinChangeType

// parent associations as their child

}

