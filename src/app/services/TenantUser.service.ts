
import { Injectable } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import {TenantUser} from '../models/TenantUser';
import {TenantService} from '../services/Tenant.service';
import {CommandInvocationService} from '../services/CommandInvocation.service';
import { HelperBaseService } from './helperbase.service';

@Injectable({
	providedIn: 'root'
})

export class TenantUserService extends HelperBaseService {

	//********************************************************************
	// general holder 
	//********************************************************************
	tenantUser : TenantUser;

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
	// add a TenantUser
	// returns the results untouched as a JSON representation
	// delegates via URI
	//********************************************************************
	addTenantUser(firstName, lastName, email, Tenant, CommandInvocations, Role) : Observable<any> {
		const uri_ = this.apiUrl + '/TenantUser/create';
		const obj = {
			      		firstName: firstName,
      		lastName: lastName,
      		email: email,
      		Tenant: Tenant != null && Tenant.length > 0 ? Tenant : null,
      		CommandInvocations: CommandInvocations != null && CommandInvocations.length > 0 ? CommandInvocations : null,
			Role: Role
		};

		return this.http.post(uri_, obj);
	}

	//********************************************************************
	// update a TenantUser
	// returns an Observable
	// delegates via URI
	//********************************************************************
		updateTenantUser(firstName, lastName, email, Tenant, CommandInvocations, Role, id)  :  Observable<any>  {
			const uri_ = this.apiUrl + '/TenantUser/update/' + id;
		const obj = {
				      		firstName: firstName,
      		lastName: lastName,
      		email: email,
      		Tenant: Tenant != null && Tenant.length > 0 ? Tenant : null,
      		CommandInvocations: CommandInvocations != null && CommandInvocations.length > 0 ? CommandInvocations : null,
			Role: Role
		};
		return this.http.post(uri_, obj);
	}

	//********************************************************************
	// delete a TenantUser
	// returns an Observable
	// delegates via URI
	//********************************************************************
	deleteTenantUser(id)  : Observable<any> {
		const uri_ = this.apiUrl + '/TenantUser/delete/' + id;

		return this.http.get(uri_);
	}
	
	//********************************************************************
	// loads a TenantUser
	// returns the results untouched as an Observable TenantUser
	// TenantUser model
	// delegates via URI
	//********************************************************************
	getTenantUser(id) : Observable<TenantUser> {
		const uri_ = this.apiUrl + '/TenantUser/load/' + id;

		return this.http.get<TenantUser>(uri_);
	}
	
	//********************************************************************
	// gets all TenantUser
	// returns the results untouched as JSON representation of an
	// Observable array of TenantUser models
	// delegates via URI
	//********************************************************************
	getTenantUsers() : Observable<TenantUser[]> {
		const uri_ = this.apiUrl + '/TenantUser/';

		return this
			.http.get<TenantUser[]>(uri_);
	}
	
		
	//********************************************************************
	// assigns a Tenant on a TenantUser
	// returns an Observable
	// delegates via URI
	//********************************************************************
	assignTenant( tenantUserId, _tenantId ): Observable<any> {

		// get the TenantUser from storage
		this.loadHelper( tenantUserId );

	// get the Tenant from storage
	var tmp 	= new TenantService(this.http).getTenant(_tenantId);

	// assign the Tenant
	this.tenantUser.tenant = tmp;

	// save the TenantUser
	return this.saveHelper();
}

	//********************************************************************
	// unassigns a Tenant on a TenantUser
	// returns an Observable
	// delegates via URI
	//********************************************************************
	unassignTenant( tenantUserId ): Observable<any> {

		// get the TenantUser from storage
		this.loadHelper( tenantUserId );

	// assign Tenant to null
	this.tenantUser.tenant = null;

	// save the TenantUser
	return this.saveHelper();
}

	
		//********************************************************************
	// adds one or more commandInvocationsIds as a CommandInvocations
	// to a TenantUser
	// returns a Promise
	// delegates via URI
	//********************************************************************
	addCommandInvocations( tenantUserId, commandInvocationsIds ): Observable<any> {

		// get the TenantUser
		this.loadHelper( tenantUserId );

	// split on a comma with no spaces
	var idList = commandInvocationsIds.split(',')

	// iterate over array of commandInvocations ids
	idList.forEach(function (id) {
		// read the CommandInvocation
		var commandInvocation = new CommandInvocationService(this.http).getCommandInvocation(id);
		// add the CommandInvocation if not already assigned
		if ( this.tenantUser.commandInvocations.indexOf(commandInvocation) == -1 )
		this.tenantUser.commandInvocations.push(commandInvocation);
	});

	// save it
	return this.saveHelper();
}

	//********************************************************************
	// removes one or more commandInvocationsIds as a CommandInvocations
	// from a TenantUser
	// returns a Promise
	// delegates via URI
	//********************************************************************
	removeCommandInvocations( tenantUserId, commandInvocationsIds ): Observable<any> {

		// get the TenantUser
		this.loadHelper( tenantUserId );


	// split on a comma with no spaces
	var idList 					= commandInvocationsIds.split(',');
	var commandInvocations 	= this.tenantUser.commandInvocations;

	if ( commandInvocations != null && commandInvocationsIds != null ) {

		// iterate over array of commandInvocations ids
		commandInvocations.forEach(function (obj) {
			if ( commandInvocationsIds.indexOf(obj._id) > -1 ) {
				// remove the CommandInvocation
				this.tenantUser.commandInvocations.pop(obj);
			}
		});

		// save it
		return this.saveHelper();
	}
}

	
	//********************************************************************
	// saveHelper - internal helper to save a TenantUser
	//********************************************************************
	saveHelper() : Observable<any> {

		const uri_ = this.apiUrl + '/TenantUser/update/' + this.tenantUser;

	return  this.http.post(uri_, this.tenantUser );
}

	//********************************************************************
	// loadHelper - internal helper to load a TenantUser
	//********************************************************************	
	loadHelper( id ) {
		this.getTenantUser(id)
			.subscribe((res : TenantUser) => {
				this.tenantUser = res;
			});
	}
}