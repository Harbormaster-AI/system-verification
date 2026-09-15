
import { Injectable } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import {TwinTemplate} from '../models/TwinTemplate';
import {DeviceModelService} from '../services/DeviceModel.service';
import { HelperBaseService } from './helperbase.service';

@Injectable({
	providedIn: 'root'
})

export class TwinTemplateService extends HelperBaseService {

	//********************************************************************
	// general holder 
	//********************************************************************
	twinTemplate : TwinTemplate;

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
	// add a TwinTemplate
	// returns the results untouched as a JSON representation
	// delegates via URI
	//********************************************************************
	addTwinTemplate(name, schemaUri, version, DeviceModels) : Observable<any> {
		const uri_ = this.apiUrl + '/TwinTemplate/create';
		const obj = {
			      		name: name,
      		schemaUri: schemaUri,
      		version: version,
			DeviceModels: DeviceModels != null && DeviceModels.length > 0 ? DeviceModels : null
		};

		return this.http.post(uri_, obj);
	}

	//********************************************************************
	// update a TwinTemplate
	// returns an Observable
	// delegates via URI
	//********************************************************************
		updateTwinTemplate(name, schemaUri, version, DeviceModels, id)  :  Observable<any>  {
			const uri_ = this.apiUrl + '/TwinTemplate/update/' + id;
		const obj = {
				      		name: name,
      		schemaUri: schemaUri,
      		version: version,
			DeviceModels: DeviceModels != null && DeviceModels.length > 0 ? DeviceModels : null
		};
		return this.http.post(uri_, obj);
	}

	//********************************************************************
	// delete a TwinTemplate
	// returns an Observable
	// delegates via URI
	//********************************************************************
	deleteTwinTemplate(id)  : Observable<any> {
		const uri_ = this.apiUrl + '/TwinTemplate/delete/' + id;

		return this.http.get(uri_);
	}
	
	//********************************************************************
	// loads a TwinTemplate
	// returns the results untouched as an Observable TwinTemplate
	// TwinTemplate model
	// delegates via URI
	//********************************************************************
	getTwinTemplate(id) : Observable<TwinTemplate> {
		const uri_ = this.apiUrl + '/TwinTemplate/load/' + id;

		return this.http.get<TwinTemplate>(uri_);
	}
	
	//********************************************************************
	// gets all TwinTemplate
	// returns the results untouched as JSON representation of an
	// Observable array of TwinTemplate models
	// delegates via URI
	//********************************************************************
	getTwinTemplates() : Observable<TwinTemplate[]> {
		const uri_ = this.apiUrl + '/TwinTemplate/';

		return this
			.http.get<TwinTemplate[]>(uri_);
	}
	
		
		//********************************************************************
	// adds one or more deviceModelsIds as a DeviceModels
	// to a TwinTemplate
	// returns a Promise
	// delegates via URI
	//********************************************************************
	addDeviceModels( twinTemplateId, deviceModelsIds ): Observable<any> {

		// get the TwinTemplate
		this.loadHelper( twinTemplateId );

	// split on a comma with no spaces
	var idList = deviceModelsIds.split(',')

	// iterate over array of deviceModels ids
	idList.forEach(function (id) {
		// read the DeviceModel
		var deviceModel = new DeviceModelService(this.http).getDeviceModel(id);
		// add the DeviceModel if not already assigned
		if ( this.twinTemplate.deviceModels.indexOf(deviceModel) == -1 )
		this.twinTemplate.deviceModels.push(deviceModel);
	});

	// save it
	return this.saveHelper();
}

	//********************************************************************
	// removes one or more deviceModelsIds as a DeviceModels
	// from a TwinTemplate
	// returns a Promise
	// delegates via URI
	//********************************************************************
	removeDeviceModels( twinTemplateId, deviceModelsIds ): Observable<any> {

		// get the TwinTemplate
		this.loadHelper( twinTemplateId );


	// split on a comma with no spaces
	var idList 					= deviceModelsIds.split(',');
	var deviceModels 	= this.twinTemplate.deviceModels;

	if ( deviceModels != null && deviceModelsIds != null ) {

		// iterate over array of deviceModels ids
		deviceModels.forEach(function (obj) {
			if ( deviceModelsIds.indexOf(obj._id) > -1 ) {
				// remove the DeviceModel
				this.twinTemplate.deviceModels.pop(obj);
			}
		});

		// save it
		return this.saveHelper();
	}
}

	
	//********************************************************************
	// saveHelper - internal helper to save a TwinTemplate
	//********************************************************************
	saveHelper() : Observable<any> {

		const uri_ = this.apiUrl + '/TwinTemplate/update/' + this.twinTemplate;

	return  this.http.post(uri_, this.twinTemplate );
}

	//********************************************************************
	// loadHelper - internal helper to load a TwinTemplate
	//********************************************************************	
	loadHelper( id ) {
		this.getTwinTemplate(id)
			.subscribe((res : TwinTemplate) => {
				this.twinTemplate = res;
			});
	}
}