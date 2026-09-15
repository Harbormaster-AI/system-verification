
import { Injectable } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import {TwinChangeEvent} from '../models/TwinChangeEvent';
import {DigitalTwinService} from '../services/DigitalTwin.service';
import { HelperBaseService } from './helperbase.service';

@Injectable({
	providedIn: 'root'
})

export class TwinChangeEventService extends HelperBaseService {

	//********************************************************************
	// general holder 
	//********************************************************************
	twinChangeEvent : TwinChangeEvent;

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
	// add a TwinChangeEvent
	// returns the results untouched as a JSON representation
	// delegates via URI
	//********************************************************************
	addTwinChangeEvent(eventId, occurredAt, Twin, ChangeType) : Observable<any> {
		const uri_ = this.apiUrl + '/TwinChangeEvent/create';
		const obj = {
			      		eventId: eventId,
      		occurredAt: occurredAt,
      		Twin: Twin != null && Twin.length > 0 ? Twin : null,
			ChangeType: ChangeType
		};

		return this.http.post(uri_, obj);
	}

	//********************************************************************
	// update a TwinChangeEvent
	// returns an Observable
	// delegates via URI
	//********************************************************************
		updateTwinChangeEvent(eventId, occurredAt, Twin, ChangeType, id)  :  Observable<any>  {
			const uri_ = this.apiUrl + '/TwinChangeEvent/update/' + id;
		const obj = {
				      		eventId: eventId,
      		occurredAt: occurredAt,
      		Twin: Twin != null && Twin.length > 0 ? Twin : null,
			ChangeType: ChangeType
		};
		return this.http.post(uri_, obj);
	}

	//********************************************************************
	// delete a TwinChangeEvent
	// returns an Observable
	// delegates via URI
	//********************************************************************
	deleteTwinChangeEvent(id)  : Observable<any> {
		const uri_ = this.apiUrl + '/TwinChangeEvent/delete/' + id;

		return this.http.get(uri_);
	}
	
	//********************************************************************
	// loads a TwinChangeEvent
	// returns the results untouched as an Observable TwinChangeEvent
	// TwinChangeEvent model
	// delegates via URI
	//********************************************************************
	getTwinChangeEvent(id) : Observable<TwinChangeEvent> {
		const uri_ = this.apiUrl + '/TwinChangeEvent/load/' + id;

		return this.http.get<TwinChangeEvent>(uri_);
	}
	
	//********************************************************************
	// gets all TwinChangeEvent
	// returns the results untouched as JSON representation of an
	// Observable array of TwinChangeEvent models
	// delegates via URI
	//********************************************************************
	getTwinChangeEvents() : Observable<TwinChangeEvent[]> {
		const uri_ = this.apiUrl + '/TwinChangeEvent/';

		return this
			.http.get<TwinChangeEvent[]>(uri_);
	}
	
		
	//********************************************************************
	// assigns a Twin on a TwinChangeEvent
	// returns an Observable
	// delegates via URI
	//********************************************************************
	assignTwin( twinChangeEventId, _twinId ): Observable<any> {

		// get the TwinChangeEvent from storage
		this.loadHelper( twinChangeEventId );

	// get the DigitalTwin from storage
	var tmp 	= new DigitalTwinService(this.http).getDigitalTwin(_twinId);

	// assign the Twin
	this.twinChangeEvent.twin = tmp;

	// save the TwinChangeEvent
	return this.saveHelper();
}

	//********************************************************************
	// unassigns a Twin on a TwinChangeEvent
	// returns an Observable
	// delegates via URI
	//********************************************************************
	unassignTwin( twinChangeEventId ): Observable<any> {

		// get the TwinChangeEvent from storage
		this.loadHelper( twinChangeEventId );

	// assign Twin to null
	this.twinChangeEvent.twin = null;

	// save the TwinChangeEvent
	return this.saveHelper();
}

	
	
	//********************************************************************
	// saveHelper - internal helper to save a TwinChangeEvent
	//********************************************************************
	saveHelper() : Observable<any> {

		const uri_ = this.apiUrl + '/TwinChangeEvent/update/' + this.twinChangeEvent;

	return  this.http.post(uri_, this.twinChangeEvent );
}

	//********************************************************************
	// loadHelper - internal helper to load a TwinChangeEvent
	//********************************************************************	
	loadHelper( id ) {
		this.getTwinChangeEvent(id)
			.subscribe((res : TwinChangeEvent) => {
				this.twinChangeEvent = res;
			});
	}
}