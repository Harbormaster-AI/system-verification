package model

import (
    "time"
    "gorm.io/gorm"
)

//==============================================================
// Document Declaration
//==============================================================
type Document struct {
    gorm.Model
     Title                                    string
    FileName                                    string
    ReceivedDate                                                            time.Time
    ClientId         *uint
    Client           *Client `gorm:"foreignKey:ClientId"`
    KycRecordId         *uint
    KycRecord           *KycRecord `gorm:"foreignKey:KycRecordId"`
    AgreementId         *uint
    Agreement           *Agreement `gorm:"foreignKey:AgreementId"`
    DocumentType                      DocumentType

// parent associations as their child

}

