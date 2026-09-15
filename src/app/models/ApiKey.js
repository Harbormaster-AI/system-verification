

// Define collection and schema for ApiKey
export interface ApiKey {
    keyId:
	type : string
    hashedSecret:
	type : string
    createdAt:
	type : Date
    lastUsedAt:
	type : Date
    AccessPolicy:
	type : Schema.Types.ObjectId
#
    collection: 'apiKeys'
}
