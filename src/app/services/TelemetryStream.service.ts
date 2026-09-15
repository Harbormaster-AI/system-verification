
import { Injectable } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import {TelemetryStream} from '../models/TelemetryStream';
import {IoTDeviceService} from '../services/IoTDevice.service';
import {SensorInstanceService} from '../services/SensorInstance.service';
import {TelemetrySchemaService} from '../services/TelemetrySchema.service';
import {MessagingEndpointService} from '../services/MessagingEndpoint.service';
import {DataRetentionPolicyService} from '../services/DataRetentionPolicy.service';
import { HelperBaseService } from './helperbase.service';

@Injectable({
	providedIn: 'root'
})

export class TelemetryStreamService extends HelperBaseService {

	//********************************************************************
	// general holder 
	//********************************************************************
	telemetryStream : TelemetryStream;

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
	// add a TelemetryStream
	// returns the results untouched as a JSON representation
	// delegates via URI
	//********************************************************************
	addTelemetryStream(streamName, retentionDays, Device, Sensor, Schema, MessagingEndpoint, RetentionPolicy, Qos) : Observable<any> {
		const uri_ = this.apiUrl + '/TelemetryStream/create';
		const obj = {
			      		streamName: streamName,
      		retentionDays: retentionDays,
      		Device: Device != null && Device.length > 0 ? Device : null,
      		Sensor: Sensor != null && Sensor.length > 0 ? Sensor : null,
      		Schema: Schema != null && Schema.length > 0 ? Schema : null,
      		MessagingEndpoint: MessagingEndpoint != null && MessagingEndpoint.length > 0 ? MessagingEndpoint : null,
      		RetentionPolicy: RetentionPolicy != null && RetentionPolicy.length > 0 ? RetentionPolicy : null,
			Qos: Qos
		};

		return this.http.post(uri_, obj);
	}

	//********************************************************************
	// update a TelemetryStream
	// returns an Observable
	// delegates via URI
	//********************************************************************
		updateTelemetryStream(streamName, retentionDays, Device, Sensor, Schema, MessagingEndpoint, RetentionPolicy, Qos, id)  :  Observable<any>  {
			const uri_ = this.apiUrl + '/TelemetryStream/update/' + id;
		const obj = {
				      		streamName: streamName,
      		retentionDays: retentionDays,
      		Device: Device != null && Device.length > 0 ? Device : null,
      		Sensor: Sensor != null && Sensor.length > 0 ? Sensor : null,
      		Schema: Schema != null && Schema.length > 0 ? Schema : null,
      		MessagingEndpoint: MessagingEndpoint != null && MessagingEndpoint.length > 0 ? MessagingEndpoint : null,
      		RetentionPolicy: RetentionPolicy != null && RetentionPolicy.length > 0 ? RetentionPolicy : null,
			Qos: Qos
		};
		return this.http.post(uri_, obj);
	}

	//********************************************************************
	// delete a TelemetryStream
	// returns an Observable
	// delegates via URI
	//********************************************************************
	deleteTelemetryStream(id)  : Observable<any> {
		const uri_ = this.apiUrl + '/TelemetryStream/delete/' + id;

		return this.http.get(uri_);
	}
	
	//********************************************************************
	// loads a TelemetryStream
	// returns the results untouched as an Observable TelemetryStream
	// TelemetryStream model
	// delegates via URI
	//********************************************************************
	getTelemetryStream(id) : Observable<TelemetryStream> {
		const uri_ = this.apiUrl + '/TelemetryStream/load/' + id;

		return this.http.get<TelemetryStream>(uri_);
	}
	
	//********************************************************************
	// gets all TelemetryStream
	// returns the results untouched as JSON representation of an
	// Observable array of TelemetryStream models
	// delegates via URI
	//********************************************************************
	getTelemetryStreams() : Observable<TelemetryStream[]> {
		const uri_ = this.apiUrl + '/TelemetryStream/';

		return this
			.http.get<TelemetryStream[]>(uri_);
	}
	
		
	//********************************************************************
	// assigns a Device on a TelemetryStream
	// returns an Observable
	// delegates via URI
	//********************************************************************
	assignDevice( telemetryStreamId, _deviceId ): Observable<any> {

		// get the TelemetryStream from storage
		this.loadHelper( telemetryStreamId );

	// get the IoTDevice from storage
	var tmp 	= new IoTDeviceService(this.http).getIoTDevice(_deviceId);

	// assign the Device
	this.telemetryStream.device = tmp;

	// save the TelemetryStream
	return this.saveHelper();
}

	//********************************************************************
	// unassigns a Device on a TelemetryStream
	// returns an Observable
	// delegates via URI
	//********************************************************************
	unassignDevice( telemetryStreamId ): Observable<any> {

		// get the TelemetryStream from storage
		this.loadHelper( telemetryStreamId );

	// assign Device to null
	this.telemetryStream.device = null;

	// save the TelemetryStream
	return this.saveHelper();
}

	
	//********************************************************************
	// assigns a Sensor on a TelemetryStream
	// returns an Observable
	// delegates via URI
	//********************************************************************
	assignSensor( telemetryStreamId, _sensorId ): Observable<any> {

		// get the TelemetryStream from storage
		this.loadHelper( telemetryStreamId );

	// get the SensorInstance from storage
	var tmp 	= new SensorInstanceService(this.http).getSensorInstance(_sensorId);

	// assign the Sensor
	this.telemetryStream.sensor = tmp;

	// save the TelemetryStream
	return this.saveHelper();
}

	//********************************************************************
	// unassigns a Sensor on a TelemetryStream
	// returns an Observable
	// delegates via URI
	//********************************************************************
	unassignSensor( telemetryStreamId ): Observable<any> {

		// get the TelemetryStream from storage
		this.loadHelper( telemetryStreamId );

	// assign Sensor to null
	this.telemetryStream.sensor = null;

	// save the TelemetryStream
	return this.saveHelper();
}

	
	//********************************************************************
	// assigns a Schema on a TelemetryStream
	// returns an Observable
	// delegates via URI
	//********************************************************************
	assignSchema( telemetryStreamId, _schemaId ): Observable<any> {

		// get the TelemetryStream from storage
		this.loadHelper( telemetryStreamId );

	// get the TelemetrySchema from storage
	var tmp 	= new TelemetrySchemaService(this.http).getTelemetrySchema(_schemaId);

	// assign the Schema
	this.telemetryStream.schema = tmp;

	// save the TelemetryStream
	return this.saveHelper();
}

	//********************************************************************
	// unassigns a Schema on a TelemetryStream
	// returns an Observable
	// delegates via URI
	//********************************************************************
	unassignSchema( telemetryStreamId ): Observable<any> {

		// get the TelemetryStream from storage
		this.loadHelper( telemetryStreamId );

	// assign Schema to null
	this.telemetryStream.schema = null;

	// save the TelemetryStream
	return this.saveHelper();
}

	
	//********************************************************************
	// assigns a MessagingEndpoint on a TelemetryStream
	// returns an Observable
	// delegates via URI
	//********************************************************************
	assignMessagingEndpoint( telemetryStreamId, _messagingEndpointId ): Observable<any> {

		// get the TelemetryStream from storage
		this.loadHelper( telemetryStreamId );

	// get the MessagingEndpoint from storage
	var tmp 	= new MessagingEndpointService(this.http).getMessagingEndpoint(_messagingEndpointId);

	// assign the MessagingEndpoint
	this.telemetryStream.messagingEndpoint = tmp;

	// save the TelemetryStream
	return this.saveHelper();
}

	//********************************************************************
	// unassigns a MessagingEndpoint on a TelemetryStream
	// returns an Observable
	// delegates via URI
	//********************************************************************
	unassignMessagingEndpoint( telemetryStreamId ): Observable<any> {

		// get the TelemetryStream from storage
		this.loadHelper( telemetryStreamId );

	// assign MessagingEndpoint to null
	this.telemetryStream.messagingEndpoint = null;

	// save the TelemetryStream
	return this.saveHelper();
}

	
	//********************************************************************
	// assigns a RetentionPolicy on a TelemetryStream
	// returns an Observable
	// delegates via URI
	//********************************************************************
	assignRetentionPolicy( telemetryStreamId, _retentionPolicyId ): Observable<any> {

		// get the TelemetryStream from storage
		this.loadHelper( telemetryStreamId );

	// get the DataRetentionPolicy from storage
	var tmp 	= new DataRetentionPolicyService(this.http).getDataRetentionPolicy(_retentionPolicyId);

	// assign the RetentionPolicy
	this.telemetryStream.retentionPolicy = tmp;

	// save the TelemetryStream
	return this.saveHelper();
}

	//********************************************************************
	// unassigns a RetentionPolicy on a TelemetryStream
	// returns an Observable
	// delegates via URI
	//********************************************************************
	unassignRetentionPolicy( telemetryStreamId ): Observable<any> {

		// get the TelemetryStream from storage
		this.loadHelper( telemetryStreamId );

	// assign RetentionPolicy to null
	this.telemetryStream.retentionPolicy = null;

	// save the TelemetryStream
	return this.saveHelper();
}

	
	
	//********************************************************************
	// saveHelper - internal helper to save a TelemetryStream
	//********************************************************************
	saveHelper() : Observable<any> {

		const uri_ = this.apiUrl + '/TelemetryStream/update/' + this.telemetryStream;

	return  this.http.post(uri_, this.telemetryStream );
}

	//********************************************************************
	// loadHelper - internal helper to load a TelemetryStream
	//********************************************************************	
	loadHelper( id ) {
		this.getTelemetryStream(id)
			.subscribe((res : TelemetryStream) => {
				this.telemetryStream = res;
			});
	}
}