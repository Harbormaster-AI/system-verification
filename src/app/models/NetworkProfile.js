

// Define collection and schema for NetworkProfile
export interface NetworkProfile {
    profileName:
	type : string
    ssid:
	type : string
    apn:
	type : string
    Device:
	type : Schema.Types.ObjectId
    Gateway:
	type : Schema.Types.ObjectId
    SimCard:
	type : Schema.Types.ObjectId
    ConnectivityType:
 	type : String
#
    collection: 'networkProfiles'
}
