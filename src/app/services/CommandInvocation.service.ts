
import { Injectable } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import {CommandInvocation} from '../models/CommandInvocation';
import {IoTDeviceService} from '../services/IoTDevice.service';
import {CommandDefinitionService} from '../services/CommandDefinition.service';
import {ActuatorInstanceService} from '../services/ActuatorInstance.service';
import {TenantUserService} from '../services/TenantUser.service';
import { HelperBaseService } from './helperbase.service';

@Injectable({
	providedIn: 'root'
})

export class CommandInvocationService extends HelperBaseService {

	//********************************************************************
	// general holder 
	//********************************************************************
	commandInvocation : CommandInvocation;

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
	// add a CommandInvocation
	// returns the results untouched as a JSON representation
	// delegates via URI
	//********************************************************************
	addCommandInvocation(invocationId, requestedAt, completedAt, Device, CommandDefinition, Actuator, User, Status) : Observable<any> {
		const uri_ = this.apiUrl + '/CommandInvocation/create';
		const obj = {
			      		invocationId: invocationId,
      		requestedAt: requestedAt,
      		completedAt: completedAt,
      		Device: Device != null && Device.length > 0 ? Device : null,
      		CommandDefinition: CommandDefinition != null && CommandDefinition.length > 0 ? CommandDefinition : null,
      		Actuator: Actuator != null && Actuator.length > 0 ? Actuator : null,
      		User: User != null && User.length > 0 ? User : null,
			Status: Status
		};

		return this.http.post(uri_, obj);
	}

	//********************************************************************
	// update a CommandInvocation
	// returns an Observable
	// delegates via URI
	//********************************************************************
		updateCommandInvocation(invocationId, requestedAt, completedAt, Device, CommandDefinition, Actuator, User, Status, id)  :  Observable<any>  {
			const uri_ = this.apiUrl + '/CommandInvocation/update/' + id;
		const obj = {
				      		invocationId: invocationId,
      		requestedAt: requestedAt,
      		completedAt: completedAt,
      		Device: Device != null && Device.length > 0 ? Device : null,
      		CommandDefinition: CommandDefinition != null && CommandDefinition.length > 0 ? CommandDefinition : null,
      		Actuator: Actuator != null && Actuator.length > 0 ? Actuator : null,
      		User: User != null && User.length > 0 ? User : null,
			Status: Status
		};
		return this.http.post(uri_, obj);
	}

	//********************************************************************
	// delete a CommandInvocation
	// returns an Observable
	// delegates via URI
	//********************************************************************
	deleteCommandInvocation(id)  : Observable<any> {
		const uri_ = this.apiUrl + '/CommandInvocation/delete/' + id;

		return this.http.get(uri_);
	}
	
	//********************************************************************
	// loads a CommandInvocation
	// returns the results untouched as an Observable CommandInvocation
	// CommandInvocation model
	// delegates via URI
	//********************************************************************
	getCommandInvocation(id) : Observable<CommandInvocation> {
		const uri_ = this.apiUrl + '/CommandInvocation/load/' + id;

		return this.http.get<CommandInvocation>(uri_);
	}
	
	//********************************************************************
	// gets all CommandInvocation
	// returns the results untouched as JSON representation of an
	// Observable array of CommandInvocation models
	// delegates via URI
	//********************************************************************
	getCommandInvocations() : Observable<CommandInvocation[]> {
		const uri_ = this.apiUrl + '/CommandInvocation/';

		return this
			.http.get<CommandInvocation[]>(uri_);
	}
	
		
	//********************************************************************
	// assigns a Device on a CommandInvocation
	// returns an Observable
	// delegates via URI
	//********************************************************************
	assignDevice( commandInvocationId, _deviceId ): Observable<any> {

		// get the CommandInvocation from storage
		this.loadHelper( commandInvocationId );

	// get the IoTDevice from storage
	var tmp 	= new IoTDeviceService(this.http).getIoTDevice(_deviceId);

	// assign the Device
	this.commandInvocation.device = tmp;

	// save the CommandInvocation
	return this.saveHelper();
}

	//********************************************************************
	// unassigns a Device on a CommandInvocation
	// returns an Observable
	// delegates via URI
	//********************************************************************
	unassignDevice( commandInvocationId ): Observable<any> {

		// get the CommandInvocation from storage
		this.loadHelper( commandInvocationId );

	// assign Device to null
	this.commandInvocation.device = null;

	// save the CommandInvocation
	return this.saveHelper();
}

	
	//********************************************************************
	// assigns a CommandDefinition on a CommandInvocation
	// returns an Observable
	// delegates via URI
	//********************************************************************
	assignCommandDefinition( commandInvocationId, _commandDefinitionId ): Observable<any> {

		// get the CommandInvocation from storage
		this.loadHelper( commandInvocationId );

	// get the CommandDefinition from storage
	var tmp 	= new CommandDefinitionService(this.http).getCommandDefinition(_commandDefinitionId);

	// assign the CommandDefinition
	this.commandInvocation.commandDefinition = tmp;

	// save the CommandInvocation
	return this.saveHelper();
}

	//********************************************************************
	// unassigns a CommandDefinition on a CommandInvocation
	// returns an Observable
	// delegates via URI
	//********************************************************************
	unassignCommandDefinition( commandInvocationId ): Observable<any> {

		// get the CommandInvocation from storage
		this.loadHelper( commandInvocationId );

	// assign CommandDefinition to null
	this.commandInvocation.commandDefinition = null;

	// save the CommandInvocation
	return this.saveHelper();
}

	
	//********************************************************************
	// assigns a Actuator on a CommandInvocation
	// returns an Observable
	// delegates via URI
	//********************************************************************
	assignActuator( commandInvocationId, _actuatorId ): Observable<any> {

		// get the CommandInvocation from storage
		this.loadHelper( commandInvocationId );

	// get the ActuatorInstance from storage
	var tmp 	= new ActuatorInstanceService(this.http).getActuatorInstance(_actuatorId);

	// assign the Actuator
	this.commandInvocation.actuator = tmp;

	// save the CommandInvocation
	return this.saveHelper();
}

	//********************************************************************
	// unassigns a Actuator on a CommandInvocation
	// returns an Observable
	// delegates via URI
	//********************************************************************
	unassignActuator( commandInvocationId ): Observable<any> {

		// get the CommandInvocation from storage
		this.loadHelper( commandInvocationId );

	// assign Actuator to null
	this.commandInvocation.actuator = null;

	// save the CommandInvocation
	return this.saveHelper();
}

	
	//********************************************************************
	// assigns a User on a CommandInvocation
	// returns an Observable
	// delegates via URI
	//********************************************************************
	assignUser( commandInvocationId, _userId ): Observable<any> {

		// get the CommandInvocation from storage
		this.loadHelper( commandInvocationId );

	// get the TenantUser from storage
	var tmp 	= new TenantUserService(this.http).getTenantUser(_userId);

	// assign the User
	this.commandInvocation.user = tmp;

	// save the CommandInvocation
	return this.saveHelper();
}

	//********************************************************************
	// unassigns a User on a CommandInvocation
	// returns an Observable
	// delegates via URI
	//********************************************************************
	unassignUser( commandInvocationId ): Observable<any> {

		// get the CommandInvocation from storage
		this.loadHelper( commandInvocationId );

	// assign User to null
	this.commandInvocation.user = null;

	// save the CommandInvocation
	return this.saveHelper();
}

	
	
	//********************************************************************
	// saveHelper - internal helper to save a CommandInvocation
	//********************************************************************
	saveHelper() : Observable<any> {

		const uri_ = this.apiUrl + '/CommandInvocation/update/' + this.commandInvocation;

	return  this.http.post(uri_, this.commandInvocation );
}

	//********************************************************************
	// loadHelper - internal helper to load a CommandInvocation
	//********************************************************************	
	loadHelper( id ) {
		this.getCommandInvocation(id)
			.subscribe((res : CommandInvocation) => {
				this.commandInvocation = res;
			});
	}
}