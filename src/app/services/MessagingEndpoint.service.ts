
import { Injectable } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import {MessagingEndpoint} from '../models/MessagingEndpoint';
import {TenantService} from '../services/Tenant.service';
import {TelemetryStreamService} from '../services/TelemetryStream.service';
import { HelperBaseService } from './helperbase.service';

@Injectable({
	providedIn: 'root'
})

export class MessagingEndpointService extends HelperBaseService {

	//********************************************************************
	// general holder 
	//********************************************************************
	messagingEndpoint : MessagingEndpoint;

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
	// add a MessagingEndpoint
	// returns the results untouched as a JSON representation
	// delegates via URI
	//********************************************************************
	addMessagingEndpoint(host, port, secure, Tenant, Streams, Protocol) : Observable<any> {
		const uri_ = this.apiUrl + '/MessagingEndpoint/create';
		const obj = {
			      		host: host,
      		port: port,
      		secure: secure,
      		Tenant: Tenant != null && Tenant.length > 0 ? Tenant : null,
      		Streams: Streams != null && Streams.length > 0 ? Streams : null,
			Protocol: Protocol
		};

		return this.http.post(uri_, obj);
	}

	//********************************************************************
	// update a MessagingEndpoint
	// returns an Observable
	// delegates via URI
	//********************************************************************
		updateMessagingEndpoint(host, port, secure, Tenant, Streams, Protocol, id)  :  Observable<any>  {
			const uri_ = this.apiUrl + '/MessagingEndpoint/update/' + id;
		const obj = {
				      		host: host,
      		port: port,
      		secure: secure,
      		Tenant: Tenant != null && Tenant.length > 0 ? Tenant : null,
      		Streams: Streams != null && Streams.length > 0 ? Streams : null,
			Protocol: Protocol
		};
		return this.http.post(uri_, obj);
	}

	//********************************************************************
	// delete a MessagingEndpoint
	// returns an Observable
	// delegates via URI
	//********************************************************************
	deleteMessagingEndpoint(id)  : Observable<any> {
		const uri_ = this.apiUrl + '/MessagingEndpoint/delete/' + id;

		return this.http.get(uri_);
	}
	
	//********************************************************************
	// loads a MessagingEndpoint
	// returns the results untouched as an Observable MessagingEndpoint
	// MessagingEndpoint model
	// delegates via URI
	//********************************************************************
	getMessagingEndpoint(id) : Observable<MessagingEndpoint> {
		const uri_ = this.apiUrl + '/MessagingEndpoint/load/' + id;

		return this.http.get<MessagingEndpoint>(uri_);
	}
	
	//********************************************************************
	// gets all MessagingEndpoint
	// returns the results untouched as JSON representation of an
	// Observable array of MessagingEndpoint models
	// delegates via URI
	//********************************************************************
	getMessagingEndpoints() : Observable<MessagingEndpoint[]> {
		const uri_ = this.apiUrl + '/MessagingEndpoint/';

		return this
			.http.get<MessagingEndpoint[]>(uri_);
	}
	
		
	//********************************************************************
	// assigns a Tenant on a MessagingEndpoint
	// returns an Observable
	// delegates via URI
	//********************************************************************
	assignTenant( messagingEndpointId, _tenantId ): Observable<any> {

		// get the MessagingEndpoint from storage
		this.loadHelper( messagingEndpointId );

	// get the Tenant from storage
	var tmp 	= new TenantService(this.http).getTenant(_tenantId);

	// assign the Tenant
	this.messagingEndpoint.tenant = tmp;

	// save the MessagingEndpoint
	return this.saveHelper();
}

	//********************************************************************
	// unassigns a Tenant on a MessagingEndpoint
	// returns an Observable
	// delegates via URI
	//********************************************************************
	unassignTenant( messagingEndpointId ): Observable<any> {

		// get the MessagingEndpoint from storage
		this.loadHelper( messagingEndpointId );

	// assign Tenant to null
	this.messagingEndpoint.tenant = null;

	// save the MessagingEndpoint
	return this.saveHelper();
}

	
		//********************************************************************
	// adds one or more streamsIds as a Streams
	// to a MessagingEndpoint
	// returns a Promise
	// delegates via URI
	//********************************************************************
	addStreams( messagingEndpointId, streamsIds ): Observable<any> {

		// get the MessagingEndpoint
		this.loadHelper( messagingEndpointId );

	// split on a comma with no spaces
	var idList = streamsIds.split(',')

	// iterate over array of streams ids
	idList.forEach(function (id) {
		// read the TelemetryStream
		var telemetryStream = new TelemetryStreamService(this.http).getTelemetryStream(id);
		// add the TelemetryStream if not already assigned
		if ( this.messagingEndpoint.streams.indexOf(telemetryStream) == -1 )
		this.messagingEndpoint.streams.push(telemetryStream);
	});

	// save it
	return this.saveHelper();
}

	//********************************************************************
	// removes one or more streamsIds as a Streams
	// from a MessagingEndpoint
	// returns a Promise
	// delegates via URI
	//********************************************************************
	removeStreams( messagingEndpointId, streamsIds ): Observable<any> {

		// get the MessagingEndpoint
		this.loadHelper( messagingEndpointId );


	// split on a comma with no spaces
	var idList 					= streamsIds.split(',');
	var streams 	= this.messagingEndpoint.streams;

	if ( streams != null && streamsIds != null ) {

		// iterate over array of streams ids
		streams.forEach(function (obj) {
			if ( streamsIds.indexOf(obj._id) > -1 ) {
				// remove the TelemetryStream
				this.messagingEndpoint.streams.pop(obj);
			}
		});

		// save it
		return this.saveHelper();
	}
}

	
	//********************************************************************
	// saveHelper - internal helper to save a MessagingEndpoint
	//********************************************************************
	saveHelper() : Observable<any> {

		const uri_ = this.apiUrl + '/MessagingEndpoint/update/' + this.messagingEndpoint;

	return  this.http.post(uri_, this.messagingEndpoint );
}

	//********************************************************************
	// loadHelper - internal helper to load a MessagingEndpoint
	//********************************************************************	
	loadHelper( id ) {
		this.getMessagingEndpoint(id)
			.subscribe((res : MessagingEndpoint) => {
				this.messagingEndpoint = res;
			});
	}
}