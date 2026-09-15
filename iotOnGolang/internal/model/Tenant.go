package model

import (
    "gorm.io/gorm"
)

//==============================================================
// Tenant Declaration
//==============================================================
type Tenant struct {
    gorm.Model
     Name                                    string
     Sites           []Site `gorm:"foreignKey:SitesFromTenantId"`
     Users           []TenantUser `gorm:"foreignKey:UsersFromTenantId"`
     Devices           []IoTDevice `gorm:"foreignKey:DevicesFromTenantId"`
     DataRetentionPolicies           []DataRetentionPolicy `gorm:"foreignKey:DataRetentionPoliciesFromTenantId"`
     ConnectivityPlans           []ConnectivityPlan `gorm:"foreignKey:ConnectivityPlansFromTenantId"`
     SimCards           []SimCard `gorm:"foreignKey:SimCardsFromTenantId"`
     MessagingEndpoints           []MessagingEndpoint `gorm:"foreignKey:MessagingEndpointsFromTenantId"`
     AccessPolicies           []AccessPolicy `gorm:"foreignKey:AccessPoliciesFromTenantId"`
     DeviceGroups           []DeviceGroup `gorm:"foreignKey:DeviceGroupsFromTenantId"`
     AlertRules           []AlertRule `gorm:"foreignKey:AlertRulesFromTenantId"`
     MaintenanceTickets           []MaintenanceTicket `gorm:"foreignKey:MaintenanceTicketsFromTenantId"`
     UsageRecords           []UsageRecord `gorm:"foreignKey:UsageRecordsFromTenantId"`
    TenantType                      TenantType

// parent associations as their child

}

