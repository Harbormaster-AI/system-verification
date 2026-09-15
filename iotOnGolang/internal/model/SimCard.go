package model

import (
    "gorm.io/gorm"
)

//==============================================================
// SimCard Declaration
//==============================================================
type SimCard struct {
    gorm.Model
     Iccid                                    string
    Imsi                                    string
    Carrier                                    string
     NetworkProfiles           []NetworkProfile `gorm:"foreignKey:NetworkProfilesFromSimCardId"`
    TenantId         *uint
    Tenant           *Tenant `gorm:"foreignKey:TenantId"`
    ConnectivityPlanId         *uint
    ConnectivityPlan           *ConnectivityPlan `gorm:"foreignKey:ConnectivityPlanId"`
    Status                      SimStatus

// parent associations as their child

}

