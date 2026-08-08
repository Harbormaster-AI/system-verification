package model

import (
    "time"
    "gorm.io/gorm"
)

//==============================================================
// BillingRun Declaration
//==============================================================
type BillingRun struct {
    gorm.Model
     RunDate                                                            time.Time
    PeriodStart                                                            time.Time
    PeriodEnd                                                            time.Time
    FeeScheduleId         *uint
    FeeSchedule           *FeeSchedule `gorm:"foreignKey:FeeScheduleId"`
     Invoices           []Invoice `gorm:"foreignKey:InvoicesFromBillingRunId"`
    Status                      BillingRunStatus

// parent associations as their child

}

