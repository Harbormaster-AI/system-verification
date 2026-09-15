

// Define collection and schema for HardwareModule
export interface HardwareModule {
    moduleCode:
	type : string
    datasheetUri:
	type : Uri
    Vendor:
	type : Schema.Types.ObjectId
    ModuleType:
 	type : String
#
    collection: 'hardwareModules'
}
