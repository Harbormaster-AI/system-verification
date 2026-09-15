

// Define collection and schema for DeviceCertificate
export interface DeviceCertificate {
    serialNumber:
	type : string
    notBefore:
	type : Date
    notAfter:
	type : Date
    fingerprint:
	type : string
    Device:
	type : Schema.Types.ObjectId
    Gateway:
	type : Schema.Types.ObjectId
    CertificateType:
 	type : String
#
    collection: 'deviceCertificates'
}
