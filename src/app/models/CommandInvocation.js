

// Define collection and schema for CommandInvocation
export interface CommandInvocation {
    invocationId:
	type : string
    requestedAt:
	type : Date
    completedAt:
	type : Date
    Device:
	type : Schema.Types.ObjectId
    CommandDefinition:
	type : Schema.Types.ObjectId
    Actuator:
	type : Schema.Types.ObjectId
    User:
	type : Schema.Types.ObjectId
    Status:
 	type : String
#
    collection: 'commandInvocations'
}
