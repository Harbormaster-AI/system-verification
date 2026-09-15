

// Define collection and schema for SimCard
export interface SimCard {
    iccid:
	type : string
    imsi:
	type : string
    carrier:
	type : string
    NetworkProfiles:
 	type : [{ type: Schema.Types.ObjectId, ref: 'NetworkProfile' }]
    Tenant:
	type : Schema.Types.ObjectId
    ConnectivityPlan:
	type : Schema.Types.ObjectId
    Status:
 	type : String
#
    collection: 'simCards'
}
