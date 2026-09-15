

// Define collection and schema for AlertRule
export interface AlertRule {
    name:
	type : string
    expression:
	type : string
    Tenant:
	type : Schema.Types.ObjectId
    Streams:
 	type : [{ type: Schema.Types.ObjectId, ref: 'TelemetryStream' }]
    Alerts:
 	type : [{ type: Schema.Types.ObjectId, ref: 'Alert' }]
    Severity:
 	type : String
#
    collection: 'alertRules'
}
