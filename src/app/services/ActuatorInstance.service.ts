
import { Injectable } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import {ActuatorInstance} from '../models/ActuatorInstance';
import {IoTDeviceService} from '../services/IoTDevice.service';
import {CommandDefinitionService} from '../services/CommandDefinition.service';
import { HelperBaseService } from './helperbase.service';

@Injectable({
	providedIn: 'root'
})

export class ActuatorInstanceService extends HelperBaseService {

	//********************************************************************
	// general holder 
	//********************************************************************
	actuatorInstance : ActuatorInstance;

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
	// add a ActuatorInstance
	// returns the results untouched as a JSON representation
	// delegates via URI
	//********************************************************************
	addActuatorInstance(name, commandTopic, Device, SupportedCommands, ActuatorType) : Observable<any> {
		const uri_ = this.apiUrl + '/ActuatorInstance/create';
		const obj = {
			      		name: name,
      		commandTopic: commandTopic,
      		Device: Device != null && Device.length > 0 ? Device : null,
      		SupportedCommands: SupportedCommands != null && SupportedCommands.length > 0 ? SupportedCommands : null,
			ActuatorType: ActuatorType
		};

		return this.http.post(uri_, obj);
	}

	//********************************************************************
	// update a ActuatorInstance
	// returns an Observable
	// delegates via URI
	//********************************************************************
		updateActuatorInstance(name, commandTopic, Device, SupportedCommands, ActuatorType, id)  :  Observable<any>  {
			const uri_ = this.apiUrl + '/ActuatorInstance/update/' + id;
		const obj = {
				      		name: name,
      		commandTopic: commandTopic,
      		Device: Device != null && Device.length > 0 ? Device : null,
      		SupportedCommands: SupportedCommands != null && SupportedCommands.length > 0 ? SupportedCommands : null,
			ActuatorType: ActuatorType
		};
		return this.http.post(uri_, obj);
	}

	//********************************************************************
	// delete a ActuatorInstance
	// returns an Observable
	// delegates via URI
	//********************************************************************
	deleteActuatorInstance(id)  : Observable<any> {
		const uri_ = this.apiUrl + '/ActuatorInstance/delete/' + id;

		return this.http.get(uri_);
	}
	
	//********************************************************************
	// loads a ActuatorInstance
	// returns the results untouched as an Observable ActuatorInstance
	// ActuatorInstance model
	// delegates via URI
	//********************************************************************
	getActuatorInstance(id) : Observable<ActuatorInstance> {
		const uri_ = this.apiUrl + '/ActuatorInstance/load/' + id;

		return this.http.get<ActuatorInstance>(uri_);
	}
	
	//********************************************************************
	// gets all ActuatorInstance
	// returns the results untouched as JSON representation of an
	// Observable array of ActuatorInstance models
	// delegates via URI
	//********************************************************************
	getActuatorInstances() : Observable<ActuatorInstance[]> {
		const uri_ = this.apiUrl + '/ActuatorInstance/';

		return this
			.http.get<ActuatorInstance[]>(uri_);
	}
	
		
	//********************************************************************
	// assigns a Device on a ActuatorInstance
	// returns an Observable
	// delegates via URI
	//********************************************************************
	assignDevice( actuatorInstanceId, _deviceId ): Observable<any> {

		// get the ActuatorInstance from storage
		this.loadHelper( actuatorInstanceId );

	// get the IoTDevice from storage
	var tmp 	= new IoTDeviceService(this.http).getIoTDevice(_deviceId);

	// assign the Device
	this.actuatorInstance.device = tmp;

	// save the ActuatorInstance
	return this.saveHelper();
}

	//********************************************************************
	// unassigns a Device on a ActuatorInstance
	// returns an Observable
	// delegates via URI
	//********************************************************************
	unassignDevice( actuatorInstanceId ): Observable<any> {

		// get the ActuatorInstance from storage
		this.loadHelper( actuatorInstanceId );

	// assign Device to null
	this.actuatorInstance.device = null;

	// save the ActuatorInstance
	return this.saveHelper();
}

	
		//********************************************************************
	// adds one or more supportedCommandsIds as a SupportedCommands
	// to a ActuatorInstance
	// returns a Promise
	// delegates via URI
	//********************************************************************
	addSupportedCommands( actuatorInstanceId, supportedCommandsIds ): Observable<any> {

		// get the ActuatorInstance
		this.loadHelper( actuatorInstanceId );

	// split on a comma with no spaces
	var idList = supportedCommandsIds.split(',')

	// iterate over array of supportedCommands ids
	idList.forEach(function (id) {
		// read the CommandDefinition
		var commandDefinition = new CommandDefinitionService(this.http).getCommandDefinition(id);
		// add the CommandDefinition if not already assigned
		if ( this.actuatorInstance.supportedCommands.indexOf(commandDefinition) == -1 )
		this.actuatorInstance.supportedCommands.push(commandDefinition);
	});

	// save it
	return this.saveHelper();
}

	//********************************************************************
	// removes one or more supportedCommandsIds as a SupportedCommands
	// from a ActuatorInstance
	// returns a Promise
	// delegates via URI
	//********************************************************************
	removeSupportedCommands( actuatorInstanceId, supportedCommandsIds ): Observable<any> {

		// get the ActuatorInstance
		this.loadHelper( actuatorInstanceId );


	// split on a comma with no spaces
	var idList 					= supportedCommandsIds.split(',');
	var supportedCommands 	= this.actuatorInstance.supportedCommands;

	if ( supportedCommands != null && supportedCommandsIds != null ) {

		// iterate over array of supportedCommands ids
		supportedCommands.forEach(function (obj) {
			if ( supportedCommandsIds.indexOf(obj._id) > -1 ) {
				// remove the CommandDefinition
				this.actuatorInstance.supportedCommands.pop(obj);
			}
		});

		// save it
		return this.saveHelper();
	}
}

	
	//********************************************************************
	// saveHelper - internal helper to save a ActuatorInstance
	//********************************************************************
	saveHelper() : Observable<any> {

		const uri_ = this.apiUrl + '/ActuatorInstance/update/' + this.actuatorInstance;

	return  this.http.post(uri_, this.actuatorInstance );
}

	//********************************************************************
	// loadHelper - internal helper to load a ActuatorInstance
	//********************************************************************	
	loadHelper( id ) {
		this.getActuatorInstance(id)
			.subscribe((res : ActuatorInstance) => {
				this.actuatorInstance = res;
			});
	}
}