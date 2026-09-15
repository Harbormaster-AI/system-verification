
import { Injectable } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import {EdgeApplication} from '../models/EdgeApplication';
import {GatewayService} from '../services/Gateway.service';
import { HelperBaseService } from './helperbase.service';

@Injectable({
	providedIn: 'root'
})

export class EdgeApplicationService extends HelperBaseService {

	//********************************************************************
	// general holder 
	//********************************************************************
	edgeApplication : EdgeApplication;

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
	// add a EdgeApplication
	// returns the results untouched as a JSON representation
	// delegates via URI
	//********************************************************************
	addEdgeApplication(name, version, image, Gateway, Status) : Observable<any> {
		const uri_ = this.apiUrl + '/EdgeApplication/create';
		const obj = {
			      		name: name,
      		version: version,
      		image: image,
      		Gateway: Gateway != null && Gateway.length > 0 ? Gateway : null,
			Status: Status
		};

		return this.http.post(uri_, obj);
	}

	//********************************************************************
	// update a EdgeApplication
	// returns an Observable
	// delegates via URI
	//********************************************************************
		updateEdgeApplication(name, version, image, Gateway, Status, id)  :  Observable<any>  {
			const uri_ = this.apiUrl + '/EdgeApplication/update/' + id;
		const obj = {
				      		name: name,
      		version: version,
      		image: image,
      		Gateway: Gateway != null && Gateway.length > 0 ? Gateway : null,
			Status: Status
		};
		return this.http.post(uri_, obj);
	}

	//********************************************************************
	// delete a EdgeApplication
	// returns an Observable
	// delegates via URI
	//********************************************************************
	deleteEdgeApplication(id)  : Observable<any> {
		const uri_ = this.apiUrl + '/EdgeApplication/delete/' + id;

		return this.http.get(uri_);
	}
	
	//********************************************************************
	// loads a EdgeApplication
	// returns the results untouched as an Observable EdgeApplication
	// EdgeApplication model
	// delegates via URI
	//********************************************************************
	getEdgeApplication(id) : Observable<EdgeApplication> {
		const uri_ = this.apiUrl + '/EdgeApplication/load/' + id;

		return this.http.get<EdgeApplication>(uri_);
	}
	
	//********************************************************************
	// gets all EdgeApplication
	// returns the results untouched as JSON representation of an
	// Observable array of EdgeApplication models
	// delegates via URI
	//********************************************************************
	getEdgeApplications() : Observable<EdgeApplication[]> {
		const uri_ = this.apiUrl + '/EdgeApplication/';

		return this
			.http.get<EdgeApplication[]>(uri_);
	}
	
		
	//********************************************************************
	// assigns a Gateway on a EdgeApplication
	// returns an Observable
	// delegates via URI
	//********************************************************************
	assignGateway( edgeApplicationId, _gatewayId ): Observable<any> {

		// get the EdgeApplication from storage
		this.loadHelper( edgeApplicationId );

	// get the Gateway from storage
	var tmp 	= new GatewayService(this.http).getGateway(_gatewayId);

	// assign the Gateway
	this.edgeApplication.gateway = tmp;

	// save the EdgeApplication
	return this.saveHelper();
}

	//********************************************************************
	// unassigns a Gateway on a EdgeApplication
	// returns an Observable
	// delegates via URI
	//********************************************************************
	unassignGateway( edgeApplicationId ): Observable<any> {

		// get the EdgeApplication from storage
		this.loadHelper( edgeApplicationId );

	// assign Gateway to null
	this.edgeApplication.gateway = null;

	// save the EdgeApplication
	return this.saveHelper();
}

	
	
	//********************************************************************
	// saveHelper - internal helper to save a EdgeApplication
	//********************************************************************
	saveHelper() : Observable<any> {

		const uri_ = this.apiUrl + '/EdgeApplication/update/' + this.edgeApplication;

	return  this.http.post(uri_, this.edgeApplication );
}

	//********************************************************************
	// loadHelper - internal helper to load a EdgeApplication
	//********************************************************************	
	loadHelper( id ) {
		this.getEdgeApplication(id)
			.subscribe((res : EdgeApplication) => {
				this.edgeApplication = res;
			});
	}
}