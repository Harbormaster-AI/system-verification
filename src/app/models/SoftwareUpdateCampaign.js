

// Define collection and schema for SoftwareUpdateCampaign
export interface SoftwareUpdateCampaign {
    campaignCode:
	type : string
    scheduledStart:
	type : Date
    scheduledEnd:
	type : Date
    FirmwareRelease:
	type : Schema.Types.ObjectId
    DeviceGroup:
	type : Schema.Types.ObjectId
    Executions:
 	type : [{ type: Schema.Types.ObjectId, ref: 'SoftwareUpdateExecution' }]
    Status:
 	type : String
#
    collection: 'softwareUpdateCampaigns'
}
