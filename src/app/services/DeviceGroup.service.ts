
import { Injectable } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import {DeviceGroup} from '../models/DeviceGroup';
import {TenantService} from '../services/Tenant.service';
import {IoTDeviceService} from '../services/IoTDevice.service';
import { HelperBaseService } from './helperbase.service';

@Injectable({
	providedIn: 'root'
})

export class DeviceGroupService extends HelperBaseService {

	//********************************************************************
	// general holder 
	//********************************************************************
	deviceGroup : DeviceGroup;

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
	// add a DeviceGroup
	// returns the results untouched as a JSON representation
	// delegates via URI
	//********************************************************************
	addDeviceGroup(name, criteria, Tenant, Devices) : Observable<any> {
		const uri_ = this.apiUrl + '/DeviceGroup/create';
		const obj = {
			      		name: name,
      		criteria: criteria,
      		Tenant: Tenant != null && Tenant.length > 0 ? Tenant : null,
			Devices: Devices != null && Devices.length > 0 ? Devices : null
		};

		return this.http.post(uri_, obj);
	}

	//********************************************************************
	// update a DeviceGroup
	// returns an Observable
	// delegates via URI
	//********************************************************************
		updateDeviceGroup(name, criteria, Tenant, Devices, id)  :  Observable<any>  {
			const uri_ = this.apiUrl + '/DeviceGroup/update/' + id;
		const obj = {
				      		name: name,
      		criteria: criteria,
      		Tenant: Tenant != null && Tenant.length > 0 ? Tenant : null,
			Devices: Devices != null && Devices.length > 0 ? Devices : null
		};
		return this.http.post(uri_, obj);
	}

	//********************************************************************
	// delete a DeviceGroup
	// returns an Observable
	// delegates via URI
	//********************************************************************
	deleteDeviceGroup(id)  : Observable<any> {
		const uri_ = this.apiUrl + '/DeviceGroup/delete/' + id;

		return this.http.get(uri_);
	}
	
	//********************************************************************
	// loads a DeviceGroup
	// returns the results untouched as an Observable DeviceGroup
	// DeviceGroup model
	// delegates via URI
	//********************************************************************
	getDeviceGroup(id) : Observable<DeviceGroup> {
		const uri_ = this.apiUrl + '/DeviceGroup/load/' + id;

		return this.http.get<DeviceGroup>(uri_);
	}
	
	//********************************************************************
	// gets all DeviceGroup
	// returns the results untouched as JSON representation of an
	// Observable array of DeviceGroup models
	// delegates via URI
	//********************************************************************
	getDeviceGroups() : Observable<DeviceGroup[]> {
		const uri_ = this.apiUrl + '/DeviceGroup/';

		return this
			.http.get<DeviceGroup[]>(uri_);
	}
	
		
	//********************************************************************
	// assigns a Tenant on a DeviceGroup
	// returns an Observable
	// delegates via URI
	//********************************************************************
	assignTenant( deviceGroupId, _tenantId ): Observable<any> {

		// get the DeviceGroup from storage
		this.loadHelper( deviceGroupId );

	// get the Tenant from storage
	var tmp 	= new TenantService(this.http).getTenant(_tenantId);

	// assign the Tenant
	this.deviceGroup.tenant = tmp;

	// save the DeviceGroup
	return this.saveHelper();
}

	//********************************************************************
	// unassigns a Tenant on a DeviceGroup
	// returns an Observable
	// delegates via URI
	//********************************************************************
	unassignTenant( deviceGroupId ): Observable<any> {

		// get the DeviceGroup from storage
		this.loadHelper( deviceGroupId );

	// assign Tenant to null
	this.deviceGroup.tenant = null;

	// save the DeviceGroup
	return this.saveHelper();
}

	
		//********************************************************************
	// adds one or more devicesIds as a Devices
	// to a DeviceGroup
	// returns a Promise
	// delegates via URI
	//********************************************************************
	addDevices( deviceGroupId, devicesIds ): Observable<any> {

		// get the DeviceGroup
		this.loadHelper( deviceGroupId );

	// split on a comma with no spaces
	var idList = devicesIds.split(',')

	// iterate over array of devices ids
	idList.forEach(function (id) {
		// read the IoTDevice
		var ioTDevice = new IoTDeviceService(this.http).getIoTDevice(id);
		// add the IoTDevice if not already assigned
		if ( this.deviceGroup.devices.indexOf(ioTDevice) == -1 )
		this.deviceGroup.devices.push(ioTDevice);
	});

	// save it
	return this.saveHelper();
}

	//********************************************************************
	// removes one or more devicesIds as a Devices
	// from a DeviceGroup
	// returns a Promise
	// delegates via URI
	//********************************************************************
	removeDevices( deviceGroupId, devicesIds ): Observable<any> {

		// get the DeviceGroup
		this.loadHelper( deviceGroupId );


	// split on a comma with no spaces
	var idList 					= devicesIds.split(',');
	var devices 	= this.deviceGroup.devices;

	if ( devices != null && devicesIds != null ) {

		// iterate over array of devices ids
		devices.forEach(function (obj) {
			if ( devicesIds.indexOf(obj._id) > -1 ) {
				// remove the IoTDevice
				this.deviceGroup.devices.pop(obj);
			}
		});

		// save it
		return this.saveHelper();
	}
}

	
	//********************************************************************
	// saveHelper - internal helper to save a DeviceGroup
	//********************************************************************
	saveHelper() : Observable<any> {

		const uri_ = this.apiUrl + '/DeviceGroup/update/' + this.deviceGroup;

	return  this.http.post(uri_, this.deviceGroup );
}

	//********************************************************************
	// loadHelper - internal helper to load a DeviceGroup
	//********************************************************************	
	loadHelper( id ) {
		this.getDeviceGroup(id)
			.subscribe((res : DeviceGroup) => {
				this.deviceGroup = res;
			});
	}
}