
import { Injectable } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import {TelemetrySchema} from '../models/TelemetrySchema';
import {TelemetryStreamService} from '../services/TelemetryStream.service';
import { HelperBaseService } from './helperbase.service';

@Injectable({
	providedIn: 'root'
})

export class TelemetrySchemaService extends HelperBaseService {

	//********************************************************************
	// general holder 
	//********************************************************************
	telemetrySchema : TelemetrySchema;

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
	// add a TelemetrySchema
	// returns the results untouched as a JSON representation
	// delegates via URI
	//********************************************************************
	addTelemetrySchema(schemaId, schemaUri, Streams, Encoding) : Observable<any> {
		const uri_ = this.apiUrl + '/TelemetrySchema/create';
		const obj = {
			      		schemaId: schemaId,
      		schemaUri: schemaUri,
      		Streams: Streams != null && Streams.length > 0 ? Streams : null,
			Encoding: Encoding
		};

		return this.http.post(uri_, obj);
	}

	//********************************************************************
	// update a TelemetrySchema
	// returns an Observable
	// delegates via URI
	//********************************************************************
		updateTelemetrySchema(schemaId, schemaUri, Streams, Encoding, id)  :  Observable<any>  {
			const uri_ = this.apiUrl + '/TelemetrySchema/update/' + id;
		const obj = {
				      		schemaId: schemaId,
      		schemaUri: schemaUri,
      		Streams: Streams != null && Streams.length > 0 ? Streams : null,
			Encoding: Encoding
		};
		return this.http.post(uri_, obj);
	}

	//********************************************************************
	// delete a TelemetrySchema
	// returns an Observable
	// delegates via URI
	//********************************************************************
	deleteTelemetrySchema(id)  : Observable<any> {
		const uri_ = this.apiUrl + '/TelemetrySchema/delete/' + id;

		return this.http.get(uri_);
	}
	
	//********************************************************************
	// loads a TelemetrySchema
	// returns the results untouched as an Observable TelemetrySchema
	// TelemetrySchema model
	// delegates via URI
	//********************************************************************
	getTelemetrySchema(id) : Observable<TelemetrySchema> {
		const uri_ = this.apiUrl + '/TelemetrySchema/load/' + id;

		return this.http.get<TelemetrySchema>(uri_);
	}
	
	//********************************************************************
	// gets all TelemetrySchema
	// returns the results untouched as JSON representation of an
	// Observable array of TelemetrySchema models
	// delegates via URI
	//********************************************************************
	getTelemetrySchemas() : Observable<TelemetrySchema[]> {
		const uri_ = this.apiUrl + '/TelemetrySchema/';

		return this
			.http.get<TelemetrySchema[]>(uri_);
	}
	
		
		//********************************************************************
	// adds one or more streamsIds as a Streams
	// to a TelemetrySchema
	// returns a Promise
	// delegates via URI
	//********************************************************************
	addStreams( telemetrySchemaId, streamsIds ): Observable<any> {

		// get the TelemetrySchema
		this.loadHelper( telemetrySchemaId );

	// split on a comma with no spaces
	var idList = streamsIds.split(',')

	// iterate over array of streams ids
	idList.forEach(function (id) {
		// read the TelemetryStream
		var telemetryStream = new TelemetryStreamService(this.http).getTelemetryStream(id);
		// add the TelemetryStream if not already assigned
		if ( this.telemetrySchema.streams.indexOf(telemetryStream) == -1 )
		this.telemetrySchema.streams.push(telemetryStream);
	});

	// save it
	return this.saveHelper();
}

	//********************************************************************
	// removes one or more streamsIds as a Streams
	// from a TelemetrySchema
	// returns a Promise
	// delegates via URI
	//********************************************************************
	removeStreams( telemetrySchemaId, streamsIds ): Observable<any> {

		// get the TelemetrySchema
		this.loadHelper( telemetrySchemaId );


	// split on a comma with no spaces
	var idList 					= streamsIds.split(',');
	var streams 	= this.telemetrySchema.streams;

	if ( streams != null && streamsIds != null ) {

		// iterate over array of streams ids
		streams.forEach(function (obj) {
			if ( streamsIds.indexOf(obj._id) > -1 ) {
				// remove the TelemetryStream
				this.telemetrySchema.streams.pop(obj);
			}
		});

		// save it
		return this.saveHelper();
	}
}

	
	//********************************************************************
	// saveHelper - internal helper to save a TelemetrySchema
	//********************************************************************
	saveHelper() : Observable<any> {

		const uri_ = this.apiUrl + '/TelemetrySchema/update/' + this.telemetrySchema;

	return  this.http.post(uri_, this.telemetrySchema );
}

	//********************************************************************
	// loadHelper - internal helper to load a TelemetrySchema
	//********************************************************************	
	loadHelper( id ) {
		this.getTelemetrySchema(id)
			.subscribe((res : TelemetrySchema) => {
				this.telemetrySchema = res;
			});
	}
}