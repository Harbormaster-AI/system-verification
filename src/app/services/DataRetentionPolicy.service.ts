
import { Injectable } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import {DataRetentionPolicy} from '../models/DataRetentionPolicy';
import {TenantService} from '../services/Tenant.service';
import {TelemetryStreamService} from '../services/TelemetryStream.service';
import { HelperBaseService } from './helperbase.service';

@Injectable({
	providedIn: 'root'
})

export class DataRetentionPolicyService extends HelperBaseService {

	//********************************************************************
	// general holder 
	//********************************************************************
	dataRetentionPolicy : DataRetentionPolicy;

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
	// add a DataRetentionPolicy
	// returns the results untouched as a JSON representation
	// delegates via URI
	//********************************************************************
	addDataRetentionPolicy(name, retentionDays, Tenant, Streams) : Observable<any> {
		const uri_ = this.apiUrl + '/DataRetentionPolicy/create';
		const obj = {
			      		name: name,
      		retentionDays: retentionDays,
      		Tenant: Tenant != null && Tenant.length > 0 ? Tenant : null,
			Streams: Streams != null && Streams.length > 0 ? Streams : null
		};

		return this.http.post(uri_, obj);
	}

	//********************************************************************
	// update a DataRetentionPolicy
	// returns an Observable
	// delegates via URI
	//********************************************************************
		updateDataRetentionPolicy(name, retentionDays, Tenant, Streams, id)  :  Observable<any>  {
			const uri_ = this.apiUrl + '/DataRetentionPolicy/update/' + id;
		const obj = {
				      		name: name,
      		retentionDays: retentionDays,
      		Tenant: Tenant != null && Tenant.length > 0 ? Tenant : null,
			Streams: Streams != null && Streams.length > 0 ? Streams : null
		};
		return this.http.post(uri_, obj);
	}

	//********************************************************************
	// delete a DataRetentionPolicy
	// returns an Observable
	// delegates via URI
	//********************************************************************
	deleteDataRetentionPolicy(id)  : Observable<any> {
		const uri_ = this.apiUrl + '/DataRetentionPolicy/delete/' + id;

		return this.http.get(uri_);
	}
	
	//********************************************************************
	// loads a DataRetentionPolicy
	// returns the results untouched as an Observable DataRetentionPolicy
	// DataRetentionPolicy model
	// delegates via URI
	//********************************************************************
	getDataRetentionPolicy(id) : Observable<DataRetentionPolicy> {
		const uri_ = this.apiUrl + '/DataRetentionPolicy/load/' + id;

		return this.http.get<DataRetentionPolicy>(uri_);
	}
	
	//********************************************************************
	// gets all DataRetentionPolicy
	// returns the results untouched as JSON representation of an
	// Observable array of DataRetentionPolicy models
	// delegates via URI
	//********************************************************************
	getDataRetentionPolicys() : Observable<DataRetentionPolicy[]> {
		const uri_ = this.apiUrl + '/DataRetentionPolicy/';

		return this
			.http.get<DataRetentionPolicy[]>(uri_);
	}
	
		
	//********************************************************************
	// assigns a Tenant on a DataRetentionPolicy
	// returns an Observable
	// delegates via URI
	//********************************************************************
	assignTenant( dataRetentionPolicyId, _tenantId ): Observable<any> {

		// get the DataRetentionPolicy from storage
		this.loadHelper( dataRetentionPolicyId );

	// get the Tenant from storage
	var tmp 	= new TenantService(this.http).getTenant(_tenantId);

	// assign the Tenant
	this.dataRetentionPolicy.tenant = tmp;

	// save the DataRetentionPolicy
	return this.saveHelper();
}

	//********************************************************************
	// unassigns a Tenant on a DataRetentionPolicy
	// returns an Observable
	// delegates via URI
	//********************************************************************
	unassignTenant( dataRetentionPolicyId ): Observable<any> {

		// get the DataRetentionPolicy from storage
		this.loadHelper( dataRetentionPolicyId );

	// assign Tenant to null
	this.dataRetentionPolicy.tenant = null;

	// save the DataRetentionPolicy
	return this.saveHelper();
}

	
		//********************************************************************
	// adds one or more streamsIds as a Streams
	// to a DataRetentionPolicy
	// returns a Promise
	// delegates via URI
	//********************************************************************
	addStreams( dataRetentionPolicyId, streamsIds ): Observable<any> {

		// get the DataRetentionPolicy
		this.loadHelper( dataRetentionPolicyId );

	// split on a comma with no spaces
	var idList = streamsIds.split(',')

	// iterate over array of streams ids
	idList.forEach(function (id) {
		// read the TelemetryStream
		var telemetryStream = new TelemetryStreamService(this.http).getTelemetryStream(id);
		// add the TelemetryStream if not already assigned
		if ( this.dataRetentionPolicy.streams.indexOf(telemetryStream) == -1 )
		this.dataRetentionPolicy.streams.push(telemetryStream);
	});

	// save it
	return this.saveHelper();
}

	//********************************************************************
	// removes one or more streamsIds as a Streams
	// from a DataRetentionPolicy
	// returns a Promise
	// delegates via URI
	//********************************************************************
	removeStreams( dataRetentionPolicyId, streamsIds ): Observable<any> {

		// get the DataRetentionPolicy
		this.loadHelper( dataRetentionPolicyId );


	// split on a comma with no spaces
	var idList 					= streamsIds.split(',');
	var streams 	= this.dataRetentionPolicy.streams;

	if ( streams != null && streamsIds != null ) {

		// iterate over array of streams ids
		streams.forEach(function (obj) {
			if ( streamsIds.indexOf(obj._id) > -1 ) {
				// remove the TelemetryStream
				this.dataRetentionPolicy.streams.pop(obj);
			}
		});

		// save it
		return this.saveHelper();
	}
}

	
	//********************************************************************
	// saveHelper - internal helper to save a DataRetentionPolicy
	//********************************************************************
	saveHelper() : Observable<any> {

		const uri_ = this.apiUrl + '/DataRetentionPolicy/update/' + this.dataRetentionPolicy;

	return  this.http.post(uri_, this.dataRetentionPolicy );
}

	//********************************************************************
	// loadHelper - internal helper to load a DataRetentionPolicy
	//********************************************************************	
	loadHelper( id ) {
		this.getDataRetentionPolicy(id)
			.subscribe((res : DataRetentionPolicy) => {
				this.dataRetentionPolicy = res;
			});
	}
}