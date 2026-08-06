package model

import (
    "time"
    "gorm.io/gorm"
)

//==============================================================
// RebalancePlan Declaration
//==============================================================
type RebalancePlan struct {
    gorm.Model
     PlanDate                                                            time.Time
    PortfolioId         *uint
    Portfolio           *Portfolio `gorm:"foreignKey:PortfolioId"`
     ProposedOrders           []Order_ `gorm:"foreignKey:ProposedOrdersFromRebalancePlanId"`
    AdvisorId         *uint
    Advisor           *Advisor `gorm:"foreignKey:AdvisorId"`
    Status                      RebalanceStatus
    Method                      RebalanceMethod

// parent associations as their child

}

