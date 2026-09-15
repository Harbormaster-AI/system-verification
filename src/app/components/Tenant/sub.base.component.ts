import { HttpClient } from '@angular/common/http';
import { BaseComponent } from '../base.component';

import { Directive } from '@angular/core';

/**
	Base class of all Tenant Edit and Create Components.  
 **/
@Directive()
export class SubBaseComponent extends BaseComponent {

  constructor (http: HttpClient) { super(http); }
  
  ngOnInit() {
  	super.ngOnInit();
  	
	this.initSiteList();
	this.initTenantUserList();
	this.initIoTDeviceList();
	this.initDataRetentionPolicyList();
	this.initConnectivityPlanList();
	this.initSimCardList();
	this.initMessagingEndpointList();
	this.initAccessPolicyList();
	this.initDeviceGroupList();
	this.initAlertRuleList();
	this.initMaintenanceTicketList();
	this.initUsageRecordList();
  }
}
