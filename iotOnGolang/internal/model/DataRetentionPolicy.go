package model

import (
    "gorm.io/gorm"
)

//==============================================================
// DataRetentionPolicy Declaration
//==============================================================
type DataRetentionPolicy struct {
    gorm.Model
     Name                                    string
    RetentionDays                                                            string
    TenantId         *uint
    Tenant           *Tenant `gorm:"foreignKey:TenantId"`
     Streams           []TelemetryStream `gorm:"foreignKey:StreamsFromDataRetentionPolicyId"`

// parent associations as their child

}

