package model

import (
    "time"
    "gorm.io/gorm"
)

//==============================================================
// ResearchNote Declaration
//==============================================================
type ResearchNote struct {
    gorm.Model
     Title                                    string
    PublishedDate                                                            time.Time
    Author                                    string
    ContentSummary                                    string
    SecurityId         *uint
    Security           *Security `gorm:"foreignKey:SecurityId"`
    AdvisorId         *uint
    Advisor           *Advisor `gorm:"foreignKey:AdvisorId"`
    Rating                      AnalystRating

// parent associations as their child

}

