package model

import (
    "time"
    "gorm.io/gorm"
)

//==============================================================
// AccessPolicy Declaration
//==============================================================
type AccessPolicy struct {
    gorm.Model
     Name                                    string
    Scope                                    string
    ExpiresAt                                                            time.Time
    TenantId         *uint
    Tenant           *Tenant `gorm:"foreignKey:TenantId"`
     ApiKeys           []ApiKey `gorm:"foreignKey:ApiKeysFromAccessPolicyId"`
     Users           []TenantUser `gorm:"foreignKey:UsersFromAccessPolicyId"`

// parent associations as their child

}

