package model

import (
    "time"
    "gorm.io/gorm"
)

//==============================================================
// Meeting Declaration
//==============================================================
type Meeting struct {
    gorm.Model
     MeetingDate                                                            time.Time
    Location                                    string
    Subject                                    string
    Notes                                    string
    HouseholdId         *uint
    Household           *Household `gorm:"foreignKey:HouseholdId"`
    AdvisorId         *uint
    Advisor           *Advisor `gorm:"foreignKey:AdvisorId"`
     Documents           []Document `gorm:"foreignKey:DocumentsFromMeetingId"`

// parent associations as their child

}

