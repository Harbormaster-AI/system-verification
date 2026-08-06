package model

import (
    "time"
    "gorm.io/gorm"
)

//==============================================================
// Invoice Declaration
//==============================================================
type Invoice struct {
    gorm.Model
     InvoiceNumber                                    string
    IssueDate                                                            time.Time
    DueDate                                                            time.Time
    TotalDue                                                            string
    AccountId         *uint
    Account           *Account `gorm:"foreignKey:AccountId"`
     Fees           []Fee `gorm:"foreignKey:FeesFromInvoiceId"`
    BillingRunId         *uint
    BillingRun           *BillingRun `gorm:"foreignKey:BillingRunId"`
    Status                      InvoiceStatus

// parent associations as their child

}

