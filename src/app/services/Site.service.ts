
import { Injectable } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import {Site} from '../models/Site';
import {TenantService} from '../services/Tenant.service';
import {BuildingService} from '../services/Building.service';
import {IoTDeviceService} from '../services/IoTDevice.service';
import {GatewayService} from '../services/Gateway.service';
import { HelperBaseService } from './helperbase.service';

@Injectable({
	providedIn: 'root'
})

export class SiteService extends HelperBaseService {

	//********************************************************************
	// general holder 
	//********************************************************************
	site : Site;

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
	// add a Site
	// returns the results untouched as a JSON representation
	// delegates via URI
	//********************************************************************
	addSite(name, address, timezone, latitude, longitude, Tenant, Buildings, Devices, Gateways) : Observable<any> {
		const uri_ = this.apiUrl + '/Site/create';
		const obj = {
			      		name: name,
      		address: address,
      		timezone: timezone,
      		latitude: latitude,
      		longitude: longitude,
      		Tenant: Tenant != null && Tenant.length > 0 ? Tenant : null,
      		Buildings: Buildings != null && Buildings.length > 0 ? Buildings : null,
      		Devices: Devices != null && Devices.length > 0 ? Devices : null,
			Gateways: Gateways != null && Gateways.length > 0 ? Gateways : null
		};

		return this.http.post(uri_, obj);
	}

	//********************************************************************
	// update a Site
	// returns an Observable
	// delegates via URI
	//********************************************************************
		updateSite(name, address, timezone, latitude, longitude, Tenant, Buildings, Devices, Gateways, id)  :  Observable<any>  {
			const uri_ = this.apiUrl + '/Site/update/' + id;
		const obj = {
				      		name: name,
      		address: address,
      		timezone: timezone,
      		latitude: latitude,
      		longitude: longitude,
      		Tenant: Tenant != null && Tenant.length > 0 ? Tenant : null,
      		Buildings: Buildings != null && Buildings.length > 0 ? Buildings : null,
      		Devices: Devices != null && Devices.length > 0 ? Devices : null,
			Gateways: Gateways != null && Gateways.length > 0 ? Gateways : null
		};
		return this.http.post(uri_, obj);
	}

	//********************************************************************
	// delete a Site
	// returns an Observable
	// delegates via URI
	//********************************************************************
	deleteSite(id)  : Observable<any> {
		const uri_ = this.apiUrl + '/Site/delete/' + id;

		return this.http.get(uri_);
	}
	
	//********************************************************************
	// loads a Site
	// returns the results untouched as an Observable Site
	// Site model
	// delegates via URI
	//********************************************************************
	getSite(id) : Observable<Site> {
		const uri_ = this.apiUrl + '/Site/load/' + id;

		return this.http.get<Site>(uri_);
	}
	
	//********************************************************************
	// gets all Site
	// returns the results untouched as JSON representation of an
	// Observable array of Site models
	// delegates via URI
	//********************************************************************
	getSites() : Observable<Site[]> {
		const uri_ = this.apiUrl + '/Site/';

		return this
			.http.get<Site[]>(uri_);
	}
	
		
	//********************************************************************
	// assigns a Tenant on a Site
	// returns an Observable
	// delegates via URI
	//********************************************************************
	assignTenant( siteId, _tenantId ): Observable<any> {

		// get the Site from storage
		this.loadHelper( siteId );

	// get the Tenant from storage
	var tmp 	= new TenantService(this.http).getTenant(_tenantId);

	// assign the Tenant
	this.site.tenant = tmp;

	// save the Site
	return this.saveHelper();
}

	//********************************************************************
	// unassigns a Tenant on a Site
	// returns an Observable
	// delegates via URI
	//********************************************************************
	unassignTenant( siteId ): Observable<any> {

		// get the Site from storage
		this.loadHelper( siteId );

	// assign Tenant to null
	this.site.tenant = null;

	// save the Site
	return this.saveHelper();
}

	
		//********************************************************************
	// adds one or more buildingsIds as a Buildings
	// to a Site
	// returns a Promise
	// delegates via URI
	//********************************************************************
	addBuildings( siteId, buildingsIds ): Observable<any> {

		// get the Site
		this.loadHelper( siteId );

	// split on a comma with no spaces
	var idList = buildingsIds.split(',')

	// iterate over array of buildings ids
	idList.forEach(function (id) {
		// read the Building
		var building = new BuildingService(this.http).getBuilding(id);
		// add the Building if not already assigned
		if ( this.site.buildings.indexOf(building) == -1 )
		this.site.buildings.push(building);
	});

	// save it
	return this.saveHelper();
}

	//********************************************************************
	// removes one or more buildingsIds as a Buildings
	// from a Site
	// returns a Promise
	// delegates via URI
	//********************************************************************
	removeBuildings( siteId, buildingsIds ): Observable<any> {

		// get the Site
		this.loadHelper( siteId );


	// split on a comma with no spaces
	var idList 					= buildingsIds.split(',');
	var buildings 	= this.site.buildings;

	if ( buildings != null && buildingsIds != null ) {

		// iterate over array of buildings ids
		buildings.forEach(function (obj) {
			if ( buildingsIds.indexOf(obj._id) > -1 ) {
				// remove the Building
				this.site.buildings.pop(obj);
			}
		});

		// save it
		return this.saveHelper();
	}
}

		//********************************************************************
	// adds one or more devicesIds as a Devices
	// to a Site
	// returns a Promise
	// delegates via URI
	//********************************************************************
	addDevices( siteId, devicesIds ): Observable<any> {

		// get the Site
		this.loadHelper( siteId );

	// split on a comma with no spaces
	var idList = devicesIds.split(',')

	// iterate over array of devices ids
	idList.forEach(function (id) {
		// read the IoTDevice
		var ioTDevice = new IoTDeviceService(this.http).getIoTDevice(id);
		// add the IoTDevice if not already assigned
		if ( this.site.devices.indexOf(ioTDevice) == -1 )
		this.site.devices.push(ioTDevice);
	});

	// save it
	return this.saveHelper();
}

	//********************************************************************
	// removes one or more devicesIds as a Devices
	// from a Site
	// returns a Promise
	// delegates via URI
	//********************************************************************
	removeDevices( siteId, devicesIds ): Observable<any> {

		// get the Site
		this.loadHelper( siteId );


	// split on a comma with no spaces
	var idList 					= devicesIds.split(',');
	var devices 	= this.site.devices;

	if ( devices != null && devicesIds != null ) {

		// iterate over array of devices ids
		devices.forEach(function (obj) {
			if ( devicesIds.indexOf(obj._id) > -1 ) {
				// remove the IoTDevice
				this.site.devices.pop(obj);
			}
		});

		// save it
		return this.saveHelper();
	}
}

		//********************************************************************
	// adds one or more gatewaysIds as a Gateways
	// to a Site
	// returns a Promise
	// delegates via URI
	//********************************************************************
	addGateways( siteId, gatewaysIds ): Observable<any> {

		// get the Site
		this.loadHelper( siteId );

	// split on a comma with no spaces
	var idList = gatewaysIds.split(',')

	// iterate over array of gateways ids
	idList.forEach(function (id) {
		// read the Gateway
		var gateway = new GatewayService(this.http).getGateway(id);
		// add the Gateway if not already assigned
		if ( this.site.gateways.indexOf(gateway) == -1 )
		this.site.gateways.push(gateway);
	});

	// save it
	return this.saveHelper();
}

	//********************************************************************
	// removes one or more gatewaysIds as a Gateways
	// from a Site
	// returns a Promise
	// delegates via URI
	//********************************************************************
	removeGateways( siteId, gatewaysIds ): Observable<any> {

		// get the Site
		this.loadHelper( siteId );


	// split on a comma with no spaces
	var idList 					= gatewaysIds.split(',');
	var gateways 	= this.site.gateways;

	if ( gateways != null && gatewaysIds != null ) {

		// iterate over array of gateways ids
		gateways.forEach(function (obj) {
			if ( gatewaysIds.indexOf(obj._id) > -1 ) {
				// remove the Gateway
				this.site.gateways.pop(obj);
			}
		});

		// save it
		return this.saveHelper();
	}
}

	
	//********************************************************************
	// saveHelper - internal helper to save a Site
	//********************************************************************
	saveHelper() : Observable<any> {

		const uri_ = this.apiUrl + '/Site/update/' + this.site;

	return  this.http.post(uri_, this.site );
}

	//********************************************************************
	// loadHelper - internal helper to load a Site
	//********************************************************************	
	loadHelper( id ) {
		this.getSite(id)
			.subscribe((res : Site) => {
				this.site = res;
			});
	}
}