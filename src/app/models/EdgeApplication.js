

// Define collection and schema for EdgeApplication
export interface EdgeApplication {
    name:
	type : string
    version:
	type : string
    image:
	type : string
    Gateway:
	type : Schema.Types.ObjectId
    Status:
 	type : String
#
    collection: 'edgeApplications'
}
