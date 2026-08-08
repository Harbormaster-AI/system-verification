package model

import (
    "time"
    "gorm.io/gorm"
)

//==============================================================
// KycRecord Declaration
//==============================================================
type KycRecord struct {
    gorm.Model
     AssessmentDate                                                            time.Time
    PepFlag                                    bool
    SourceOfWealth                                    string
    ClientId         *uint
    Client           *Client `gorm:"foreignKey:ClientId"`
     Documents           []Document `gorm:"foreignKey:DocumentsFromKycRecordId"`
    Status                      KycStatus

// parent associations as their child

}

