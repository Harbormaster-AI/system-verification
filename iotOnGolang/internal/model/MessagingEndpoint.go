package model

import (
    "gorm.io/gorm"
)

//==============================================================
// MessagingEndpoint Declaration
//==============================================================
type MessagingEndpoint struct {
    gorm.Model
     Host                                    string
    Port                                                            string
    Secure                                    bool
    TenantId         *uint
    Tenant           *Tenant `gorm:"foreignKey:TenantId"`
     Streams           []TelemetryStream `gorm:"foreignKey:StreamsFromMessagingEndpointId"`
    Protocol                      MessagingProtocol

// parent associations as their child

}

