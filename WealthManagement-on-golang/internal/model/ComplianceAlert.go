package model

import (
    "time"
    "gorm.io/gorm"
)

//==============================================================
// ComplianceAlert Declaration
//==============================================================
type ComplianceAlert struct {
    gorm.Model
     AlertDate                                                            time.Time
    Message                                    string
    RuleId         *uint
    Rule           *ComplianceRule `gorm:"foreignKey:RuleId"`
    AccountId         *uint
    Account           *Account `gorm:"foreignKey:AccountId"`
    OrderId         *uint
    Order           *Order_ `gorm:"foreignKey:OrderId"`
    AdvisorId         *uint
    Advisor           *Advisor `gorm:"foreignKey:AdvisorId"`
    Status                      ComplianceStatus
    Severity                      AlertSeverity

// parent associations as their child

}

