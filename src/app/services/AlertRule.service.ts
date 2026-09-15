
import { Injectable } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import {AlertRule} from '../models/AlertRule';
import {TenantService} from '../services/Tenant.service';
import {TelemetryStreamService} from '../services/TelemetryStream.service';
import {AlertService} from '../services/Alert.service';
import { HelperBaseService } from './helperbase.service';

@Injectable({
	providedIn: 'root'
})

export class AlertRuleService extends HelperBaseService {

	//********************************************************************
	// general holder 
	//********************************************************************
	alertRule : AlertRule;

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
	// add a AlertRule
	// returns the results untouched as a JSON representation
	// delegates via URI
	//********************************************************************
	addAlertRule(name, expression, Tenant, Streams, Alerts, Severity) : Observable<any> {
		const uri_ = this.apiUrl + '/AlertRule/create';
		const obj = {
			      		name: name,
      		expression: expression,
      		Tenant: Tenant != null && Tenant.length > 0 ? Tenant : null,
      		Streams: Streams != null && Streams.length > 0 ? Streams : null,
      		Alerts: Alerts != null && Alerts.length > 0 ? Alerts : null,
			Severity: Severity
		};

		return this.http.post(uri_, obj);
	}

	//********************************************************************
	// update a AlertRule
	// returns an Observable
	// delegates via URI
	//********************************************************************
		updateAlertRule(name, expression, Tenant, Streams, Alerts, Severity, id)  :  Observable<any>  {
			const uri_ = this.apiUrl + '/AlertRule/update/' + id;
		const obj = {
				      		name: name,
      		expression: expression,
      		Tenant: Tenant != null && Tenant.length > 0 ? Tenant : null,
      		Streams: Streams != null && Streams.length > 0 ? Streams : null,
      		Alerts: Alerts != null && Alerts.length > 0 ? Alerts : null,
			Severity: Severity
		};
		return this.http.post(uri_, obj);
	}

	//********************************************************************
	// delete a AlertRule
	// returns an Observable
	// delegates via URI
	//********************************************************************
	deleteAlertRule(id)  : Observable<any> {
		const uri_ = this.apiUrl + '/AlertRule/delete/' + id;

		return this.http.get(uri_);
	}
	
	//********************************************************************
	// loads a AlertRule
	// returns the results untouched as an Observable AlertRule
	// AlertRule model
	// delegates via URI
	//********************************************************************
	getAlertRule(id) : Observable<AlertRule> {
		const uri_ = this.apiUrl + '/AlertRule/load/' + id;

		return this.http.get<AlertRule>(uri_);
	}
	
	//********************************************************************
	// gets all AlertRule
	// returns the results untouched as JSON representation of an
	// Observable array of AlertRule models
	// delegates via URI
	//********************************************************************
	getAlertRules() : Observable<AlertRule[]> {
		const uri_ = this.apiUrl + '/AlertRule/';

		return this
			.http.get<AlertRule[]>(uri_);
	}
	
		
	//********************************************************************
	// assigns a Tenant on a AlertRule
	// returns an Observable
	// delegates via URI
	//********************************************************************
	assignTenant( alertRuleId, _tenantId ): Observable<any> {

		// get the AlertRule from storage
		this.loadHelper( alertRuleId );

	// get the Tenant from storage
	var tmp 	= new TenantService(this.http).getTenant(_tenantId);

	// assign the Tenant
	this.alertRule.tenant = tmp;

	// save the AlertRule
	return this.saveHelper();
}

	//********************************************************************
	// unassigns a Tenant on a AlertRule
	// returns an Observable
	// delegates via URI
	//********************************************************************
	unassignTenant( alertRuleId ): Observable<any> {

		// get the AlertRule from storage
		this.loadHelper( alertRuleId );

	// assign Tenant to null
	this.alertRule.tenant = null;

	// save the AlertRule
	return this.saveHelper();
}

	
		//********************************************************************
	// adds one or more streamsIds as a Streams
	// to a AlertRule
	// returns a Promise
	// delegates via URI
	//********************************************************************
	addStreams( alertRuleId, streamsIds ): Observable<any> {

		// get the AlertRule
		this.loadHelper( alertRuleId );

	// split on a comma with no spaces
	var idList = streamsIds.split(',')

	// iterate over array of streams ids
	idList.forEach(function (id) {
		// read the TelemetryStream
		var telemetryStream = new TelemetryStreamService(this.http).getTelemetryStream(id);
		// add the TelemetryStream if not already assigned
		if ( this.alertRule.streams.indexOf(telemetryStream) == -1 )
		this.alertRule.streams.push(telemetryStream);
	});

	// save it
	return this.saveHelper();
}

	//********************************************************************
	// removes one or more streamsIds as a Streams
	// from a AlertRule
	// returns a Promise
	// delegates via URI
	//********************************************************************
	removeStreams( alertRuleId, streamsIds ): Observable<any> {

		// get the AlertRule
		this.loadHelper( alertRuleId );


	// split on a comma with no spaces
	var idList 					= streamsIds.split(',');
	var streams 	= this.alertRule.streams;

	if ( streams != null && streamsIds != null ) {

		// iterate over array of streams ids
		streams.forEach(function (obj) {
			if ( streamsIds.indexOf(obj._id) > -1 ) {
				// remove the TelemetryStream
				this.alertRule.streams.pop(obj);
			}
		});

		// save it
		return this.saveHelper();
	}
}

		//********************************************************************
	// adds one or more alertsIds as a Alerts
	// to a AlertRule
	// returns a Promise
	// delegates via URI
	//********************************************************************
	addAlerts( alertRuleId, alertsIds ): Observable<any> {

		// get the AlertRule
		this.loadHelper( alertRuleId );

	// split on a comma with no spaces
	var idList = alertsIds.split(',')

	// iterate over array of alerts ids
	idList.forEach(function (id) {
		// read the Alert
		var alert = new AlertService(this.http).getAlert(id);
		// add the Alert if not already assigned
		if ( this.alertRule.alerts.indexOf(alert) == -1 )
		this.alertRule.alerts.push(alert);
	});

	// save it
	return this.saveHelper();
}

	//********************************************************************
	// removes one or more alertsIds as a Alerts
	// from a AlertRule
	// returns a Promise
	// delegates via URI
	//********************************************************************
	removeAlerts( alertRuleId, alertsIds ): Observable<any> {

		// get the AlertRule
		this.loadHelper( alertRuleId );


	// split on a comma with no spaces
	var idList 					= alertsIds.split(',');
	var alerts 	= this.alertRule.alerts;

	if ( alerts != null && alertsIds != null ) {

		// iterate over array of alerts ids
		alerts.forEach(function (obj) {
			if ( alertsIds.indexOf(obj._id) > -1 ) {
				// remove the Alert
				this.alertRule.alerts.pop(obj);
			}
		});

		// save it
		return this.saveHelper();
	}
}

	
	//********************************************************************
	// saveHelper - internal helper to save a AlertRule
	//********************************************************************
	saveHelper() : Observable<any> {

		const uri_ = this.apiUrl + '/AlertRule/update/' + this.alertRule;

	return  this.http.post(uri_, this.alertRule );
}

	//********************************************************************
	// loadHelper - internal helper to load a AlertRule
	//********************************************************************	
	loadHelper( id ) {
		this.getAlertRule(id)
			.subscribe((res : AlertRule) => {
				this.alertRule = res;
			});
	}
}