

// Define collection and schema for FirmwareRelease
export interface FirmwareRelease {
    version:
	type : FirmwareVersion
    releaseDate:
	type : Date
    releaseNotes:
	type : string
    checksum:
	type : Checksum
    DeviceModel:
	type : Schema.Types.ObjectId
#
    collection: 'firmwareReleases'
}
