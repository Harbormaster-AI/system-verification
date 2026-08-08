package model

import (
    "time"
    "gorm.io/gorm"
)

//==============================================================
// CorporateAction Declaration
//==============================================================
type CorporateAction struct {
    gorm.Model
     RecordDate                                                            time.Time
    PayableDate                                                            time.Time
    Details                                    string
    SecurityId         *uint
    Security           *Security `gorm:"foreignKey:SecurityId"`
     Dividends           []Dividend `gorm:"foreignKey:DividendsFromCorporateActionId"`
    ActionType                      CorporateActionType

// parent associations as their child

}

