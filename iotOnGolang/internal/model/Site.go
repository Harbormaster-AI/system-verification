package model

import (
    "gorm.io/gorm"
)

//==============================================================
// Site Declaration
//==============================================================
type Site struct {
    gorm.Model
     Name                                    string
    Address                                                            string
    Timezone                                    string
    Latitude                                                            string
    Longitude                                                            string
    TenantId         *uint
    Tenant           *Tenant `gorm:"foreignKey:TenantId"`
     Buildings           []Building `gorm:"foreignKey:BuildingsFromSiteId"`
     Devices           []IoTDevice `gorm:"foreignKey:DevicesFromSiteId"`
     Gateways           []Gateway `gorm:"foreignKey:GatewaysFromSiteId"`

// parent associations as their child

}

