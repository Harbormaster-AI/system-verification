

// Define collection and schema for Building
export interface Building {
    name:
	type : string
    Site:
	type : Schema.Types.ObjectId
    Floors:
 	type : [{ type: Schema.Types.ObjectId, ref: 'Floor' }]
#
    collection: 'buildings'
}
