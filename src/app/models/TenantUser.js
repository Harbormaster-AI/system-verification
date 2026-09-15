

// Define collection and schema for TenantUser
export interface TenantUser {
    firstName:
	type : string
    lastName:
	type : string
    email:
	type : string
    Tenant:
	type : Schema.Types.ObjectId
    CommandInvocations:
 	type : [{ type: Schema.Types.ObjectId, ref: 'CommandInvocation' }]
    Role:
 	type : String
#
    collection: 'tenantUsers'
}
