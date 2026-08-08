package model

import (
    "time"
    "gorm.io/gorm"
)

//==============================================================
// CashMovement Declaration
//==============================================================
type CashMovement struct {
    gorm.Model
     Amount                                                            string
    ValueDate                                                            time.Time
    Description                                    string
    AccountId         *uint
    Account           *Account `gorm:"foreignKey:AccountId"`
    RelatedInstructionId         *uint
    RelatedInstruction           *StandingInstruction `gorm:"foreignKey:RelatedInstructionId"`
    RelatedTransactionId         *uint
    RelatedTransaction           *Transaction `gorm:"foreignKey:RelatedTransactionId"`
    MovementType                      CashMovementType

// parent associations as their child

}

