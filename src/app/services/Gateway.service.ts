
import { Injectable } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import {Gateway} from '../models/Gateway';
import {SiteService} from '../services/Site.service';
import {RoomService} from '../services/Room.service';
import {IoTDeviceService} from '../services/IoTDevice.service';
import {EdgeApplicationService} from '../services/EdgeApplication.service';
import {DeviceCertificateService} from '../services/DeviceCertificate.service';
import {DigitalTwinService} from '../services/DigitalTwin.service';
import {NetworkProfileService} from '../services/NetworkProfile.service';
import { HelperBaseService } from './helperbase.service';

@Injectable({
	providedIn: 'root'
})

export class GatewayService extends HelperBaseService {

	//********************************************************************
	// general holder 
	//********************************************************************
	gateway : Gateway;

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
	// add a Gateway
	// returns the results untouched as a JSON representation
	// delegates via URI
	//********************************************************************
	addGateway(softwareVersion, Site, Room, Devices, EdgeApplications, Certificates, DigitalTwin, NetworkProfiles, Status) : Observable<any> {
		const uri_ = this.apiUrl + '/Gateway/create';
		const obj = {
			      		softwareVersion: softwareVersion,
      		Site: Site != null && Site.length > 0 ? Site : null,
      		Room: Room != null && Room.length > 0 ? Room : null,
      		Devices: Devices != null && Devices.length > 0 ? Devices : null,
      		EdgeApplications: EdgeApplications != null && EdgeApplications.length > 0 ? EdgeApplications : null,
      		Certificates: Certificates != null && Certificates.length > 0 ? Certificates : null,
      		DigitalTwin: DigitalTwin != null && DigitalTwin.length > 0 ? DigitalTwin : null,
      		NetworkProfiles: NetworkProfiles != null && NetworkProfiles.length > 0 ? NetworkProfiles : null,
			Status: Status
		};

		return this.http.post(uri_, obj);
	}

	//********************************************************************
	// update a Gateway
	// returns an Observable
	// delegates via URI
	//********************************************************************
		updateGateway(softwareVersion, Site, Room, Devices, EdgeApplications, Certificates, DigitalTwin, NetworkProfiles, Status, id)  :  Observable<any>  {
			const uri_ = this.apiUrl + '/Gateway/update/' + id;
		const obj = {
				      		softwareVersion: softwareVersion,
      		Site: Site != null && Site.length > 0 ? Site : null,
      		Room: Room != null && Room.length > 0 ? Room : null,
      		Devices: Devices != null && Devices.length > 0 ? Devices : null,
      		EdgeApplications: EdgeApplications != null && EdgeApplications.length > 0 ? EdgeApplications : null,
      		Certificates: Certificates != null && Certificates.length > 0 ? Certificates : null,
      		DigitalTwin: DigitalTwin != null && DigitalTwin.length > 0 ? DigitalTwin : null,
      		NetworkProfiles: NetworkProfiles != null && NetworkProfiles.length > 0 ? NetworkProfiles : null,
			Status: Status
		};
		return this.http.post(uri_, obj);
	}

	//********************************************************************
	// delete a Gateway
	// returns an Observable
	// delegates via URI
	//********************************************************************
	deleteGateway(id)  : Observable<any> {
		const uri_ = this.apiUrl + '/Gateway/delete/' + id;

		return this.http.get(uri_);
	}
	
	//********************************************************************
	// loads a Gateway
	// returns the results untouched as an Observable Gateway
	// Gateway model
	// delegates via URI
	//********************************************************************
	getGateway(id) : Observable<Gateway> {
		const uri_ = this.apiUrl + '/Gateway/load/' + id;

		return this.http.get<Gateway>(uri_);
	}
	
	//********************************************************************
	// gets all Gateway
	// returns the results untouched as JSON representation of an
	// Observable array of Gateway models
	// delegates via URI
	//********************************************************************
	getGateways() : Observable<Gateway[]> {
		const uri_ = this.apiUrl + '/Gateway/';

		return this
			.http.get<Gateway[]>(uri_);
	}
	
		
	//********************************************************************
	// assigns a Site on a Gateway
	// returns an Observable
	// delegates via URI
	//********************************************************************
	assignSite( gatewayId, _siteId ): Observable<any> {

		// get the Gateway from storage
		this.loadHelper( gatewayId );

	// get the Site from storage
	var tmp 	= new SiteService(this.http).getSite(_siteId);

	// assign the Site
	this.gateway.site = tmp;

	// save the Gateway
	return this.saveHelper();
}

	//********************************************************************
	// unassigns a Site on a Gateway
	// returns an Observable
	// delegates via URI
	//********************************************************************
	unassignSite( gatewayId ): Observable<any> {

		// get the Gateway from storage
		this.loadHelper( gatewayId );

	// assign Site to null
	this.gateway.site = null;

	// save the Gateway
	return this.saveHelper();
}

	
	//********************************************************************
	// assigns a Room on a Gateway
	// returns an Observable
	// delegates via URI
	//********************************************************************
	assignRoom( gatewayId, _roomId ): Observable<any> {

		// get the Gateway from storage
		this.loadHelper( gatewayId );

	// get the Room from storage
	var tmp 	= new RoomService(this.http).getRoom(_roomId);

	// assign the Room
	this.gateway.room = tmp;

	// save the Gateway
	return this.saveHelper();
}

	//********************************************************************
	// unassigns a Room on a Gateway
	// returns an Observable
	// delegates via URI
	//********************************************************************
	unassignRoom( gatewayId ): Observable<any> {

		// get the Gateway from storage
		this.loadHelper( gatewayId );

	// assign Room to null
	this.gateway.room = null;

	// save the Gateway
	return this.saveHelper();
}

	
	//********************************************************************
	// assigns a DigitalTwin on a Gateway
	// returns an Observable
	// delegates via URI
	//********************************************************************
	assignDigitalTwin( gatewayId, _digitalTwinId ): Observable<any> {

		// get the Gateway from storage
		this.loadHelper( gatewayId );

	// get the DigitalTwin from storage
	var tmp 	= new DigitalTwinService(this.http).getDigitalTwin(_digitalTwinId);

	// assign the DigitalTwin
	this.gateway.digitalTwin = tmp;

	// save the Gateway
	return this.saveHelper();
}

	//********************************************************************
	// unassigns a DigitalTwin on a Gateway
	// returns an Observable
	// delegates via URI
	//********************************************************************
	unassignDigitalTwin( gatewayId ): Observable<any> {

		// get the Gateway from storage
		this.loadHelper( gatewayId );

	// assign DigitalTwin to null
	this.gateway.digitalTwin = null;

	// save the Gateway
	return this.saveHelper();
}

	
		//********************************************************************
	// adds one or more devicesIds as a Devices
	// to a Gateway
	// returns a Promise
	// delegates via URI
	//********************************************************************
	addDevices( gatewayId, devicesIds ): Observable<any> {

		// get the Gateway
		this.loadHelper( gatewayId );

	// split on a comma with no spaces
	var idList = devicesIds.split(',')

	// iterate over array of devices ids
	idList.forEach(function (id) {
		// read the IoTDevice
		var ioTDevice = new IoTDeviceService(this.http).getIoTDevice(id);
		// add the IoTDevice if not already assigned
		if ( this.gateway.devices.indexOf(ioTDevice) == -1 )
		this.gateway.devices.push(ioTDevice);
	});

	// save it
	return this.saveHelper();
}

	//********************************************************************
	// removes one or more devicesIds as a Devices
	// from a Gateway
	// returns a Promise
	// delegates via URI
	//********************************************************************
	removeDevices( gatewayId, devicesIds ): Observable<any> {

		// get the Gateway
		this.loadHelper( gatewayId );


	// split on a comma with no spaces
	var idList 					= devicesIds.split(',');
	var devices 	= this.gateway.devices;

	if ( devices != null && devicesIds != null ) {

		// iterate over array of devices ids
		devices.forEach(function (obj) {
			if ( devicesIds.indexOf(obj._id) > -1 ) {
				// remove the IoTDevice
				this.gateway.devices.pop(obj);
			}
		});

		// save it
		return this.saveHelper();
	}
}

		//********************************************************************
	// adds one or more edgeApplicationsIds as a EdgeApplications
	// to a Gateway
	// returns a Promise
	// delegates via URI
	//********************************************************************
	addEdgeApplications( gatewayId, edgeApplicationsIds ): Observable<any> {

		// get the Gateway
		this.loadHelper( gatewayId );

	// split on a comma with no spaces
	var idList = edgeApplicationsIds.split(',')

	// iterate over array of edgeApplications ids
	idList.forEach(function (id) {
		// read the EdgeApplication
		var edgeApplication = new EdgeApplicationService(this.http).getEdgeApplication(id);
		// add the EdgeApplication if not already assigned
		if ( this.gateway.edgeApplications.indexOf(edgeApplication) == -1 )
		this.gateway.edgeApplications.push(edgeApplication);
	});

	// save it
	return this.saveHelper();
}

	//********************************************************************
	// removes one or more edgeApplicationsIds as a EdgeApplications
	// from a Gateway
	// returns a Promise
	// delegates via URI
	//********************************************************************
	removeEdgeApplications( gatewayId, edgeApplicationsIds ): Observable<any> {

		// get the Gateway
		this.loadHelper( gatewayId );


	// split on a comma with no spaces
	var idList 					= edgeApplicationsIds.split(',');
	var edgeApplications 	= this.gateway.edgeApplications;

	if ( edgeApplications != null && edgeApplicationsIds != null ) {

		// iterate over array of edgeApplications ids
		edgeApplications.forEach(function (obj) {
			if ( edgeApplicationsIds.indexOf(obj._id) > -1 ) {
				// remove the EdgeApplication
				this.gateway.edgeApplications.pop(obj);
			}
		});

		// save it
		return this.saveHelper();
	}
}

		//********************************************************************
	// adds one or more certificatesIds as a Certificates
	// to a Gateway
	// returns a Promise
	// delegates via URI
	//********************************************************************
	addCertificates( gatewayId, certificatesIds ): Observable<any> {

		// get the Gateway
		this.loadHelper( gatewayId );

	// split on a comma with no spaces
	var idList = certificatesIds.split(',')

	// iterate over array of certificates ids
	idList.forEach(function (id) {
		// read the DeviceCertificate
		var deviceCertificate = new DeviceCertificateService(this.http).getDeviceCertificate(id);
		// add the DeviceCertificate if not already assigned
		if ( this.gateway.certificates.indexOf(deviceCertificate) == -1 )
		this.gateway.certificates.push(deviceCertificate);
	});

	// save it
	return this.saveHelper();
}

	//********************************************************************
	// removes one or more certificatesIds as a Certificates
	// from a Gateway
	// returns a Promise
	// delegates via URI
	//********************************************************************
	removeCertificates( gatewayId, certificatesIds ): Observable<any> {

		// get the Gateway
		this.loadHelper( gatewayId );


	// split on a comma with no spaces
	var idList 					= certificatesIds.split(',');
	var certificates 	= this.gateway.certificates;

	if ( certificates != null && certificatesIds != null ) {

		// iterate over array of certificates ids
		certificates.forEach(function (obj) {
			if ( certificatesIds.indexOf(obj._id) > -1 ) {
				// remove the DeviceCertificate
				this.gateway.certificates.pop(obj);
			}
		});

		// save it
		return this.saveHelper();
	}
}

		//********************************************************************
	// adds one or more networkProfilesIds as a NetworkProfiles
	// to a Gateway
	// returns a Promise
	// delegates via URI
	//********************************************************************
	addNetworkProfiles( gatewayId, networkProfilesIds ): Observable<any> {

		// get the Gateway
		this.loadHelper( gatewayId );

	// split on a comma with no spaces
	var idList = networkProfilesIds.split(',')

	// iterate over array of networkProfiles ids
	idList.forEach(function (id) {
		// read the NetworkProfile
		var networkProfile = new NetworkProfileService(this.http).getNetworkProfile(id);
		// add the NetworkProfile if not already assigned
		if ( this.gateway.networkProfiles.indexOf(networkProfile) == -1 )
		this.gateway.networkProfiles.push(networkProfile);
	});

	// save it
	return this.saveHelper();
}

	//********************************************************************
	// removes one or more networkProfilesIds as a NetworkProfiles
	// from a Gateway
	// returns a Promise
	// delegates via URI
	//********************************************************************
	removeNetworkProfiles( gatewayId, networkProfilesIds ): Observable<any> {

		// get the Gateway
		this.loadHelper( gatewayId );


	// split on a comma with no spaces
	var idList 					= networkProfilesIds.split(',');
	var networkProfiles 	= this.gateway.networkProfiles;

	if ( networkProfiles != null && networkProfilesIds != null ) {

		// iterate over array of networkProfiles ids
		networkProfiles.forEach(function (obj) {
			if ( networkProfilesIds.indexOf(obj._id) > -1 ) {
				// remove the NetworkProfile
				this.gateway.networkProfiles.pop(obj);
			}
		});

		// save it
		return this.saveHelper();
	}
}

	
	//********************************************************************
	// saveHelper - internal helper to save a Gateway
	//********************************************************************
	saveHelper() : Observable<any> {

		const uri_ = this.apiUrl + '/Gateway/update/' + this.gateway;

	return  this.http.post(uri_, this.gateway );
}

	//********************************************************************
	// loadHelper - internal helper to load a Gateway
	//********************************************************************	
	loadHelper( id ) {
		this.getGateway(id)
			.subscribe((res : Gateway) => {
				this.gateway = res;
			});
	}
}