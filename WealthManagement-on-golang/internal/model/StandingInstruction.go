package model

import (
    "time"
    "gorm.io/gorm"
)

//==============================================================
// StandingInstruction Declaration
//==============================================================
type StandingInstruction struct {
    gorm.Model
     NextExecutionDate                                                            time.Time
    Amount                                                            string
    Active                                    bool
    AccountId         *uint
    Account           *Account `gorm:"foreignKey:AccountId"`
    DestinationAccountId         *uint
    DestinationAccount           *Account `gorm:"foreignKey:DestinationAccountId"`
    InstructionType                      InstructionType
    Frequency                      InstructionFrequency

// parent associations as their child

}

