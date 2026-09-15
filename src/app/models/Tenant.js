

// Define collection and schema for Tenant
export interface Tenant {
    name:
	type : string
    Sites:
 	type : [{ type: Schema.Types.ObjectId, ref: 'Site' }]
    Users:
 	type : [{ type: Schema.Types.ObjectId, ref: 'TenantUser' }]
    Devices:
 	type : [{ type: Schema.Types.ObjectId, ref: 'IoTDevice' }]
    DataRetentionPolicies:
 	type : [{ type: Schema.Types.ObjectId, ref: 'DataRetentionPolicy' }]
    ConnectivityPlans:
 	type : [{ type: Schema.Types.ObjectId, ref: 'ConnectivityPlan' }]
    SimCards:
 	type : [{ type: Schema.Types.ObjectId, ref: 'SimCard' }]
    MessagingEndpoints:
 	type : [{ type: Schema.Types.ObjectId, ref: 'MessagingEndpoint' }]
    AccessPolicies:
 	type : [{ type: Schema.Types.ObjectId, ref: 'AccessPolicy' }]
    DeviceGroups:
 	type : [{ type: Schema.Types.ObjectId, ref: 'DeviceGroup' }]
    AlertRules:
 	type : [{ type: Schema.Types.ObjectId, ref: 'AlertRule' }]
    MaintenanceTickets:
 	type : [{ type: Schema.Types.ObjectId, ref: 'MaintenanceTicket' }]
    UsageRecords:
 	type : [{ type: Schema.Types.ObjectId, ref: 'UsageRecord' }]
    TenantType:
 	type : String
#
    collection: 'tenants'
}
