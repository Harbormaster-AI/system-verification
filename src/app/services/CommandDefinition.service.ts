
import { Injectable } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import {CommandDefinition} from '../models/CommandDefinition';
import {DeviceModelService} from '../services/DeviceModel.service';
import {ActuatorInstanceService} from '../services/ActuatorInstance.service';
import {CommandInvocationService} from '../services/CommandInvocation.service';
import { HelperBaseService } from './helperbase.service';

@Injectable({
	providedIn: 'root'
})

export class CommandDefinitionService extends HelperBaseService {

	//********************************************************************
	// general holder 
	//********************************************************************
	commandDefinition : CommandDefinition;

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
	// add a CommandDefinition
	// returns the results untouched as a JSON representation
	// delegates via URI
	//********************************************************************
	addCommandDefinition(name, requestSchemaUri, responseSchemaUri, timeoutSeconds, DeviceModel, Actuators, CommandInvocations) : Observable<any> {
		const uri_ = this.apiUrl + '/CommandDefinition/create';
		const obj = {
			      		name: name,
      		requestSchemaUri: requestSchemaUri,
      		responseSchemaUri: responseSchemaUri,
      		timeoutSeconds: timeoutSeconds,
      		DeviceModel: DeviceModel != null && DeviceModel.length > 0 ? DeviceModel : null,
      		Actuators: Actuators != null && Actuators.length > 0 ? Actuators : null,
			CommandInvocations: CommandInvocations != null && CommandInvocations.length > 0 ? CommandInvocations : null
		};

		return this.http.post(uri_, obj);
	}

	//********************************************************************
	// update a CommandDefinition
	// returns an Observable
	// delegates via URI
	//********************************************************************
		updateCommandDefinition(name, requestSchemaUri, responseSchemaUri, timeoutSeconds, DeviceModel, Actuators, CommandInvocations, id)  :  Observable<any>  {
			const uri_ = this.apiUrl + '/CommandDefinition/update/' + id;
		const obj = {
				      		name: name,
      		requestSchemaUri: requestSchemaUri,
      		responseSchemaUri: responseSchemaUri,
      		timeoutSeconds: timeoutSeconds,
      		DeviceModel: DeviceModel != null && DeviceModel.length > 0 ? DeviceModel : null,
      		Actuators: Actuators != null && Actuators.length > 0 ? Actuators : null,
			CommandInvocations: CommandInvocations != null && CommandInvocations.length > 0 ? CommandInvocations : null
		};
		return this.http.post(uri_, obj);
	}

	//********************************************************************
	// delete a CommandDefinition
	// returns an Observable
	// delegates via URI
	//********************************************************************
	deleteCommandDefinition(id)  : Observable<any> {
		const uri_ = this.apiUrl + '/CommandDefinition/delete/' + id;

		return this.http.get(uri_);
	}
	
	//********************************************************************
	// loads a CommandDefinition
	// returns the results untouched as an Observable CommandDefinition
	// CommandDefinition model
	// delegates via URI
	//********************************************************************
	getCommandDefinition(id) : Observable<CommandDefinition> {
		const uri_ = this.apiUrl + '/CommandDefinition/load/' + id;

		return this.http.get<CommandDefinition>(uri_);
	}
	
	//********************************************************************
	// gets all CommandDefinition
	// returns the results untouched as JSON representation of an
	// Observable array of CommandDefinition models
	// delegates via URI
	//********************************************************************
	getCommandDefinitions() : Observable<CommandDefinition[]> {
		const uri_ = this.apiUrl + '/CommandDefinition/';

		return this
			.http.get<CommandDefinition[]>(uri_);
	}
	
		
	//********************************************************************
	// assigns a DeviceModel on a CommandDefinition
	// returns an Observable
	// delegates via URI
	//********************************************************************
	assignDeviceModel( commandDefinitionId, _deviceModelId ): Observable<any> {

		// get the CommandDefinition from storage
		this.loadHelper( commandDefinitionId );

	// get the DeviceModel from storage
	var tmp 	= new DeviceModelService(this.http).getDeviceModel(_deviceModelId);

	// assign the DeviceModel
	this.commandDefinition.deviceModel = tmp;

	// save the CommandDefinition
	return this.saveHelper();
}

	//********************************************************************
	// unassigns a DeviceModel on a CommandDefinition
	// returns an Observable
	// delegates via URI
	//********************************************************************
	unassignDeviceModel( commandDefinitionId ): Observable<any> {

		// get the CommandDefinition from storage
		this.loadHelper( commandDefinitionId );

	// assign DeviceModel to null
	this.commandDefinition.deviceModel = null;

	// save the CommandDefinition
	return this.saveHelper();
}

	
		//********************************************************************
	// adds one or more actuatorsIds as a Actuators
	// to a CommandDefinition
	// returns a Promise
	// delegates via URI
	//********************************************************************
	addActuators( commandDefinitionId, actuatorsIds ): Observable<any> {

		// get the CommandDefinition
		this.loadHelper( commandDefinitionId );

	// split on a comma with no spaces
	var idList = actuatorsIds.split(',')

	// iterate over array of actuators ids
	idList.forEach(function (id) {
		// read the ActuatorInstance
		var actuatorInstance = new ActuatorInstanceService(this.http).getActuatorInstance(id);
		// add the ActuatorInstance if not already assigned
		if ( this.commandDefinition.actuators.indexOf(actuatorInstance) == -1 )
		this.commandDefinition.actuators.push(actuatorInstance);
	});

	// save it
	return this.saveHelper();
}

	//********************************************************************
	// removes one or more actuatorsIds as a Actuators
	// from a CommandDefinition
	// returns a Promise
	// delegates via URI
	//********************************************************************
	removeActuators( commandDefinitionId, actuatorsIds ): Observable<any> {

		// get the CommandDefinition
		this.loadHelper( commandDefinitionId );


	// split on a comma with no spaces
	var idList 					= actuatorsIds.split(',');
	var actuators 	= this.commandDefinition.actuators;

	if ( actuators != null && actuatorsIds != null ) {

		// iterate over array of actuators ids
		actuators.forEach(function (obj) {
			if ( actuatorsIds.indexOf(obj._id) > -1 ) {
				// remove the ActuatorInstance
				this.commandDefinition.actuators.pop(obj);
			}
		});

		// save it
		return this.saveHelper();
	}
}

		//********************************************************************
	// adds one or more commandInvocationsIds as a CommandInvocations
	// to a CommandDefinition
	// returns a Promise
	// delegates via URI
	//********************************************************************
	addCommandInvocations( commandDefinitionId, commandInvocationsIds ): Observable<any> {

		// get the CommandDefinition
		this.loadHelper( commandDefinitionId );

	// split on a comma with no spaces
	var idList = commandInvocationsIds.split(',')

	// iterate over array of commandInvocations ids
	idList.forEach(function (id) {
		// read the CommandInvocation
		var commandInvocation = new CommandInvocationService(this.http).getCommandInvocation(id);
		// add the CommandInvocation if not already assigned
		if ( this.commandDefinition.commandInvocations.indexOf(commandInvocation) == -1 )
		this.commandDefinition.commandInvocations.push(commandInvocation);
	});

	// save it
	return this.saveHelper();
}

	//********************************************************************
	// removes one or more commandInvocationsIds as a CommandInvocations
	// from a CommandDefinition
	// returns a Promise
	// delegates via URI
	//********************************************************************
	removeCommandInvocations( commandDefinitionId, commandInvocationsIds ): Observable<any> {

		// get the CommandDefinition
		this.loadHelper( commandDefinitionId );


	// split on a comma with no spaces
	var idList 					= commandInvocationsIds.split(',');
	var commandInvocations 	= this.commandDefinition.commandInvocations;

	if ( commandInvocations != null && commandInvocationsIds != null ) {

		// iterate over array of commandInvocations ids
		commandInvocations.forEach(function (obj) {
			if ( commandInvocationsIds.indexOf(obj._id) > -1 ) {
				// remove the CommandInvocation
				this.commandDefinition.commandInvocations.pop(obj);
			}
		});

		// save it
		return this.saveHelper();
	}
}

	
	//********************************************************************
	// saveHelper - internal helper to save a CommandDefinition
	//********************************************************************
	saveHelper() : Observable<any> {

		const uri_ = this.apiUrl + '/CommandDefinition/update/' + this.commandDefinition;

	return  this.http.post(uri_, this.commandDefinition );
}

	//********************************************************************
	// loadHelper - internal helper to load a CommandDefinition
	//********************************************************************	
	loadHelper( id ) {
		this.getCommandDefinition(id)
			.subscribe((res : CommandDefinition) => {
				this.commandDefinition = res;
			});
	}
}