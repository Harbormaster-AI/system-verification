package model

import (
    "gorm.io/gorm"
)

//==============================================================
// AlertRule Declaration
//==============================================================
type AlertRule struct {
    gorm.Model
     Name                                    string
    Expression                                    string
    TenantId         *uint
    Tenant           *Tenant `gorm:"foreignKey:TenantId"`
     Streams           []TelemetryStream `gorm:"foreignKey:StreamsFromAlertRuleId"`
     Alerts           []Alert `gorm:"foreignKey:AlertsFromAlertRuleId"`
    Severity                      AlertSeverity

// parent associations as their child

}

