package model

import (
    "gorm.io/gorm"
)

//==============================================================
// TenantUser Declaration
//==============================================================
type TenantUser struct {
    gorm.Model
     FirstName                                    string
    LastName                                    string
    Email                                    string
    TenantId         *uint
    Tenant           *Tenant `gorm:"foreignKey:TenantId"`
     CommandInvocations           []CommandInvocation `gorm:"foreignKey:CommandInvocationsFromTenantUserId"`
    Role                      UserRole

// parent associations as their child

}

