
import { Injectable } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import {DigitalTwin} from '../models/DigitalTwin';
import {IoTDeviceService} from '../services/IoTDevice.service';
import {GatewayService} from '../services/Gateway.service';
import {TwinTemplateService} from '../services/TwinTemplate.service';
import {TwinChangeEventService} from '../services/TwinChangeEvent.service';
import { HelperBaseService } from './helperbase.service';

@Injectable({
	providedIn: 'root'
})

export class DigitalTwinService extends HelperBaseService {

	//********************************************************************
	// general holder 
	//********************************************************************
	digitalTwin : DigitalTwin;

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
	// add a DigitalTwin
	// returns the results untouched as a JSON representation
	// delegates via URI
	//********************************************************************
	addDigitalTwin(twinId, desiredStateVersion, reportedStateVersion, lastSyncAt, Device, Gateway, Template, ChangeEvents) : Observable<any> {
		const uri_ = this.apiUrl + '/DigitalTwin/create';
		const obj = {
			      		twinId: twinId,
      		desiredStateVersion: desiredStateVersion,
      		reportedStateVersion: reportedStateVersion,
      		lastSyncAt: lastSyncAt,
      		Device: Device != null && Device.length > 0 ? Device : null,
      		Gateway: Gateway != null && Gateway.length > 0 ? Gateway : null,
      		Template: Template != null && Template.length > 0 ? Template : null,
			ChangeEvents: ChangeEvents != null && ChangeEvents.length > 0 ? ChangeEvents : null
		};

		return this.http.post(uri_, obj);
	}

	//********************************************************************
	// update a DigitalTwin
	// returns an Observable
	// delegates via URI
	//********************************************************************
		updateDigitalTwin(twinId, desiredStateVersion, reportedStateVersion, lastSyncAt, Device, Gateway, Template, ChangeEvents, id)  :  Observable<any>  {
			const uri_ = this.apiUrl + '/DigitalTwin/update/' + id;
		const obj = {
				      		twinId: twinId,
      		desiredStateVersion: desiredStateVersion,
      		reportedStateVersion: reportedStateVersion,
      		lastSyncAt: lastSyncAt,
      		Device: Device != null && Device.length > 0 ? Device : null,
      		Gateway: Gateway != null && Gateway.length > 0 ? Gateway : null,
      		Template: Template != null && Template.length > 0 ? Template : null,
			ChangeEvents: ChangeEvents != null && ChangeEvents.length > 0 ? ChangeEvents : null
		};
		return this.http.post(uri_, obj);
	}

	//********************************************************************
	// delete a DigitalTwin
	// returns an Observable
	// delegates via URI
	//********************************************************************
	deleteDigitalTwin(id)  : Observable<any> {
		const uri_ = this.apiUrl + '/DigitalTwin/delete/' + id;

		return this.http.get(uri_);
	}
	
	//********************************************************************
	// loads a DigitalTwin
	// returns the results untouched as an Observable DigitalTwin
	// DigitalTwin model
	// delegates via URI
	//********************************************************************
	getDigitalTwin(id) : Observable<DigitalTwin> {
		const uri_ = this.apiUrl + '/DigitalTwin/load/' + id;

		return this.http.get<DigitalTwin>(uri_);
	}
	
	//********************************************************************
	// gets all DigitalTwin
	// returns the results untouched as JSON representation of an
	// Observable array of DigitalTwin models
	// delegates via URI
	//********************************************************************
	getDigitalTwins() : Observable<DigitalTwin[]> {
		const uri_ = this.apiUrl + '/DigitalTwin/';

		return this
			.http.get<DigitalTwin[]>(uri_);
	}
	
		
	//********************************************************************
	// assigns a Device on a DigitalTwin
	// returns an Observable
	// delegates via URI
	//********************************************************************
	assignDevice( digitalTwinId, _deviceId ): Observable<any> {

		// get the DigitalTwin from storage
		this.loadHelper( digitalTwinId );

	// get the IoTDevice from storage
	var tmp 	= new IoTDeviceService(this.http).getIoTDevice(_deviceId);

	// assign the Device
	this.digitalTwin.device = tmp;

	// save the DigitalTwin
	return this.saveHelper();
}

	//********************************************************************
	// unassigns a Device on a DigitalTwin
	// returns an Observable
	// delegates via URI
	//********************************************************************
	unassignDevice( digitalTwinId ): Observable<any> {

		// get the DigitalTwin from storage
		this.loadHelper( digitalTwinId );

	// assign Device to null
	this.digitalTwin.device = null;

	// save the DigitalTwin
	return this.saveHelper();
}

	
	//********************************************************************
	// assigns a Gateway on a DigitalTwin
	// returns an Observable
	// delegates via URI
	//********************************************************************
	assignGateway( digitalTwinId, _gatewayId ): Observable<any> {

		// get the DigitalTwin from storage
		this.loadHelper( digitalTwinId );

	// get the Gateway from storage
	var tmp 	= new GatewayService(this.http).getGateway(_gatewayId);

	// assign the Gateway
	this.digitalTwin.gateway = tmp;

	// save the DigitalTwin
	return this.saveHelper();
}

	//********************************************************************
	// unassigns a Gateway on a DigitalTwin
	// returns an Observable
	// delegates via URI
	//********************************************************************
	unassignGateway( digitalTwinId ): Observable<any> {

		// get the DigitalTwin from storage
		this.loadHelper( digitalTwinId );

	// assign Gateway to null
	this.digitalTwin.gateway = null;

	// save the DigitalTwin
	return this.saveHelper();
}

	
	//********************************************************************
	// assigns a Template on a DigitalTwin
	// returns an Observable
	// delegates via URI
	//********************************************************************
	assignTemplate( digitalTwinId, _templateId ): Observable<any> {

		// get the DigitalTwin from storage
		this.loadHelper( digitalTwinId );

	// get the TwinTemplate from storage
	var tmp 	= new TwinTemplateService(this.http).getTwinTemplate(_templateId);

	// assign the Template
	this.digitalTwin.template = tmp;

	// save the DigitalTwin
	return this.saveHelper();
}

	//********************************************************************
	// unassigns a Template on a DigitalTwin
	// returns an Observable
	// delegates via URI
	//********************************************************************
	unassignTemplate( digitalTwinId ): Observable<any> {

		// get the DigitalTwin from storage
		this.loadHelper( digitalTwinId );

	// assign Template to null
	this.digitalTwin.template = null;

	// save the DigitalTwin
	return this.saveHelper();
}

	
		//********************************************************************
	// adds one or more changeEventsIds as a ChangeEvents
	// to a DigitalTwin
	// returns a Promise
	// delegates via URI
	//********************************************************************
	addChangeEvents( digitalTwinId, changeEventsIds ): Observable<any> {

		// get the DigitalTwin
		this.loadHelper( digitalTwinId );

	// split on a comma with no spaces
	var idList = changeEventsIds.split(',')

	// iterate over array of changeEvents ids
	idList.forEach(function (id) {
		// read the TwinChangeEvent
		var twinChangeEvent = new TwinChangeEventService(this.http).getTwinChangeEvent(id);
		// add the TwinChangeEvent if not already assigned
		if ( this.digitalTwin.changeEvents.indexOf(twinChangeEvent) == -1 )
		this.digitalTwin.changeEvents.push(twinChangeEvent);
	});

	// save it
	return this.saveHelper();
}

	//********************************************************************
	// removes one or more changeEventsIds as a ChangeEvents
	// from a DigitalTwin
	// returns a Promise
	// delegates via URI
	//********************************************************************
	removeChangeEvents( digitalTwinId, changeEventsIds ): Observable<any> {

		// get the DigitalTwin
		this.loadHelper( digitalTwinId );


	// split on a comma with no spaces
	var idList 					= changeEventsIds.split(',');
	var changeEvents 	= this.digitalTwin.changeEvents;

	if ( changeEvents != null && changeEventsIds != null ) {

		// iterate over array of changeEvents ids
		changeEvents.forEach(function (obj) {
			if ( changeEventsIds.indexOf(obj._id) > -1 ) {
				// remove the TwinChangeEvent
				this.digitalTwin.changeEvents.pop(obj);
			}
		});

		// save it
		return this.saveHelper();
	}
}

	
	//********************************************************************
	// saveHelper - internal helper to save a DigitalTwin
	//********************************************************************
	saveHelper() : Observable<any> {

		const uri_ = this.apiUrl + '/DigitalTwin/update/' + this.digitalTwin;

	return  this.http.post(uri_, this.digitalTwin );
}

	//********************************************************************
	// loadHelper - internal helper to load a DigitalTwin
	//********************************************************************	
	loadHelper( id ) {
		this.getDigitalTwin(id)
			.subscribe((res : DigitalTwin) => {
				this.digitalTwin = res;
			});
	}
}