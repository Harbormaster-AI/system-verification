
import { Injectable } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import {ApiKey} from '../models/ApiKey';
import {AccessPolicyService} from '../services/AccessPolicy.service';
import { HelperBaseService } from './helperbase.service';

@Injectable({
	providedIn: 'root'
})

export class ApiKeyService extends HelperBaseService {

	//********************************************************************
	// general holder 
	//********************************************************************
	apiKey : ApiKey;

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
	// add a ApiKey
	// returns the results untouched as a JSON representation
	// delegates via URI
	//********************************************************************
	addApiKey(keyId, hashedSecret, createdAt, lastUsedAt, AccessPolicy) : Observable<any> {
		const uri_ = this.apiUrl + '/ApiKey/create';
		const obj = {
			      		keyId: keyId,
      		hashedSecret: hashedSecret,
      		createdAt: createdAt,
      		lastUsedAt: lastUsedAt,
			AccessPolicy: AccessPolicy != null && AccessPolicy.length > 0 ? AccessPolicy : null
		};

		return this.http.post(uri_, obj);
	}

	//********************************************************************
	// update a ApiKey
	// returns an Observable
	// delegates via URI
	//********************************************************************
		updateApiKey(keyId, hashedSecret, createdAt, lastUsedAt, AccessPolicy, id)  :  Observable<any>  {
			const uri_ = this.apiUrl + '/ApiKey/update/' + id;
		const obj = {
				      		keyId: keyId,
      		hashedSecret: hashedSecret,
      		createdAt: createdAt,
      		lastUsedAt: lastUsedAt,
			AccessPolicy: AccessPolicy != null && AccessPolicy.length > 0 ? AccessPolicy : null
		};
		return this.http.post(uri_, obj);
	}

	//********************************************************************
	// delete a ApiKey
	// returns an Observable
	// delegates via URI
	//********************************************************************
	deleteApiKey(id)  : Observable<any> {
		const uri_ = this.apiUrl + '/ApiKey/delete/' + id;

		return this.http.get(uri_);
	}
	
	//********************************************************************
	// loads a ApiKey
	// returns the results untouched as an Observable ApiKey
	// ApiKey model
	// delegates via URI
	//********************************************************************
	getApiKey(id) : Observable<ApiKey> {
		const uri_ = this.apiUrl + '/ApiKey/load/' + id;

		return this.http.get<ApiKey>(uri_);
	}
	
	//********************************************************************
	// gets all ApiKey
	// returns the results untouched as JSON representation of an
	// Observable array of ApiKey models
	// delegates via URI
	//********************************************************************
	getApiKeys() : Observable<ApiKey[]> {
		const uri_ = this.apiUrl + '/ApiKey/';

		return this
			.http.get<ApiKey[]>(uri_);
	}
	
		
	//********************************************************************
	// assigns a AccessPolicy on a ApiKey
	// returns an Observable
	// delegates via URI
	//********************************************************************
	assignAccessPolicy( apiKeyId, _accessPolicyId ): Observable<any> {

		// get the ApiKey from storage
		this.loadHelper( apiKeyId );

	// get the AccessPolicy from storage
	var tmp 	= new AccessPolicyService(this.http).getAccessPolicy(_accessPolicyId);

	// assign the AccessPolicy
	this.apiKey.accessPolicy = tmp;

	// save the ApiKey
	return this.saveHelper();
}

	//********************************************************************
	// unassigns a AccessPolicy on a ApiKey
	// returns an Observable
	// delegates via URI
	//********************************************************************
	unassignAccessPolicy( apiKeyId ): Observable<any> {

		// get the ApiKey from storage
		this.loadHelper( apiKeyId );

	// assign AccessPolicy to null
	this.apiKey.accessPolicy = null;

	// save the ApiKey
	return this.saveHelper();
}

	
	
	//********************************************************************
	// saveHelper - internal helper to save a ApiKey
	//********************************************************************
	saveHelper() : Observable<any> {

		const uri_ = this.apiUrl + '/ApiKey/update/' + this.apiKey;

	return  this.http.post(uri_, this.apiKey );
}

	//********************************************************************
	// loadHelper - internal helper to load a ApiKey
	//********************************************************************	
	loadHelper( id ) {
		this.getApiKey(id)
			.subscribe((res : ApiKey) => {
				this.apiKey = res;
			});
	}
}