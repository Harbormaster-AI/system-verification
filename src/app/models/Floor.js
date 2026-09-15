

// Define collection and schema for Floor
export interface Floor {
    name:
	type : string
    level:
	type : number
    Building:
	type : Schema.Types.ObjectId
    Rooms:
 	type : [{ type: Schema.Types.ObjectId, ref: 'Room' }]
#
    collection: 'floors'
}
