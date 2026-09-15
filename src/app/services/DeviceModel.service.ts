
import { Injectable } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import {DeviceModel} from '../models/DeviceModel';
import {DeviceVendorService} from '../services/DeviceVendor.service';
import {HardwareModuleService} from '../services/HardwareModule.service';
import {TwinTemplateService} from '../services/TwinTemplate.service';
import {FirmwareReleaseService} from '../services/FirmwareRelease.service';
import {CommandDefinitionService} from '../services/CommandDefinition.service';
import { HelperBaseService } from './helperbase.service';

@Injectable({
	providedIn: 'root'
})

export class DeviceModelService extends HelperBaseService {

	//********************************************************************
	// general holder 
	//********************************************************************
	deviceModel : DeviceModel;

	//********************************************************************
	// Catch all for the return value of a service call
	//********************************************************************
	result: any;

	//********************************************************************
	// sole constructor, injected with the HttpClient
	//********************************************************************
	constructor(private http: HttpClient) {
		super();
	}

		//********************************************************************
	// add a DeviceModel
	// returns the results untouched as a JSON representation
	// delegates via URI
	//********************************************************************
	addDeviceModel(name, modelNumber, hardwareRevision, Vendor, HardwareModules, TwinTemplate, FirmwareReleases, CommandDefinitions, SupportedConnectivity, DefaultTelemetryEncoding) : Observable<any> {
		const uri_ = this.apiUrl + '/DeviceModel/create';
		const obj = {
			      		name: name,
      		modelNumber: modelNumber,
      		hardwareRevision: hardwareRevision,
      		Vendor: Vendor != null && Vendor.length > 0 ? Vendor : null,
      		HardwareModules: HardwareModules != null && HardwareModules.length > 0 ? HardwareModules : null,
      		TwinTemplate: TwinTemplate != null && TwinTemplate.length > 0 ? TwinTemplate : null,
      		FirmwareReleases: FirmwareReleases != null && FirmwareReleases.length > 0 ? FirmwareReleases : null,
      		CommandDefinitions: CommandDefinitions != null && CommandDefinitions.length > 0 ? CommandDefinitions : null,
      		SupportedConnectivity: SupportedConnectivity,
			DefaultTelemetryEncoding: DefaultTelemetryEncoding
		};

		return this.http.post(uri_, obj);
	}

	//********************************************************************
	// update a DeviceModel
	// returns an Observable
	// delegates via URI
	//********************************************************************
		updateDeviceModel(name, modelNumber, hardwareRevision, Vendor, HardwareModules, TwinTemplate, FirmwareReleases, CommandDefinitions, SupportedConnectivity, DefaultTelemetryEncoding, id)  :  Observable<any>  {
			const uri_ = this.apiUrl + '/DeviceModel/update/' + id;
		const obj = {
				      		name: name,
      		modelNumber: modelNumber,
      		hardwareRevision: hardwareRevision,
      		Vendor: Vendor != null && Vendor.length > 0 ? Vendor : null,
      		HardwareModules: HardwareModules != null && HardwareModules.length > 0 ? HardwareModules : null,
      		TwinTemplate: TwinTemplate != null && TwinTemplate.length > 0 ? TwinTemplate : null,
      		FirmwareReleases: FirmwareReleases != null && FirmwareReleases.length > 0 ? FirmwareReleases : null,
      		CommandDefinitions: CommandDefinitions != null && CommandDefinitions.length > 0 ? CommandDefinitions : null,
      		SupportedConnectivity: SupportedConnectivity,
			DefaultTelemetryEncoding: DefaultTelemetryEncoding
		};
		return this.http.post(uri_, obj);
	}

	//********************************************************************
	// delete a DeviceModel
	// returns an Observable
	// delegates via URI
	//********************************************************************
	deleteDeviceModel(id)  : Observable<any> {
		const uri_ = this.apiUrl + '/DeviceModel/delete/' + id;

		return this.http.get(uri_);
	}
	
	//********************************************************************
	// loads a DeviceModel
	// returns the results untouched as an Observable DeviceModel
	// DeviceModel model
	// delegates via URI
	//********************************************************************
	getDeviceModel(id) : Observable<DeviceModel> {
		const uri_ = this.apiUrl + '/DeviceModel/load/' + id;

		return this.http.get<DeviceModel>(uri_);
	}
	
	//********************************************************************
	// gets all DeviceModel
	// returns the results untouched as JSON representation of an
	// Observable array of DeviceModel models
	// delegates via URI
	//********************************************************************
	getDeviceModels() : Observable<DeviceModel[]> {
		const uri_ = this.apiUrl + '/DeviceModel/';

		return this
			.http.get<DeviceModel[]>(uri_);
	}
	
		
	//********************************************************************
	// assigns a Vendor on a DeviceModel
	// returns an Observable
	// delegates via URI
	//********************************************************************
	assignVendor( deviceModelId, _vendorId ): Observable<any> {

		// get the DeviceModel from storage
		this.loadHelper( deviceModelId );

	// get the DeviceVendor from storage
	var tmp 	= new DeviceVendorService(this.http).getDeviceVendor(_vendorId);

	// assign the Vendor
	this.deviceModel.vendor = tmp;

	// save the DeviceModel
	return this.saveHelper();
}

	//********************************************************************
	// unassigns a Vendor on a DeviceModel
	// returns an Observable
	// delegates via URI
	//********************************************************************
	unassignVendor( deviceModelId ): Observable<any> {

		// get the DeviceModel from storage
		this.loadHelper( deviceModelId );

	// assign Vendor to null
	this.deviceModel.vendor = null;

	// save the DeviceModel
	return this.saveHelper();
}

	
	//********************************************************************
	// assigns a TwinTemplate on a DeviceModel
	// returns an Observable
	// delegates via URI
	//********************************************************************
	assignTwinTemplate( deviceModelId, _twinTemplateId ): Observable<any> {

		// get the DeviceModel from storage
		this.loadHelper( deviceModelId );

	// get the TwinTemplate from storage
	var tmp 	= new TwinTemplateService(this.http).getTwinTemplate(_twinTemplateId);

	// assign the TwinTemplate
	this.deviceModel.twinTemplate = tmp;

	// save the DeviceModel
	return this.saveHelper();
}

	//********************************************************************
	// unassigns a TwinTemplate on a DeviceModel
	// returns an Observable
	// delegates via URI
	//********************************************************************
	unassignTwinTemplate( deviceModelId ): Observable<any> {

		// get the DeviceModel from storage
		this.loadHelper( deviceModelId );

	// assign TwinTemplate to null
	this.deviceModel.twinTemplate = null;

	// save the DeviceModel
	return this.saveHelper();
}

	
		//********************************************************************
	// adds one or more hardwareModulesIds as a HardwareModules
	// to a DeviceModel
	// returns a Promise
	// delegates via URI
	//********************************************************************
	addHardwareModules( deviceModelId, hardwareModulesIds ): Observable<any> {

		// get the DeviceModel
		this.loadHelper( deviceModelId );

	// split on a comma with no spaces
	var idList = hardwareModulesIds.split(',')

	// iterate over array of hardwareModules ids
	idList.forEach(function (id) {
		// read the HardwareModule
		var hardwareModule = new HardwareModuleService(this.http).getHardwareModule(id);
		// add the HardwareModule if not already assigned
		if ( this.deviceModel.hardwareModules.indexOf(hardwareModule) == -1 )
		this.deviceModel.hardwareModules.push(hardwareModule);
	});

	// save it
	return this.saveHelper();
}

	//********************************************************************
	// removes one or more hardwareModulesIds as a HardwareModules
	// from a DeviceModel
	// returns a Promise
	// delegates via URI
	//********************************************************************
	removeHardwareModules( deviceModelId, hardwareModulesIds ): Observable<any> {

		// get the DeviceModel
		this.loadHelper( deviceModelId );


	// split on a comma with no spaces
	var idList 					= hardwareModulesIds.split(',');
	var hardwareModules 	= this.deviceModel.hardwareModules;

	if ( hardwareModules != null && hardwareModulesIds != null ) {

		// iterate over array of hardwareModules ids
		hardwareModules.forEach(function (obj) {
			if ( hardwareModulesIds.indexOf(obj._id) > -1 ) {
				// remove the HardwareModule
				this.deviceModel.hardwareModules.pop(obj);
			}
		});

		// save it
		return this.saveHelper();
	}
}

		//********************************************************************
	// adds one or more firmwareReleasesIds as a FirmwareReleases
	// to a DeviceModel
	// returns a Promise
	// delegates via URI
	//********************************************************************
	addFirmwareReleases( deviceModelId, firmwareReleasesIds ): Observable<any> {

		// get the DeviceModel
		this.loadHelper( deviceModelId );

	// split on a comma with no spaces
	var idList = firmwareReleasesIds.split(',')

	// iterate over array of firmwareReleases ids
	idList.forEach(function (id) {
		// read the FirmwareRelease
		var firmwareRelease = new FirmwareReleaseService(this.http).getFirmwareRelease(id);
		// add the FirmwareRelease if not already assigned
		if ( this.deviceModel.firmwareReleases.indexOf(firmwareRelease) == -1 )
		this.deviceModel.firmwareReleases.push(firmwareRelease);
	});

	// save it
	return this.saveHelper();
}

	//********************************************************************
	// removes one or more firmwareReleasesIds as a FirmwareReleases
	// from a DeviceModel
	// returns a Promise
	// delegates via URI
	//********************************************************************
	removeFirmwareReleases( deviceModelId, firmwareReleasesIds ): Observable<any> {

		// get the DeviceModel
		this.loadHelper( deviceModelId );


	// split on a comma with no spaces
	var idList 					= firmwareReleasesIds.split(',');
	var firmwareReleases 	= this.deviceModel.firmwareReleases;

	if ( firmwareReleases != null && firmwareReleasesIds != null ) {

		// iterate over array of firmwareReleases ids
		firmwareReleases.forEach(function (obj) {
			if ( firmwareReleasesIds.indexOf(obj._id) > -1 ) {
				// remove the FirmwareRelease
				this.deviceModel.firmwareReleases.pop(obj);
			}
		});

		// save it
		return this.saveHelper();
	}
}

		//********************************************************************
	// adds one or more commandDefinitionsIds as a CommandDefinitions
	// to a DeviceModel
	// returns a Promise
	// delegates via URI
	//********************************************************************
	addCommandDefinitions( deviceModelId, commandDefinitionsIds ): Observable<any> {

		// get the DeviceModel
		this.loadHelper( deviceModelId );

	// split on a comma with no spaces
	var idList = commandDefinitionsIds.split(',')

	// iterate over array of commandDefinitions ids
	idList.forEach(function (id) {
		// read the CommandDefinition
		var commandDefinition = new CommandDefinitionService(this.http).getCommandDefinition(id);
		// add the CommandDefinition if not already assigned
		if ( this.deviceModel.commandDefinitions.indexOf(commandDefinition) == -1 )
		this.deviceModel.commandDefinitions.push(commandDefinition);
	});

	// save it
	return this.saveHelper();
}

	//********************************************************************
	// removes one or more commandDefinitionsIds as a CommandDefinitions
	// from a DeviceModel
	// returns a Promise
	// delegates via URI
	//********************************************************************
	removeCommandDefinitions( deviceModelId, commandDefinitionsIds ): Observable<any> {

		// get the DeviceModel
		this.loadHelper( deviceModelId );


	// split on a comma with no spaces
	var idList 					= commandDefinitionsIds.split(',');
	var commandDefinitions 	= this.deviceModel.commandDefinitions;

	if ( commandDefinitions != null && commandDefinitionsIds != null ) {

		// iterate over array of commandDefinitions ids
		commandDefinitions.forEach(function (obj) {
			if ( commandDefinitionsIds.indexOf(obj._id) > -1 ) {
				// remove the CommandDefinition
				this.deviceModel.commandDefinitions.pop(obj);
			}
		});

		// save it
		return this.saveHelper();
	}
}

	
	//********************************************************************
	// saveHelper - internal helper to save a DeviceModel
	//********************************************************************
	saveHelper() : Observable<any> {

		const uri_ = this.apiUrl + '/DeviceModel/update/' + this.deviceModel;

	return  this.http.post(uri_, this.deviceModel );
}

	//********************************************************************
	// loadHelper - internal helper to load a DeviceModel
	//********************************************************************	
	loadHelper( id ) {
		this.getDeviceModel(id)
			.subscribe((res : DeviceModel) => {
				this.deviceModel = res;
			});
	}
}