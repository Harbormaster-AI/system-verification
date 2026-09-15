package model

import (
    "time"
    "gorm.io/gorm"
)

//==============================================================
// ApiKey Declaration
//==============================================================
type ApiKey struct {
    gorm.Model
     KeyId                                    string
    HashedSecret                                    string
    CreatedAt                                                            time.Time
    LastUsedAt                                                            time.Time
    AccessPolicyId         *uint
    AccessPolicy           *AccessPolicy `gorm:"foreignKey:AccessPolicyId"`

// parent associations as their child

}

