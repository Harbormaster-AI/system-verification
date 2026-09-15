

// Define collection and schema for ActuatorInstance
export interface ActuatorInstance {
    name:
	type : string
    commandTopic:
	type : TopicName
    Device:
	type : Schema.Types.ObjectId
    SupportedCommands:
 	type : [{ type: Schema.Types.ObjectId, ref: 'CommandDefinition' }]
    ActuatorType:
 	type : String
#
    collection: 'actuatorInstances'
}
