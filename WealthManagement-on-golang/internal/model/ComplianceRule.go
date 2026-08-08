package model

import (
    "gorm.io/gorm"
)

//==============================================================
// ComplianceRule Declaration
//==============================================================
type ComplianceRule struct {
    gorm.Model
     Name                                    string
    RuleCode                                    string
    Description                                    string
     Alerts           []ComplianceAlert `gorm:"foreignKey:AlertsFromComplianceRuleId"`
    RuleSeverity                      AlertSeverity

// parent associations as their child

}

