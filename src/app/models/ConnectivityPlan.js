

// Define collection and schema for ConnectivityPlan
export interface ConnectivityPlan {
    name:
	type : string
    dataCapMB:
	type : number
    billingCycleDays:
	type : number
    SimCards:
 	type : [{ type: Schema.Types.ObjectId, ref: 'SimCard' }]
    Tenant:
	type : Schema.Types.ObjectId
#
    collection: 'connectivityPlans'
}
