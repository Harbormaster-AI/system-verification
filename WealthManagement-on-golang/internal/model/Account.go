package model

import (
    "time"
    "gorm.io/gorm"
)

//==============================================================
// Account Declaration
//==============================================================
type Account struct {
    gorm.Model
     Name                                    string
    AccountNumber                                                            string
    BaseCurrency                                    string
    OpenedDate                                                            time.Time
    HouseholdId         *uint
    Household           *Household `gorm:"foreignKey:HouseholdId"`
    AdvisorId         *uint
    Advisor           *Advisor `gorm:"foreignKey:AdvisorId"`
    CustodianId         *uint
    Custodian           *Custodian `gorm:"foreignKey:CustodianId"`
    PortfolioId         *uint
    Portfolio           *Portfolio `gorm:"foreignKey:PortfolioId"`
     Beneficiaries           []Beneficiary `gorm:"foreignKey:BeneficiariesFromAccountId"`
     Positions           []Position `gorm:"foreignKey:PositionsFromAccountId"`
     Transactions           []Transaction `gorm:"foreignKey:TransactionsFromAccountId"`
     Fees           []Fee `gorm:"foreignKey:FeesFromAccountId"`
     StandingInstructions           []StandingInstruction `gorm:"foreignKey:StandingInstructionsFromAccountId"`
     Invoices           []Invoice `gorm:"foreignKey:InvoicesFromAccountId"`
    AccountType                      AccountType
    RegistrationType                      RegistrationType
    Status                      AccountStatus

// parent associations as their child

}

