package model

import (
    "gorm.io/gorm"
)

//==============================================================
// Dividend Declaration
//==============================================================
type Dividend struct {
    gorm.Model
     GrossAmount                                                            string
    TaxWithheld                                                            string
    CorporateActionId         *uint
    CorporateAction           *CorporateAction `gorm:"foreignKey:CorporateActionId"`

// parent associations as their child

}

