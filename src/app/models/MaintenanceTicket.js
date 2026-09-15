

// Define collection and schema for MaintenanceTicket
export interface MaintenanceTicket {
    ticketNumber:
	type : string
    openedAt:
	type : Date
    closedAt:
	type : Date
    Device:
	type : Schema.Types.ObjectId
    Tenant:
	type : Schema.Types.ObjectId
    Priority:
 	type : String
    Status:
 	type : String
#
    collection: 'maintenanceTickets'
}
