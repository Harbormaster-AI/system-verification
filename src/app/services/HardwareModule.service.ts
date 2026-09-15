
import { Injectable } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import {HardwareModule} from '../models/HardwareModule';
import {DeviceVendorService} from '../services/DeviceVendor.service';
import { HelperBaseService } from './helperbase.service';

@Injectable({
	providedIn: 'root'
})

export class HardwareModuleService extends HelperBaseService {

	//********************************************************************
	// general holder 
	//********************************************************************
	hardwareModule : HardwareModule;

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
	// add a HardwareModule
	// returns the results untouched as a JSON representation
	// delegates via URI
	//********************************************************************
	addHardwareModule(moduleCode, datasheetUri, Vendor, ModuleType) : Observable<any> {
		const uri_ = this.apiUrl + '/HardwareModule/create';
		const obj = {
			      		moduleCode: moduleCode,
      		datasheetUri: datasheetUri,
      		Vendor: Vendor != null && Vendor.length > 0 ? Vendor : null,
			ModuleType: ModuleType
		};

		return this.http.post(uri_, obj);
	}

	//********************************************************************
	// update a HardwareModule
	// returns an Observable
	// delegates via URI
	//********************************************************************
		updateHardwareModule(moduleCode, datasheetUri, Vendor, ModuleType, id)  :  Observable<any>  {
			const uri_ = this.apiUrl + '/HardwareModule/update/' + id;
		const obj = {
				      		moduleCode: moduleCode,
      		datasheetUri: datasheetUri,
      		Vendor: Vendor != null && Vendor.length > 0 ? Vendor : null,
			ModuleType: ModuleType
		};
		return this.http.post(uri_, obj);
	}

	//********************************************************************
	// delete a HardwareModule
	// returns an Observable
	// delegates via URI
	//********************************************************************
	deleteHardwareModule(id)  : Observable<any> {
		const uri_ = this.apiUrl + '/HardwareModule/delete/' + id;

		return this.http.get(uri_);
	}
	
	//********************************************************************
	// loads a HardwareModule
	// returns the results untouched as an Observable HardwareModule
	// HardwareModule model
	// delegates via URI
	//********************************************************************
	getHardwareModule(id) : Observable<HardwareModule> {
		const uri_ = this.apiUrl + '/HardwareModule/load/' + id;

		return this.http.get<HardwareModule>(uri_);
	}
	
	//********************************************************************
	// gets all HardwareModule
	// returns the results untouched as JSON representation of an
	// Observable array of HardwareModule models
	// delegates via URI
	//********************************************************************
	getHardwareModules() : Observable<HardwareModule[]> {
		const uri_ = this.apiUrl + '/HardwareModule/';

		return this
			.http.get<HardwareModule[]>(uri_);
	}
	
		
	//********************************************************************
	// assigns a Vendor on a HardwareModule
	// returns an Observable
	// delegates via URI
	//********************************************************************
	assignVendor( hardwareModuleId, _vendorId ): Observable<any> {

		// get the HardwareModule from storage
		this.loadHelper( hardwareModuleId );

	// get the DeviceVendor from storage
	var tmp 	= new DeviceVendorService(this.http).getDeviceVendor(_vendorId);

	// assign the Vendor
	this.hardwareModule.vendor = tmp;

	// save the HardwareModule
	return this.saveHelper();
}

	//********************************************************************
	// unassigns a Vendor on a HardwareModule
	// returns an Observable
	// delegates via URI
	//********************************************************************
	unassignVendor( hardwareModuleId ): Observable<any> {

		// get the HardwareModule from storage
		this.loadHelper( hardwareModuleId );

	// assign Vendor to null
	this.hardwareModule.vendor = null;

	// save the HardwareModule
	return this.saveHelper();
}

	
	
	//********************************************************************
	// saveHelper - internal helper to save a HardwareModule
	//********************************************************************
	saveHelper() : Observable<any> {

		const uri_ = this.apiUrl + '/HardwareModule/update/' + this.hardwareModule;

	return  this.http.post(uri_, this.hardwareModule );
}

	//********************************************************************
	// loadHelper - internal helper to load a HardwareModule
	//********************************************************************	
	loadHelper( id ) {
		this.getHardwareModule(id)
			.subscribe((res : HardwareModule) => {
				this.hardwareModule = res;
			});
	}
}