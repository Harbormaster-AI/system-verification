package model

import (
    "time"
    "gorm.io/gorm"
)

//==============================================================
// TaxLot Declaration
//==============================================================
type TaxLot struct {
    gorm.Model
     AcquisitionDate                                                            time.Time
    Quantity                                                            string
    UnitCost                                                            string
    PositionId         *uint
    Position           *Position `gorm:"foreignKey:PositionId"`

// parent associations as their child

}

