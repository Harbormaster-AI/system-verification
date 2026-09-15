
import { Injectable } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import {AccessPolicy} from '../models/AccessPolicy';
import {TenantService} from '../services/Tenant.service';
import {ApiKeyService} from '../services/ApiKey.service';
import {TenantUserService} from '../services/TenantUser.service';
import { HelperBaseService } from './helperbase.service';

@Injectable({
	providedIn: 'root'
})

export class AccessPolicyService extends HelperBaseService {

	//********************************************************************
	// general holder 
	//********************************************************************
	accessPolicy : AccessPolicy;

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
	// add a AccessPolicy
	// returns the results untouched as a JSON representation
	// delegates via URI
	//********************************************************************
	addAccessPolicy(name, scope, expiresAt, Tenant, ApiKeys, Users) : Observable<any> {
		const uri_ = this.apiUrl + '/AccessPolicy/create';
		const obj = {
			      		name: name,
      		scope: scope,
      		expiresAt: expiresAt,
      		Tenant: Tenant != null && Tenant.length > 0 ? Tenant : null,
      		ApiKeys: ApiKeys != null && ApiKeys.length > 0 ? ApiKeys : null,
			Users: Users != null && Users.length > 0 ? Users : null
		};

		return this.http.post(uri_, obj);
	}

	//********************************************************************
	// update a AccessPolicy
	// returns an Observable
	// delegates via URI
	//********************************************************************
		updateAccessPolicy(name, scope, expiresAt, Tenant, ApiKeys, Users, id)  :  Observable<any>  {
			const uri_ = this.apiUrl + '/AccessPolicy/update/' + id;
		const obj = {
				      		name: name,
      		scope: scope,
      		expiresAt: expiresAt,
      		Tenant: Tenant != null && Tenant.length > 0 ? Tenant : null,
      		ApiKeys: ApiKeys != null && ApiKeys.length > 0 ? ApiKeys : null,
			Users: Users != null && Users.length > 0 ? Users : null
		};
		return this.http.post(uri_, obj);
	}

	//********************************************************************
	// delete a AccessPolicy
	// returns an Observable
	// delegates via URI
	//********************************************************************
	deleteAccessPolicy(id)  : Observable<any> {
		const uri_ = this.apiUrl + '/AccessPolicy/delete/' + id;

		return this.http.get(uri_);
	}
	
	//********************************************************************
	// loads a AccessPolicy
	// returns the results untouched as an Observable AccessPolicy
	// AccessPolicy model
	// delegates via URI
	//********************************************************************
	getAccessPolicy(id) : Observable<AccessPolicy> {
		const uri_ = this.apiUrl + '/AccessPolicy/load/' + id;

		return this.http.get<AccessPolicy>(uri_);
	}
	
	//********************************************************************
	// gets all AccessPolicy
	// returns the results untouched as JSON representation of an
	// Observable array of AccessPolicy models
	// delegates via URI
	//********************************************************************
	getAccessPolicys() : Observable<AccessPolicy[]> {
		const uri_ = this.apiUrl + '/AccessPolicy/';

		return this
			.http.get<AccessPolicy[]>(uri_);
	}
	
		
	//********************************************************************
	// assigns a Tenant on a AccessPolicy
	// returns an Observable
	// delegates via URI
	//********************************************************************
	assignTenant( accessPolicyId, _tenantId ): Observable<any> {

		// get the AccessPolicy from storage
		this.loadHelper( accessPolicyId );

	// get the Tenant from storage
	var tmp 	= new TenantService(this.http).getTenant(_tenantId);

	// assign the Tenant
	this.accessPolicy.tenant = tmp;

	// save the AccessPolicy
	return this.saveHelper();
}

	//********************************************************************
	// unassigns a Tenant on a AccessPolicy
	// returns an Observable
	// delegates via URI
	//********************************************************************
	unassignTenant( accessPolicyId ): Observable<any> {

		// get the AccessPolicy from storage
		this.loadHelper( accessPolicyId );

	// assign Tenant to null
	this.accessPolicy.tenant = null;

	// save the AccessPolicy
	return this.saveHelper();
}

	
		//********************************************************************
	// adds one or more apiKeysIds as a ApiKeys
	// to a AccessPolicy
	// returns a Promise
	// delegates via URI
	//********************************************************************
	addApiKeys( accessPolicyId, apiKeysIds ): Observable<any> {

		// get the AccessPolicy
		this.loadHelper( accessPolicyId );

	// split on a comma with no spaces
	var idList = apiKeysIds.split(',')

	// iterate over array of apiKeys ids
	idList.forEach(function (id) {
		// read the ApiKey
		var apiKey = new ApiKeyService(this.http).getApiKey(id);
		// add the ApiKey if not already assigned
		if ( this.accessPolicy.apiKeys.indexOf(apiKey) == -1 )
		this.accessPolicy.apiKeys.push(apiKey);
	});

	// save it
	return this.saveHelper();
}

	//********************************************************************
	// removes one or more apiKeysIds as a ApiKeys
	// from a AccessPolicy
	// returns a Promise
	// delegates via URI
	//********************************************************************
	removeApiKeys( accessPolicyId, apiKeysIds ): Observable<any> {

		// get the AccessPolicy
		this.loadHelper( accessPolicyId );


	// split on a comma with no spaces
	var idList 					= apiKeysIds.split(',');
	var apiKeys 	= this.accessPolicy.apiKeys;

	if ( apiKeys != null && apiKeysIds != null ) {

		// iterate over array of apiKeys ids
		apiKeys.forEach(function (obj) {
			if ( apiKeysIds.indexOf(obj._id) > -1 ) {
				// remove the ApiKey
				this.accessPolicy.apiKeys.pop(obj);
			}
		});

		// save it
		return this.saveHelper();
	}
}

		//********************************************************************
	// adds one or more usersIds as a Users
	// to a AccessPolicy
	// returns a Promise
	// delegates via URI
	//********************************************************************
	addUsers( accessPolicyId, usersIds ): Observable<any> {

		// get the AccessPolicy
		this.loadHelper( accessPolicyId );

	// split on a comma with no spaces
	var idList = usersIds.split(',')

	// iterate over array of users ids
	idList.forEach(function (id) {
		// read the TenantUser
		var tenantUser = new TenantUserService(this.http).getTenantUser(id);
		// add the TenantUser if not already assigned
		if ( this.accessPolicy.users.indexOf(tenantUser) == -1 )
		this.accessPolicy.users.push(tenantUser);
	});

	// save it
	return this.saveHelper();
}

	//********************************************************************
	// removes one or more usersIds as a Users
	// from a AccessPolicy
	// returns a Promise
	// delegates via URI
	//********************************************************************
	removeUsers( accessPolicyId, usersIds ): Observable<any> {

		// get the AccessPolicy
		this.loadHelper( accessPolicyId );


	// split on a comma with no spaces
	var idList 					= usersIds.split(',');
	var users 	= this.accessPolicy.users;

	if ( users != null && usersIds != null ) {

		// iterate over array of users ids
		users.forEach(function (obj) {
			if ( usersIds.indexOf(obj._id) > -1 ) {
				// remove the TenantUser
				this.accessPolicy.users.pop(obj);
			}
		});

		// save it
		return this.saveHelper();
	}
}

	
	//********************************************************************
	// saveHelper - internal helper to save a AccessPolicy
	//********************************************************************
	saveHelper() : Observable<any> {

		const uri_ = this.apiUrl + '/AccessPolicy/update/' + this.accessPolicy;

	return  this.http.post(uri_, this.accessPolicy );
}

	//********************************************************************
	// loadHelper - internal helper to load a AccessPolicy
	//********************************************************************	
	loadHelper( id ) {
		this.getAccessPolicy(id)
			.subscribe((res : AccessPolicy) => {
				this.accessPolicy = res;
			});
	}
}