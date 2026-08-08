package model

import (
    "gorm.io/gorm"
)

//==============================================================
// FeeSchedule Declaration
//==============================================================
type FeeSchedule struct {
    gorm.Model
     Name                                    string
    Rate                                                            string
    MinimumFee                                                            string
     Accounts           []Account `gorm:"foreignKey:AccountsFromFeeScheduleId"`
     BillingRuns           []BillingRun `gorm:"foreignKey:BillingRunsFromFeeScheduleId"`
    FeeType                      FeeType
    BillingMethod                      BillingMethod

// parent associations as their child

}

