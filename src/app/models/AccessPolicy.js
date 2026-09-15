

// Define collection and schema for AccessPolicy
export interface AccessPolicy {
    name:
	type : string
    scope:
	type : string
    expiresAt:
	type : Date
    Tenant:
	type : Schema.Types.ObjectId
    ApiKeys:
 	type : [{ type: Schema.Types.ObjectId, ref: 'ApiKey' }]
    Users:
 	type : [{ type: Schema.Types.ObjectId, ref: 'TenantUser' }]
#
    collection: 'accessPolicys'
}
