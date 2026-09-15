

// Define collection and schema for TwinTemplate
export interface TwinTemplate {
    name:
	type : string
    schemaUri:
	type : Uri
    version:
	type : string
    DeviceModels:
 	type : [{ type: Schema.Types.ObjectId, ref: 'DeviceModel' }]
#
    collection: 'twinTemplates'
}
