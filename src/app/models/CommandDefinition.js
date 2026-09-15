

// Define collection and schema for CommandDefinition
export interface CommandDefinition {
    name:
	type : string
    requestSchemaUri:
	type : Uri
    responseSchemaUri:
	type : Uri
    timeoutSeconds:
	type : number
    DeviceModel:
	type : Schema.Types.ObjectId
    Actuators:
 	type : [{ type: Schema.Types.ObjectId, ref: 'ActuatorInstance' }]
    CommandInvocations:
 	type : [{ type: Schema.Types.ObjectId, ref: 'CommandInvocation' }]
#
    collection: 'commandDefinitions'
}
