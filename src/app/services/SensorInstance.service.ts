
import { Injectable } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import {SensorInstance} from '../models/SensorInstance';
import {IoTDeviceService} from '../services/IoTDevice.service';
import {TelemetryStreamService} from '../services/TelemetryStream.service';
import { HelperBaseService } from './helperbase.service';

@Injectable({
	providedIn: 'root'
})

export class SensorInstanceService extends HelperBaseService {

	//********************************************************************
	// general holder 
	//********************************************************************
	sensorInstance : SensorInstance;

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
	// add a SensorInstance
	// returns the results untouched as a JSON representation
	// delegates via URI
	//********************************************************************
	addSensorInstance(name, unit, samplingIntervalMs, Device, TelemetryStreams, SensorType) : Observable<any> {
		const uri_ = this.apiUrl + '/SensorInstance/create';
		const obj = {
			      		name: name,
      		unit: unit,
      		samplingIntervalMs: samplingIntervalMs,
      		Device: Device != null && Device.length > 0 ? Device : null,
      		TelemetryStreams: TelemetryStreams != null && TelemetryStreams.length > 0 ? TelemetryStreams : null,
			SensorType: SensorType
		};

		return this.http.post(uri_, obj);
	}

	//********************************************************************
	// update a SensorInstance
	// returns an Observable
	// delegates via URI
	//********************************************************************
		updateSensorInstance(name, unit, samplingIntervalMs, Device, TelemetryStreams, SensorType, id)  :  Observable<any>  {
			const uri_ = this.apiUrl + '/SensorInstance/update/' + id;
		const obj = {
				      		name: name,
      		unit: unit,
      		samplingIntervalMs: samplingIntervalMs,
      		Device: Device != null && Device.length > 0 ? Device : null,
      		TelemetryStreams: TelemetryStreams != null && TelemetryStreams.length > 0 ? TelemetryStreams : null,
			SensorType: SensorType
		};
		return this.http.post(uri_, obj);
	}

	//********************************************************************
	// delete a SensorInstance
	// returns an Observable
	// delegates via URI
	//********************************************************************
	deleteSensorInstance(id)  : Observable<any> {
		const uri_ = this.apiUrl + '/SensorInstance/delete/' + id;

		return this.http.get(uri_);
	}
	
	//********************************************************************
	// loads a SensorInstance
	// returns the results untouched as an Observable SensorInstance
	// SensorInstance model
	// delegates via URI
	//********************************************************************
	getSensorInstance(id) : Observable<SensorInstance> {
		const uri_ = this.apiUrl + '/SensorInstance/load/' + id;

		return this.http.get<SensorInstance>(uri_);
	}
	
	//********************************************************************
	// gets all SensorInstance
	// returns the results untouched as JSON representation of an
	// Observable array of SensorInstance models
	// delegates via URI
	//********************************************************************
	getSensorInstances() : Observable<SensorInstance[]> {
		const uri_ = this.apiUrl + '/SensorInstance/';

		return this
			.http.get<SensorInstance[]>(uri_);
	}
	
		
	//********************************************************************
	// assigns a Device on a SensorInstance
	// returns an Observable
	// delegates via URI
	//********************************************************************
	assignDevice( sensorInstanceId, _deviceId ): Observable<any> {

		// get the SensorInstance from storage
		this.loadHelper( sensorInstanceId );

	// get the IoTDevice from storage
	var tmp 	= new IoTDeviceService(this.http).getIoTDevice(_deviceId);

	// assign the Device
	this.sensorInstance.device = tmp;

	// save the SensorInstance
	return this.saveHelper();
}

	//********************************************************************
	// unassigns a Device on a SensorInstance
	// returns an Observable
	// delegates via URI
	//********************************************************************
	unassignDevice( sensorInstanceId ): Observable<any> {

		// get the SensorInstance from storage
		this.loadHelper( sensorInstanceId );

	// assign Device to null
	this.sensorInstance.device = null;

	// save the SensorInstance
	return this.saveHelper();
}

	
		//********************************************************************
	// adds one or more telemetryStreamsIds as a TelemetryStreams
	// to a SensorInstance
	// returns a Promise
	// delegates via URI
	//********************************************************************
	addTelemetryStreams( sensorInstanceId, telemetryStreamsIds ): Observable<any> {

		// get the SensorInstance
		this.loadHelper( sensorInstanceId );

	// split on a comma with no spaces
	var idList = telemetryStreamsIds.split(',')

	// iterate over array of telemetryStreams ids
	idList.forEach(function (id) {
		// read the TelemetryStream
		var telemetryStream = new TelemetryStreamService(this.http).getTelemetryStream(id);
		// add the TelemetryStream if not already assigned
		if ( this.sensorInstance.telemetryStreams.indexOf(telemetryStream) == -1 )
		this.sensorInstance.telemetryStreams.push(telemetryStream);
	});

	// save it
	return this.saveHelper();
}

	//********************************************************************
	// removes one or more telemetryStreamsIds as a TelemetryStreams
	// from a SensorInstance
	// returns a Promise
	// delegates via URI
	//********************************************************************
	removeTelemetryStreams( sensorInstanceId, telemetryStreamsIds ): Observable<any> {

		// get the SensorInstance
		this.loadHelper( sensorInstanceId );


	// split on a comma with no spaces
	var idList 					= telemetryStreamsIds.split(',');
	var telemetryStreams 	= this.sensorInstance.telemetryStreams;

	if ( telemetryStreams != null && telemetryStreamsIds != null ) {

		// iterate over array of telemetryStreams ids
		telemetryStreams.forEach(function (obj) {
			if ( telemetryStreamsIds.indexOf(obj._id) > -1 ) {
				// remove the TelemetryStream
				this.sensorInstance.telemetryStreams.pop(obj);
			}
		});

		// save it
		return this.saveHelper();
	}
}

	
	//********************************************************************
	// saveHelper - internal helper to save a SensorInstance
	//********************************************************************
	saveHelper() : Observable<any> {

		const uri_ = this.apiUrl + '/SensorInstance/update/' + this.sensorInstance;

	return  this.http.post(uri_, this.sensorInstance );
}

	//********************************************************************
	// loadHelper - internal helper to load a SensorInstance
	//********************************************************************	
	loadHelper( id ) {
		this.getSensorInstance(id)
			.subscribe((res : SensorInstance) => {
				this.sensorInstance = res;
			});
	}
}