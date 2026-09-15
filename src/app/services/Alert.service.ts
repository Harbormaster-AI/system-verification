
import { Injectable } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import {Alert} from '../models/Alert';
import {IoTDeviceService} from '../services/IoTDevice.service';
import {AlertRuleService} from '../services/AlertRule.service';
import { HelperBaseService } from './helperbase.service';

@Injectable({
	providedIn: 'root'
})

export class AlertService extends HelperBaseService {

	//********************************************************************
	// general holder 
	//********************************************************************
	alert : Alert;

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
	// add a Alert
	// returns the results untouched as a JSON representation
	// delegates via URI
	//********************************************************************
	addAlert(raisedAt, clearedAt, message, Device, AlertRule, Status) : Observable<any> {
		const uri_ = this.apiUrl + '/Alert/create';
		const obj = {
			      		raisedAt: raisedAt,
      		clearedAt: clearedAt,
      		message: message,
      		Device: Device != null && Device.length > 0 ? Device : null,
      		AlertRule: AlertRule != null && AlertRule.length > 0 ? AlertRule : null,
			Status: Status
		};

		return this.http.post(uri_, obj);
	}

	//********************************************************************
	// update a Alert
	// returns an Observable
	// delegates via URI
	//********************************************************************
		updateAlert(raisedAt, clearedAt, message, Device, AlertRule, Status, id)  :  Observable<any>  {
			const uri_ = this.apiUrl + '/Alert/update/' + id;
		const obj = {
				      		raisedAt: raisedAt,
      		clearedAt: clearedAt,
      		message: message,
      		Device: Device != null && Device.length > 0 ? Device : null,
      		AlertRule: AlertRule != null && AlertRule.length > 0 ? AlertRule : null,
			Status: Status
		};
		return this.http.post(uri_, obj);
	}

	//********************************************************************
	// delete a Alert
	// returns an Observable
	// delegates via URI
	//********************************************************************
	deleteAlert(id)  : Observable<any> {
		const uri_ = this.apiUrl + '/Alert/delete/' + id;

		return this.http.get(uri_);
	}
	
	//********************************************************************
	// loads a Alert
	// returns the results untouched as an Observable Alert
	// Alert model
	// delegates via URI
	//********************************************************************
	getAlert(id) : Observable<Alert> {
		const uri_ = this.apiUrl + '/Alert/load/' + id;

		return this.http.get<Alert>(uri_);
	}
	
	//********************************************************************
	// gets all Alert
	// returns the results untouched as JSON representation of an
	// Observable array of Alert models
	// delegates via URI
	//********************************************************************
	getAlerts() : Observable<Alert[]> {
		const uri_ = this.apiUrl + '/Alert/';

		return this
			.http.get<Alert[]>(uri_);
	}
	
		
	//********************************************************************
	// assigns a Device on a Alert
	// returns an Observable
	// delegates via URI
	//********************************************************************
	assignDevice( alertId, _deviceId ): Observable<any> {

		// get the Alert from storage
		this.loadHelper( alertId );

	// get the IoTDevice from storage
	var tmp 	= new IoTDeviceService(this.http).getIoTDevice(_deviceId);

	// assign the Device
	this.alert.device = tmp;

	// save the Alert
	return this.saveHelper();
}

	//********************************************************************
	// unassigns a Device on a Alert
	// returns an Observable
	// delegates via URI
	//********************************************************************
	unassignDevice( alertId ): Observable<any> {

		// get the Alert from storage
		this.loadHelper( alertId );

	// assign Device to null
	this.alert.device = null;

	// save the Alert
	return this.saveHelper();
}

	
	//********************************************************************
	// assigns a AlertRule on a Alert
	// returns an Observable
	// delegates via URI
	//********************************************************************
	assignAlertRule( alertId, _alertRuleId ): Observable<any> {

		// get the Alert from storage
		this.loadHelper( alertId );

	// get the AlertRule from storage
	var tmp 	= new AlertRuleService(this.http).getAlertRule(_alertRuleId);

	// assign the AlertRule
	this.alert.alertRule = tmp;

	// save the Alert
	return this.saveHelper();
}

	//********************************************************************
	// unassigns a AlertRule on a Alert
	// returns an Observable
	// delegates via URI
	//********************************************************************
	unassignAlertRule( alertId ): Observable<any> {

		// get the Alert from storage
		this.loadHelper( alertId );

	// assign AlertRule to null
	this.alert.alertRule = null;

	// save the Alert
	return this.saveHelper();
}

	
	
	//********************************************************************
	// saveHelper - internal helper to save a Alert
	//********************************************************************
	saveHelper() : Observable<any> {

		const uri_ = this.apiUrl + '/Alert/update/' + this.alert;

	return  this.http.post(uri_, this.alert );
}

	//********************************************************************
	// loadHelper - internal helper to load a Alert
	//********************************************************************	
	loadHelper( id ) {
		this.getAlert(id)
			.subscribe((res : Alert) => {
				this.alert = res;
			});
	}
}