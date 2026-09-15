
import { Injectable } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import {DeviceVendor} from '../models/DeviceVendor';
import {DeviceModelService} from '../services/DeviceModel.service';
import {FirmwareReleaseService} from '../services/FirmwareRelease.service';
import {HardwareModuleService} from '../services/HardwareModule.service';
import { HelperBaseService } from './helperbase.service';

@Injectable({
	providedIn: 'root'
})

export class DeviceVendorService extends HelperBaseService {

	//********************************************************************
	// general holder 
	//********************************************************************
	deviceVendor : DeviceVendor;

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
	// add a DeviceVendor
	// returns the results untouched as a JSON representation
	// delegates via URI
	//********************************************************************
	addDeviceVendor(name, legalName, headquartersCountry, website, DeviceModels, FirmwareReleases, HardwareModules) : Observable<any> {
		const uri_ = this.apiUrl + '/DeviceVendor/create';
		const obj = {
			      		name: name,
      		legalName: legalName,
      		headquartersCountry: headquartersCountry,
      		website: website,
      		DeviceModels: DeviceModels != null && DeviceModels.length > 0 ? DeviceModels : null,
      		FirmwareReleases: FirmwareReleases != null && FirmwareReleases.length > 0 ? FirmwareReleases : null,
			HardwareModules: HardwareModules != null && HardwareModules.length > 0 ? HardwareModules : null
		};

		return this.http.post(uri_, obj);
	}

	//********************************************************************
	// update a DeviceVendor
	// returns an Observable
	// delegates via URI
	//********************************************************************
		updateDeviceVendor(name, legalName, headquartersCountry, website, DeviceModels, FirmwareReleases, HardwareModules, id)  :  Observable<any>  {
			const uri_ = this.apiUrl + '/DeviceVendor/update/' + id;
		const obj = {
				      		name: name,
      		legalName: legalName,
      		headquartersCountry: headquartersCountry,
      		website: website,
      		DeviceModels: DeviceModels != null && DeviceModels.length > 0 ? DeviceModels : null,
      		FirmwareReleases: FirmwareReleases != null && FirmwareReleases.length > 0 ? FirmwareReleases : null,
			HardwareModules: HardwareModules != null && HardwareModules.length > 0 ? HardwareModules : null
		};
		return this.http.post(uri_, obj);
	}

	//********************************************************************
	// delete a DeviceVendor
	// returns an Observable
	// delegates via URI
	//********************************************************************
	deleteDeviceVendor(id)  : Observable<any> {
		const uri_ = this.apiUrl + '/DeviceVendor/delete/' + id;

		return this.http.get(uri_);
	}
	
	//********************************************************************
	// loads a DeviceVendor
	// returns the results untouched as an Observable DeviceVendor
	// DeviceVendor model
	// delegates via URI
	//********************************************************************
	getDeviceVendor(id) : Observable<DeviceVendor> {
		const uri_ = this.apiUrl + '/DeviceVendor/load/' + id;

		return this.http.get<DeviceVendor>(uri_);
	}
	
	//********************************************************************
	// gets all DeviceVendor
	// returns the results untouched as JSON representation of an
	// Observable array of DeviceVendor models
	// delegates via URI
	//********************************************************************
	getDeviceVendors() : Observable<DeviceVendor[]> {
		const uri_ = this.apiUrl + '/DeviceVendor/';

		return this
			.http.get<DeviceVendor[]>(uri_);
	}
	
		
		//********************************************************************
	// adds one or more deviceModelsIds as a DeviceModels
	// to a DeviceVendor
	// returns a Promise
	// delegates via URI
	//********************************************************************
	addDeviceModels( deviceVendorId, deviceModelsIds ): Observable<any> {

		// get the DeviceVendor
		this.loadHelper( deviceVendorId );

	// split on a comma with no spaces
	var idList = deviceModelsIds.split(',')

	// iterate over array of deviceModels ids
	idList.forEach(function (id) {
		// read the DeviceModel
		var deviceModel = new DeviceModelService(this.http).getDeviceModel(id);
		// add the DeviceModel if not already assigned
		if ( this.deviceVendor.deviceModels.indexOf(deviceModel) == -1 )
		this.deviceVendor.deviceModels.push(deviceModel);
	});

	// save it
	return this.saveHelper();
}

	//********************************************************************
	// removes one or more deviceModelsIds as a DeviceModels
	// from a DeviceVendor
	// returns a Promise
	// delegates via URI
	//********************************************************************
	removeDeviceModels( deviceVendorId, deviceModelsIds ): Observable<any> {

		// get the DeviceVendor
		this.loadHelper( deviceVendorId );


	// split on a comma with no spaces
	var idList 					= deviceModelsIds.split(',');
	var deviceModels 	= this.deviceVendor.deviceModels;

	if ( deviceModels != null && deviceModelsIds != null ) {

		// iterate over array of deviceModels ids
		deviceModels.forEach(function (obj) {
			if ( deviceModelsIds.indexOf(obj._id) > -1 ) {
				// remove the DeviceModel
				this.deviceVendor.deviceModels.pop(obj);
			}
		});

		// save it
		return this.saveHelper();
	}
}

		//********************************************************************
	// adds one or more firmwareReleasesIds as a FirmwareReleases
	// to a DeviceVendor
	// returns a Promise
	// delegates via URI
	//********************************************************************
	addFirmwareReleases( deviceVendorId, firmwareReleasesIds ): Observable<any> {

		// get the DeviceVendor
		this.loadHelper( deviceVendorId );

	// split on a comma with no spaces
	var idList = firmwareReleasesIds.split(',')

	// iterate over array of firmwareReleases ids
	idList.forEach(function (id) {
		// read the FirmwareRelease
		var firmwareRelease = new FirmwareReleaseService(this.http).getFirmwareRelease(id);
		// add the FirmwareRelease if not already assigned
		if ( this.deviceVendor.firmwareReleases.indexOf(firmwareRelease) == -1 )
		this.deviceVendor.firmwareReleases.push(firmwareRelease);
	});

	// save it
	return this.saveHelper();
}

	//********************************************************************
	// removes one or more firmwareReleasesIds as a FirmwareReleases
	// from a DeviceVendor
	// returns a Promise
	// delegates via URI
	//********************************************************************
	removeFirmwareReleases( deviceVendorId, firmwareReleasesIds ): Observable<any> {

		// get the DeviceVendor
		this.loadHelper( deviceVendorId );


	// split on a comma with no spaces
	var idList 					= firmwareReleasesIds.split(',');
	var firmwareReleases 	= this.deviceVendor.firmwareReleases;

	if ( firmwareReleases != null && firmwareReleasesIds != null ) {

		// iterate over array of firmwareReleases ids
		firmwareReleases.forEach(function (obj) {
			if ( firmwareReleasesIds.indexOf(obj._id) > -1 ) {
				// remove the FirmwareRelease
				this.deviceVendor.firmwareReleases.pop(obj);
			}
		});

		// save it
		return this.saveHelper();
	}
}

		//********************************************************************
	// adds one or more hardwareModulesIds as a HardwareModules
	// to a DeviceVendor
	// returns a Promise
	// delegates via URI
	//********************************************************************
	addHardwareModules( deviceVendorId, hardwareModulesIds ): Observable<any> {

		// get the DeviceVendor
		this.loadHelper( deviceVendorId );

	// split on a comma with no spaces
	var idList = hardwareModulesIds.split(',')

	// iterate over array of hardwareModules ids
	idList.forEach(function (id) {
		// read the HardwareModule
		var hardwareModule = new HardwareModuleService(this.http).getHardwareModule(id);
		// add the HardwareModule if not already assigned
		if ( this.deviceVendor.hardwareModules.indexOf(hardwareModule) == -1 )
		this.deviceVendor.hardwareModules.push(hardwareModule);
	});

	// save it
	return this.saveHelper();
}

	//********************************************************************
	// removes one or more hardwareModulesIds as a HardwareModules
	// from a DeviceVendor
	// returns a Promise
	// delegates via URI
	//********************************************************************
	removeHardwareModules( deviceVendorId, hardwareModulesIds ): Observable<any> {

		// get the DeviceVendor
		this.loadHelper( deviceVendorId );


	// split on a comma with no spaces
	var idList 					= hardwareModulesIds.split(',');
	var hardwareModules 	= this.deviceVendor.hardwareModules;

	if ( hardwareModules != null && hardwareModulesIds != null ) {

		// iterate over array of hardwareModules ids
		hardwareModules.forEach(function (obj) {
			if ( hardwareModulesIds.indexOf(obj._id) > -1 ) {
				// remove the HardwareModule
				this.deviceVendor.hardwareModules.pop(obj);
			}
		});

		// save it
		return this.saveHelper();
	}
}

	
	//********************************************************************
	// saveHelper - internal helper to save a DeviceVendor
	//********************************************************************
	saveHelper() : Observable<any> {

		const uri_ = this.apiUrl + '/DeviceVendor/update/' + this.deviceVendor;

	return  this.http.post(uri_, this.deviceVendor );
}

	//********************************************************************
	// loadHelper - internal helper to load a DeviceVendor
	//********************************************************************	
	loadHelper( id ) {
		this.getDeviceVendor(id)
			.subscribe((res : DeviceVendor) => {
				this.deviceVendor = res;
			});
	}
}