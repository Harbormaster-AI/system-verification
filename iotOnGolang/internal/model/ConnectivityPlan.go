package model

import (
    "gorm.io/gorm"
)

//==============================================================
// ConnectivityPlan Declaration
//==============================================================
type ConnectivityPlan struct {
    gorm.Model
     Name                                    string
    DataCapMB                                                            string
    BillingCycleDays                                                            string
     SimCards           []SimCard `gorm:"foreignKey:SimCardsFromConnectivityPlanId"`
    TenantId         *uint
    Tenant           *Tenant `gorm:"foreignKey:TenantId"`

// parent associations as their child

}

